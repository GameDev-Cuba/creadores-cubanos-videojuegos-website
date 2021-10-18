import { parse } from "yaml";
import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "fs";
import { join } from "path/posix";
import Showdown from "showdown";

export class SiteGenerator {

    private _config: IConfig;
    private _contentRoot: string;
    private _mdConverter: Showdown.Converter;
    private _outputDir: string;
    private _siteContent?: IPage;

    constructor() {

        this._mdConverter = new Showdown.Converter({
            metadata: true
        });

        this._outputDir = "www";

        // read config

        this._config = parse(readFileSync("config.yaml", "utf-8")) as IConfig;

        this._contentRoot = join("content", this._config.language);

    }

    private parse() {

        this._siteContent = {
            name: "Home",
            directory: ".",
            children: [],
            content: "",
            src: "",
            metadata: {},
        };

        this.readPage(this._siteContent);

        console.log(JSON.stringify(this._siteContent, null, 2));
    }

    generate() {

        this.parse();

        if (!this._siteContent) {

            console.log("An error?");

            return;
        }

        // reset www

        rmSync(this._outputDir, { recursive: true, force: true });
        mkdirSync(this._outputDir, { recursive: true });

        this.generatePage(this._siteContent);
    }

    private generatePage(page: IPage) {

        const outDir = join("www", page.directory);

        mkdirSync(outDir, {recursive: true});

        writeFileSync(join(outDir, "index.html"), page.content);

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

            if (statSync(join(fullPageDir, childPageDir)).isDirectory()) {

                const childPage: IPage = {
                    name: childPageDir,
                    directory: join(page.directory, childPageDir),
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
