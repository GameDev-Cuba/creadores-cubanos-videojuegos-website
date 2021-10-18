interface IConfig {
    title: string;
    theme: string;
    language: string;
}

interface ISiteContent {

    sections: ISectionContent[];
}

interface ISectionContent {
    name: string;
    directory: string;
    metadata: any;
    src: string;
    content: string;
    parent?: ISectionContent;
    children: ISectionContent[];
}