import { Client, ClientEvents } from 'discord.js';

import { IModule, ModuleMethod } from '@types';

export class LoggerManager<Event extends keyof ClientEvents> {
  private readonly _boundModuleMethodsPerModuleMethods: Map<
    ModuleMethod,
    Map<Partial<IModule>, ModuleMethod>
  >;
  private readonly _modules: Partial<IModule>[];
  private readonly _client: Client;

  constructor(client: Client, modules: Partial<IModule>[] = []) {
    if (!client) throw new Error('You must provide a client!');

    this._client = client;
    this._modules = modules;
    this._boundModuleMethodsPerModuleMethods = new Map<
      ModuleMethod,
      Map<Partial<IModule>, ModuleMethod>
    >();
  }

  public listenWithAllModulesTo(event: Event) {
    this._modules.forEach((module) => this.listenWithModuleTo(event, module));
  }

  public unlistenWithAllModulesTo(event: Event) {
    this._modules.forEach((module) => this.unlistenWithModuleTo(event, module));
  }

  public listenWithModuleTo(event: Event, module: Partial<IModule>): void {
    const method: ModuleMethod | undefined | null = module[`on_${event}`];
    if (method === undefined) return;

    let methodBindingMap:
      | Map<Partial<IModule>, ModuleMethod>
      | undefined
      | null = this._boundModuleMethodsPerModuleMethods.get(method);
    if (methodBindingMap === undefined) {
      this._boundModuleMethodsPerModuleMethods.set(
        method,
        (methodBindingMap = new Map())
      );
    }

    if (methodBindingMap.has(module)) return;

    const boundMethod = method.bind(module);
    methodBindingMap.set(module, boundMethod);

    this._client.addListener(event, boundMethod);
  }

  public unlistenWithModuleTo(event: Event, module: Partial<IModule>): void {
    const method: ModuleMethod | undefined | null = module[`on_${event}`];
    if (method === undefined) return;

    const methodBindingMap:
      | Map<Partial<IModule>, ModuleMethod>
      | undefined
      | null = this._boundModuleMethodsPerModuleMethods.get(method);
    if (methodBindingMap === undefined) return;

    const boundMethod = methodBindingMap.get(module);
    if (boundMethod === undefined) return;

    methodBindingMap.delete(module);
    if (methodBindingMap.size === 0) {
      this._boundModuleMethodsPerModuleMethods.delete(method);
    }

    this._client.removeListener(event, boundMethod);
  }
}
