import React, { createContext } from 'react';

export type Configuration = {
    baseURL: string,
    webviewBaseURL: string,
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
    }>
}

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
    };
    
    return true;
  }

export const AppContext = createContext<Configuration | null>(null) as React.Context<Configuration>;