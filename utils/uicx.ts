export type Configuration = {
    baseURL: string,
    webviewBaseURL: string,
    headerTitle: string,
    headerImage?: string,
    deeplinks: {
        "/": string
        [path: string]: string
    },
    tapbar?: {
        [label: string]: string
    },
    preload?: Partial<{
        stylesheets: string[],
        javascripts: string[]
    }>,
    variables?: object
};

export function isConfiguration(source: any): source is Configuration {
    if (typeof source !== 'object') return false;
    if (typeof source?.baseURL !== 'string') return false;
    if (typeof source?.webviewBaseURL !== 'string') return false;
    if (typeof source?.deeplinks !== 'object') return false;
    if (typeof source.deeplinks['/'] !== 'string') return false;
    if (!Object.keys(source.deeplinks).every(key => typeof source.deeplinks[key] === 'string')) return false;
    if (typeof source?.tapbar === 'object' && !Object.keys(source.tapbar).every(key => typeof source.tapbar[key] === 'string')) return false;

    if (typeof source?.preload === 'object') {
        if (!Array.isArray(typeof source.preload?.stylesheets) || source.preload.stylesheets.every((val: any) => typeof val === 'string')) return false;
        if (!Array.isArray(typeof source.preload?.javascripts) || source.preload.javascripts.every((val: any) => typeof val === 'string')) return false;
    }

    return true;
}

export type WebView = {
    renderEngine?: 'hbs';
    contentTemplate: string;
    headTemplate?: string;
    stylesheets?: string[];
    javascripts?: string[];
}

export function isWebView(source: any): source is WebView {
    if (typeof source !== 'object') return false;
    if (typeof source?.renderEngine === 'string' && ['hbs'].indexOf(source.renderEngine) === -1) {
        console.warn(`Unknown render engine  \`${source.renderEngine}\``);
        return false
    };
    if (typeof source?.contentTemplate !== 'string') return false;
    if (typeof source?.headTemplate !== 'string') console.warn('You should define `headTemplate` in your response.');
    if (Array.isArray(typeof source?.stylesheets) && source.stylesheets.every((val: any) => typeof val === 'string')) return false;
    if (Array.isArray(typeof source?.javascripts) && source.javascripts.every((val: any) => typeof val === 'string')) return false;

    return true;
}

export async function renderContent(engine: Required<WebView['renderEngine']>, content: string, vars = {}): Promise<string> {
    switch (engine) {
        case 'hbs': {
            const {compile} = await import('handlebars');
            const template = compile(content)
            return template({vars});
        }
    }

    return 'Unable to parse template';
}