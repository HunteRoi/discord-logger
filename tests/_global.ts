import { IModule } from "../src";

export function generateTestModule(): IModule {
    return { on_channelCreate: () => { } } as IModule;
}