"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteGenerator = void 0;
const yaml_1 = require("yaml");
const fs_1 = require("fs");
const posix_1 = require("path/posix");
const showdown_1 = __importDefault(require("showdown"));
const ejs_1 = require("ejs");
const copyDir_1 = require("./copyDir");
const shuffle_array_1 = __importDefault(require("shuffle-array"));
class SiteGenerator {
    _config;
    _contentRoot;
    _mdConverter;
    _outputDir;
    _homePage;
    _themeDir;
    _templatesDir;
    constructor() {
        this._mdConverter = new showdown_1.default.Converter({
            metadata: true
        });
        this._outputDir = "www";
        // read config
        this._config = (0, yaml_1.parse)((0, fs_1.readFileSync)("config.yaml", "utf-8"));
        this._contentRoot = (0, posix_1.join)("content", this._config.language);
        this._themeDir = (0, posix_1.join)("themes", this._config.theme);
        this._templatesDir = (0, posix_1.join)(this._themeDir, "templates");
    }
    parse() {
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
        (0, fs_1.rmSync)(this._outputDir, { recursive: true, force: true });
        (0, fs_1.mkdirSync)(this._outputDir, { recursive: true });
        // copy data
        (0, fs_1.writeFileSync)((0, posix_1.join)(this._outputDir, "data.json"), JSON.stringify(this._homePage, null, 2));
        // add extra data fields
        this.boostPageData(this._homePage);
        // copy static content
        (0, copyDir_1.copyDir)((0, posix_1.join)(this._themeDir, "static"), this._outputDir);
        this.generatePage(this._homePage);
    }
    boostPageData(page) {
        if (page.children) {
            for (const child of page.children) {
                page["__" + child.name] = child;
                this.boostPageData(child);
            }
        }
        for (const child of (page.children || [])) {
        }
    }
    async generatePage(page) {
        const outDir = (0, posix_1.join)("www", page.directory);
        (0, fs_1.mkdirSync)(outDir, { recursive: true });
        const isChild = page.directory.startsWith(page.section + "/");
        let view = "index.ejs";
        let templateFile;
        if (isChild) {
            if ((0, fs_1.existsSync)((0, posix_1.join)(this._templatesDir, page.section, "item.ejs"))) {
                view = "item.ejs";
            }
        }
        if (page.metadata.view) {
            view = page.metadata.view + ".ejs";
        }
        templateFile = (0, posix_1.join)(this._templatesDir, page.section, view);
        if (!(0, fs_1.existsSync)(templateFile)) {
            console.log(`Looking for child template in ${page.section}`);
            templateFile = (0, posix_1.join)(this._templatesDir, page.section, "item.ejs");
            if (!(0, fs_1.existsSync)(templateFile)) {
                console.error(`ERROR: Template not found for page "${page.directory}"`);
                return;
            }
        }
        console.log(`Loading template ${templateFile}`);
        const output = await (0, ejs_1.renderFile)(templateFile, {
            page,
            site: this._homePage,
            utils
        }, {
            views: [this._templatesDir]
        });
        (0, fs_1.writeFileSync)((0, posix_1.join)(outDir, "index.html"), output);
        const assetsDir = (0, posix_1.join)(this._contentRoot, page.directory, "assets");
        if ((0, fs_1.existsSync)(assetsDir) && (0, fs_1.statSync)(assetsDir).isDirectory()) {
            const assetsOutDir = (0, posix_1.join)(outDir, "assets");
            (0, fs_1.mkdirSync)(assetsOutDir, {
                recursive: true
            });
            (0, copyDir_1.copyDir)(assetsDir, assetsOutDir);
        }
        for (const child of page.children) {
            this.generatePage(child);
        }
    }
    readPage(page) {
        const space = "  ".repeat(page.directory.split("/").length);
        console.log(`${space}Processing ${page.directory}`);
        const fullPageDir = (0, posix_1.join)(this._contentRoot, page.directory);
        const inputFile = (0, posix_1.join)(fullPageDir, "index.md");
        page.src = (0, fs_1.readFileSync)(inputFile).toString("utf-8");
        page.content = this._mdConverter.makeHtml(page.src);
        const metadataSrc = this._mdConverter.getMetadata(true);
        page.metadata = (0, yaml_1.parse)(metadataSrc);
        const i = page.src.lastIndexOf("---");
        page.summary = page.src.substring(i + 3, i + 3 + 200);
        // process children
        for (const childPageDir of (0, fs_1.readdirSync)(fullPageDir)) {
            if (childPageDir === "assets") {
                continue;
            }
            if ((0, fs_1.statSync)((0, posix_1.join)(fullPageDir, childPageDir)).isDirectory()) {
                const childPage = {
                    name: childPageDir,
                    directory: (0, posix_1.join)(page.directory, childPageDir),
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
exports.SiteGenerator = SiteGenerator;
const utils = {
    sortPagesByDate: function (items) {
        return [...items].sort((a, b) => {
            const [day1, month1, year1] = a.metadata.date.split("/");
            const [day2, month2, year2] = b.metadata.date.split("/");
            const v1 = Number.parseInt(year1) * Number.parseInt(month1) * 400 + Number.parseInt(day1);
            const v2 = Number.parseInt(year2) * Number.parseInt(month2) * 400 + Number.parseInt(day2);
            return v2 - v1;
        });
    },
    shuffleArray: shuffle_array_1.default
};
