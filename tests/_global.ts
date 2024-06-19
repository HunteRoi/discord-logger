import type { ClientEvents } from "discord.js";

import type { IModule } from "../src/index.js";

export function generateTestModule(): Partial<IModule> {
    const event = getTestEvent();
    return {
        [`on_${event}`]: () => undefined,
    };
}

export function generateTestModules(): Partial<IModule>[] {
    return [generateTestModule(), generateTestModule(), generateTestModule()];
}

export function getTestEvent(): keyof ClientEvents {
    return "channelCreate";
}
