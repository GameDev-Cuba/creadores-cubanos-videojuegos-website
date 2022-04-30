import { parse } from "date-format-parse";
import { exit } from "process";
import shuffleArray from "shuffle-array";
import { SiteBuilder } from "staticojs";

const builder = new SiteBuilder(".");

const page = builder.parse();

// random estudios for home page

const estudios = page.$pages.find(p => p.$name === "estudios").$pages;

shuffleArray(estudios);

page.homepage_estudios = estudios.slice(0, 4);

// random creators for the home page

const creadores = page.$pages.find(p => p.$name === "creadores").$pages;

shuffleArray(creadores);

page.homepage_creadores = creadores.slice(0, 4);

// random products

const products = page.$pages.find(p => p.$name === "productos").$pages;

shuffleArray(products);

page.homepage_productos = products.slice(0, 4);

// sort blog posts

const posts = page.$pages.find(p => p.$name === "blog").$pages;

posts.sort((a, b) => {

    const date1 = parse(a.date, "D-M-YYYY");
    const date2 = parse(b.date, "D-M-YYYY");
    
    return date2.getTime() - date1.getTime();
});

// compile

builder.compile();