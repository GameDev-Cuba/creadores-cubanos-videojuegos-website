import { parse } from "yaml";
import { mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "fs";
import { join } from "path/posix";
import Showdown from "showdown";

export class SiteGenerator {

    private _config: IConfig;
    private _contentRoot: string;
    private _mdConverter: Showdown.Converter;
    private _outputDir: string;
    private _siteContent?: ISectionContent;

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

        this.readSection(this._siteContent);

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

        this.generateSection(this._siteContent);
    }

    private generateSection(section: ISectionContent) {

        const outDir = join("www", section.directory);

        mkdirSync(outDir, {recursive: true});

        writeFileSync(join(outDir, "index.html"), section.content);

        for (const child of section.children) {

            this.generateSection(child);
        }
    }

    private readSection(section: ISectionContent) {

        const space = "  ".repeat(section.directory.split("/").length);
        console.log(`${space}Processing ${section.directory}`);

        const fullSectionDir = join(this._contentRoot, section.directory);
        const inputFile = join(fullSectionDir, "index.md");

        section.src = readFileSync(inputFile).toString("utf-8");
        section.content = this._mdConverter.makeHtml(section.src);
        section.metadata = parse(this._mdConverter.getMetadata(true) as string);

        // process children

        for (const childSectionDir of readdirSync(fullSectionDir)) {

            if (statSync(join(fullSectionDir, childSectionDir)).isDirectory()) {

                const childSection: ISectionContent = {
                    name: childSectionDir,
                    directory: join(section.directory, childSectionDir),
                    content: "",
                    src: "",
                    metadata: {},
                    children: []
                };

                section.children.push(childSection);

                this.readSection(childSection);
            }
        }
    }
}
