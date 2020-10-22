import { InjectionToken, ValueProvider } from '@angular/core';

export const CONFIG = new InjectionToken('app.config');

export interface IConfig {
    title: string;
    maxItemsAllowed: number;
}

const config: Partial<IConfig> = {
    title: 'DI and HttpCleint',
    maxItemsAllowed: 20
};

export const CONFIG_PROVIDER: ValueProvider = {
    provide: CONFIG,
    useValue: config,
};
