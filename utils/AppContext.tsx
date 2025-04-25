import React, { createContext } from 'react';
import {Configuration} from "./uicx";

export const AppContext = createContext<Configuration | null>(null) as React.Context<Configuration>;