import { parse } from "date-format-parse";
import shuffleArray from "shuffle-array";
import { SiteBuilder } from "staticojs";

const builder = new SiteBuilder(".");

const site = builder.parse();

randomHomeContent();

sortBlogPosts();

buildProductsTags();

builder.compile();

// ---- utils ----

function buildProductsTags() {

    const productosPage = findChildByName(site, "productos");
    const productos = productosPage.$pages;

    const tagsPage = findChildByName(site, "tags");
    const productosTagsPage = findChildByName(tagsPage, "productos");
    const tags = productosTagsPage.featured_tags;

    productosPage.tags = tags;

    for (const tag of tags) {

        const newPage = {
            $name: tag,
            $path: productosTagsPage.$path + "/" + tag,
            $content: "",
            $summary: "",
            $src: "---\ntitle: tags\ndescription: tags\n---",
            $pages: [],
            title: tag.toUpperCase(),
            productos_names: productos.filter(p => p.tags.indexOf(tag) >= 0).map(p => p.$name)
        };

        productosTagsPage.$pages.push(newPage);
    }
}

function sortBlogPosts() {

    const posts = site.$pages.find(p => p.$name === "blog").$pages;

    posts.sort((a, b) => {

        const date1 = parse(a.date, "D-M-YYYY");
        const date2 = parse(b.date, "D-M-YYYY");

        return date2.getTime() - date1.getTime();
    });
}

function randomHomeContent() {


    // random estudios for home page

    const estudios = findChildByName(site, "estudios").$pages;

    shuffleArray(estudios);

    site.homepage_estudios = estudios.slice(0, 4);

    // random creators for the home page

    const creadores = findChildByName(site, "creadores").$pages;

    shuffleArray(creadores);

    site.homepage_creadores = creadores.slice(0, 4);

    // random products

    const productos = findChildByName(site, "productos").$pages;

    shuffleArray(productos);

    site.homepage_productos = productos.slice(0, 4);
}

function findChildByName(page, name) {

    return page.$pages.find(p => p.$name === name);
}