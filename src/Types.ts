interface IConfig {
    title: string;
    theme: string;
    language: string;
}

interface IPage {
    name: string;
    directory: string;
    section: string;
    metadata: any;
    src: string;
    content: string;
    summary: string;
    children: IPage[];
}