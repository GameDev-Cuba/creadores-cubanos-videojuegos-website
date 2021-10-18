interface IConfig {
    title: string;
    theme: string;
    language: string;
}

interface IPage {
    name: string;
    directory: string;
    metadata: any;
    src: string;
    content: string;
    parent?: IPage;
    children: IPage[];
}