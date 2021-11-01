import { parse } from "yaml";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "fs";
import { join } from "path/posix";
import Showdown from "showdown";
import { renderFile } from "ejs";
import { copyDir } from "./copyDir";

export class SiteGenerator {

    private _config: IConfig;
    private _contentRoot: string;
    private _mdConverter: Showdown.Converter;
    private _outputDir: string;
    private _homePage?: IPage;
    private _themeDir: string;
    private _templatesDir: string;

    constructor() {

        this._mdConverter = new Showdown.Converter({
            metadata: true
        });

        this._outputDir = "www";

        // read config

        this._config = parse(readFileSync("config.yaml", "utf-8")) as IConfig;

        this._contentRoot = join("content", this._config.language);
        this._themeDir = join("themes", this._config.theme);
        this._templatesDir = join(this._themeDir, "templates");

    }

    private parse() {

        this._homePage = {
            name: this._config.title,
            section: "",
            directory: "",
            children: [],
            content: "",
            summary: "",
            src: "",
            metadata: {},
        };

        this.readPage(this._homePage);
    }

    async generate() {

        this.parse();

        if (!this._homePage) {

            console.log("An error?");

            return;
        }

        // reset www

        rmSync(this._outputDir, { recursive: true, force: true });
        mkdirSync(this._outputDir, { recursive: true });

        // copy data

        writeFileSync(join(this._outputDir, "data.json"), JSON.stringify(this._homePage, null, 2));

        // add extra data fields

        this.boostPageData(this._homePage);

        // copy static content

        copyDir(join(this._themeDir, "static"), this._outputDir);

        this.generatePage(this._homePage);
    }

    private boostPageData(page: IPage) {

        if (page.children) {

            for(const child of page.children) {

                (page as any)["__" + child.name] = child;

                this.boostPageData(child);
            }
        }

        for(const child of (page.children || [])) {

        }
    }

    private async generatePage(page: IPage) {

        const outDir = join("www", page.directory);

        mkdirSync(outDir, { recursive: true });

        const isChild = page.directory.startsWith(page.section + "/");

        let view = "index.ejs";
        let templateFile: string;

        if (isChild) {

            if (existsSync(join(this._templatesDir, page.section, "item.ejs"))) {

                view = "item.ejs";
            }
        }

        if (page.metadata.view) {

            view = page.metadata.view + ".ejs";
        }

        templateFile = join(this._templatesDir, page.section, view);

        if (!existsSync(templateFile)) {

            console.log(`Looking for child template in ${page.section}`)

            templateFile = join(this._templatesDir, page.section, "item.ejs");

            if (!existsSync(templateFile)) {

                console.error(`ERROR: Template not found for page "${page.directory}"`);

                return;
            }
        }

        console.log(`Loading template ${templateFile}`);

        const output = await renderFile(templateFile, {
            page,
            site: this._homePage,
            utils
        },
            {
                views: [this._templatesDir]
            });

        writeFileSync(join(outDir, "index.html"), output);

        const assetsDir = join(this._contentRoot, page.directory, "assets");

        if (existsSync(assetsDir) && statSync(assetsDir).isDirectory()) {

            const assetsOutDir = join(outDir, "assets");

            mkdirSync(assetsOutDir, {
                recursive: true
            });

            copyDir(assetsDir, assetsOutDir);
        }

        for (const child of page.children) {

            this.generatePage(child);
        }
    }

    private readPage(page: IPage) {

        const space = "  ".repeat(page.directory.split("/").length);
        console.log(`${space}Processing ${page.directory}`);

        const fullPageDir = join(this._contentRoot, page.directory);
        const inputFile = join(fullPageDir, "index.md");

        page.src = readFileSync(inputFile).toString("utf-8");
        page.content = this._mdConverter.makeHtml(page.src);

        const metadataSrc = this._mdConverter.getMetadata(true) as string;
        page.metadata = parse(metadataSrc as string);

        const i = page.src.lastIndexOf("---");
        page.summary = page.src.substring(i + 3, i + 3 + 200);

        // process children

        for (const childPageDir of readdirSync(fullPageDir)) {

            if (childPageDir === "assets") {

                continue;
            }

            if (statSync(join(fullPageDir, childPageDir)).isDirectory()) {

                const childPage: IPage = {
                    name: childPageDir,
                    directory: join(page.directory, childPageDir),
                    section: page.section === "" ? childPageDir : page.section,
                    content: "",
                    summary: "",
                    src: "",
                    metadata: {},
                    children: []
                };

                page.children.push(childPage);

                this.readPage(childPage);
            }
        }
    }
}

const utils = {

    sortPagesByDate: function (items: IPage[]) {

        return [...items].sort((a, b) => {

            const [day1, month1, year1] = a.metadata.date.split("/");
            const [day2, month2, year2] = b.metadata.date.split("/");
            const v1 = Number.parseInt(year1) * Number.parseInt(month1) * 400 + Number.parseInt(day1);
            const v2 = Number.parseInt(year2) * Number.parseInt(month2) * 400 + Number.parseInt(day2);

            return v2 - v1;
        });
    }
}
