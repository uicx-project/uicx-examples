import React from "react";
import {AppContext} from "./AppContext";
import {isWebView} from "./uicx";

export enum State {
    Initializing,
    Loading,
    Valid,
    Errored,
}

export function useUICX(path: string, options: {lazy: boolean} = {lazy: false}): [state: State, content: string | null, reload: () => void] {
    const {baseURL, deeplinks} = React.useContext(AppContext);

    let url = `${baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

    if (typeof deeplinks[path] === 'string') {
        url = `${baseURL.replace(/\/$/, '')}/${deeplinks[path].replace(/^\//, '')}`;
    }

    const [state, setState] = React.useState<State>(State.Initializing);
    const [content, setContent] = React.useState<string  | null>(null);

    const reload = React.useCallback(() => {
        (async () => {
            setState(State.Loading);
            setContent(null);

            try {
                const res = await fetch(url);
                const data = await res.json();

                if (isWebView(data)) {
                    setContent(`<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${data.headTemplate}
  </head>
  <body>
    ${data.contentTemplate}
  </body>
</html>`);
                    setState(State.Valid);
                } else {
                    setState(State.Errored);
                }
            } catch (e) {
                console.error(e);
                setState(State.Errored);
            }

        })();
    }, [url]);

    React.useLayoutEffect(() => {
        if (!options.lazy && state === State.Initializing) {
            reload();
        }
    }, []);

    return [state, content, reload];
}