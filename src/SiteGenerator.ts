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
            src: "",
            metadata: {},
        };

        this.readPage(this._homePage);

        console.log(JSON.stringify(this._homePage, null, 2));
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

        // copy static content

        copyDir(join(this._themeDir, "static"), this._outputDir);

        this.generatePage(this._homePage);
    }

    private async generatePage(page: IPage) {

        const outDir = join("www", page.directory);

        mkdirSync(outDir, { recursive: true });

        let view = "index.ejs";

        if (page.metadata.view) {

            view = page.metadata.view + ".ejs";
        }

        const templateFile = join(this._templatesDir, page.section, view);

        console.log(`Loading template ${templateFile}`);

        const output = await renderFile(templateFile, { page, site: this._homePage },
            {
                views: [this._templatesDir]
            });

        writeFileSync(join(outDir, "index.html"), output);

        const assetsDir = join(this._contentRoot, page.directory, "assets");

        if (existsSync(assetsDir) && statSync(assetsDir).isDirectory()) {

            copyDir(assetsDir, outDir);
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
        page.metadata = parse(this._mdConverter.getMetadata(true) as string);

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
