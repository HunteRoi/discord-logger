import type { Awaitable, ClientEvents } from "discord.js";

type IModuleHelper = {
    [event in keyof ClientEvents as `on_${event}`]?: (
        ...args: ClientEvents[event]
    ) => Awaitable<void>;
};

export type ModuleMethod = IModule[`on_${keyof ClientEvents}`];

// tslint:disable-next-line:no-empty-interface
export interface IModule extends IModuleHelper {}
