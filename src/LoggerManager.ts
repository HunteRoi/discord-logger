import type { Client, ClientEvents } from "discord.js";

import type { IModule, ModuleMethod } from "./types/index.js";

export class LoggerManager<Event extends keyof ClientEvents> {
    private readonly _boundModuleMethodsPerModuleMethods: Map<
        ModuleMethod,
        Map<Partial<IModule>, ModuleMethod>
    >;
    private readonly _modules: Partial<IModule>[];
    private readonly _client: Client;

    constructor(client: Client, modules: Partial<IModule>[] = []) {
        this._client = client;
        this._modules = modules;
        this._boundModuleMethodsPerModuleMethods = new Map<
            ModuleMethod,
            Map<Partial<IModule>, ModuleMethod>
        >();
    }

    public listenWithAllModulesTo(event: Event) {
        for (const module of this._modules) {
            this.listenWithModuleTo(event, module);
        }
    }

    public unlistenWithAllModulesTo(event: Event) {
        for (const module of this._modules) {
            this.unlistenWithModuleTo(event, module);
        }
    }

    public listenWithModuleTo(event: Event, module: Partial<IModule>): void {
        const method: ModuleMethod | undefined | null = module[`on_${event}`];
        if (!method) return;

        let methodBindingMap:
            | Map<Partial<IModule>, ModuleMethod>
            | undefined
            | null = this._boundModuleMethodsPerModuleMethods.get(method);
        if (!methodBindingMap) {
            methodBindingMap = new Map();
            this._boundModuleMethodsPerModuleMethods.set(
                method,
                methodBindingMap,
            );
        }

        if (methodBindingMap.has(module)) return;

        const boundMethod = method.bind(module);
        methodBindingMap.set(module, boundMethod);

        this._client.addListener(event, boundMethod);
    }

    public unlistenWithModuleTo(event: Event, module: Partial<IModule>): void {
        const method: ModuleMethod | undefined | null = module[`on_${event}`];
        if (!method) return;

        const methodBindingMap:
            | Map<Partial<IModule>, ModuleMethod>
            | undefined
            | null = this._boundModuleMethodsPerModuleMethods.get(method);
        if (!methodBindingMap) return;

        const boundMethod = methodBindingMap.get(module);
        if (!boundMethod) return;

        methodBindingMap.delete(module);
        if (methodBindingMap.size === 0) {
            this._boundModuleMethodsPerModuleMethods.delete(method);
        }

        this._client.removeListener(event, boundMethod);
    }
}
