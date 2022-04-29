import { SiteBuilder } from "staticojs";

const builder = new SiteBuilder(".");

builder.parse();

builder.compile();