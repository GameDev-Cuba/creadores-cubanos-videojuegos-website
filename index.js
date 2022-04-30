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

    const productos = site.$pages.find(p => p.$name === "productos");
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