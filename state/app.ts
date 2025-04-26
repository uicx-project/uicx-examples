import { create } from 'zustand';
import {Configuration, isConfiguration} from "../utils/uicx";

export const apps = {
    'Basic': 'https://uicx-project.github.io/uicx-examples/assets/basic/configuration.json',
    'Simple': 'https://uicx-project.github.io/uicx-examples/assets/simple/configuration.json',
    'Templating': 'https://uicx-project.github.io/uicx-examples/assets/templating/configuration.json',
}

interface BaseAppState {
    selectApp: (app: keyof typeof apps) => void,
    resetApp: () => void,
}

interface EmptyAppState extends BaseAppState {
    app: null,
    configuration: null,
    error: string | null
}

interface ValidAppState extends BaseAppState {
    app: keyof typeof apps,
    configuration: Configuration,
    error: null
}

export const useApp = create<EmptyAppState | ValidAppState>((set) => ({
    app: null,
    configuration: null,
    error: null,
    selectApp: async (app) => {
        try {
            const res = await fetch(apps[app]);
            const conf = await res.json();

            if (isConfiguration(conf)) {
                set((state: EmptyAppState | ValidAppState) => ({
                    ...state,
                    app,
                    configuration: conf,
                    error: null
                }));
            } else {
                set((state: EmptyAppState | ValidAppState) => ({
                    ...state,
                    app: null,
                    configuration: null,
                    error: `Invalid configuration given from ${apps[app]}.`
                }));
            }
        } catch {
            set((state: EmptyAppState | ValidAppState) => ({
                ...state,
                app: null,
                configuration: null,
                error: `Error occurred while retrieving configuration from ${apps[app] || '<empty>'}.`
            }));
        }
    },
    resetApp: () => {
        set((state: EmptyAppState | ValidAppState) => ({...state, app: null, configuration: null, error: null}))
    }
}));