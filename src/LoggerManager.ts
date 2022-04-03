import { Client, Intents, ClientEvents } from 'discord.js';

import { EventParser } from './EventParser';
import { IEventParser, IModule, ModuleMethod } from '@types';

export class LoggerManager<Event extends keyof ClientEvents> {
	private readonly _bindedModuleMethodsPerModuleMethods: Map<
		ModuleMethod,
		Map<Partial<IModule>, ModuleMethod>
	>;
	private readonly _modules: Array<Partial<IModule>>;
	private readonly _client: Client;
	private readonly _eventParser: IEventParser;

	constructor(client: Client, modules: Array<Partial<IModule>> = []) {
		if (!client) throw new Error('You must provide a client!');

		this._client = client;
		this._modules = modules;
		this._bindedModuleMethodsPerModuleMethods = new Map<
			ModuleMethod,
			Map<Partial<IModule>, ModuleMethod>
		>();
		this._eventParser = new EventParser();
	}

	public listenWithAllModulesTo(event: Event) {
		if (this._client.eventNames().includes(event)) return;

		this._modules.forEach((module) =>
			this.listenWithModuleTo(event, module)
		);
	}

	public unlistenWithAllModulesTo(event: Event) {
		this._modules.forEach((module) =>
			this.unlistenWithModuleTo(event, module)
		);
	}

	public listenWithModuleTo(event: Event, module: Partial<IModule>): void {
		if (!this.meetsRequirements(event)) return;

		const method: ModuleMethod | undefined | null = module[`on_${event}`];
		if (method === undefined) return;

		let methodBindingMap:
			| Map<Partial<IModule>, Function>
			| undefined
			| null = this._bindedModuleMethodsPerModuleMethods.get(method);
		if (methodBindingMap === undefined) {
			this._bindedModuleMethodsPerModuleMethods.set(method, methodBindingMap = new Map());
		}

		if (methodBindingMap.has(module)) return;

		const bindedMethod = method.bind(module);
		methodBindingMap.set(module, bindedMethod);

		this._client.addListener(event, bindedMethod);
	}

	public unlistenWithModuleTo(event: Event, module: Partial<IModule>): void {
		if (!this._client.eventNames().includes(event)) return;

		const method: ModuleMethod | undefined | null = module[`on_${event}`];
		if (method === undefined) return;

		const methodBindingMap:
			| Map<Partial<IModule>, ModuleMethod>
			| undefined
			| null = this._bindedModuleMethodsPerModuleMethods.get(method);
		if (methodBindingMap === undefined) return;

		const bindedMethod = methodBindingMap.get(module);
		if (bindedMethod === undefined) return;

		methodBindingMap.delete(module);
		if (methodBindingMap.size === 0) {
			this._bindedModuleMethodsPerModuleMethods.delete(method);
		}

		this._client.removeListener(event, bindedMethod);
	}

	private meetsRequirements(event: Event): boolean {
		const requirements = this._eventParser.getRequirements(event);
		const intents = new Intents(this._client.options.intents).toArray();

		return (
			requirements.length === 0 ||
			intents.some((intent) => requirements.includes(intent))
		);
	}
}
