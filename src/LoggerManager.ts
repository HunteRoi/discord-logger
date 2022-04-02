import { EventEmitter } from 'stream';
import { Client, Intents } from 'discord.js';

import { EventParser } from './EventParser';
import { IEventParser, IModule, LoggerOptions } from '@types';
import { GatewayDispatchEvents } from 'discord-api-types/v10';

export class LoggerManager extends EventEmitter {
	private readonly _eventParser: IEventParser;
	private readonly _client: Client;
	private readonly _options: LoggerOptions;
	private readonly _modules: IModule[];

	public readonly listenedEvents: GatewayDispatchEvents[];

	constructor(options: LoggerOptions, client: Client, modules: IModule[] = []) {
		super();
		if (!options) throw new Error('You must provide valid options!');
		if (!client) throw new Error('You must provide a client!');
		if (!modules) throw new Error('You must provide valid modules!');

		this._options = options;
		this._eventParser = new EventParser();
		this._client = client;
		this._modules = modules;

		this.listenedEvents = [];
	}

	private meetsRequirements(event: GatewayDispatchEvents): boolean {
		const requirements = this._eventParser.getRequirements(event);
		const intents = new Intents(this._client.options.intents).toArray();

		console.debug(`${event} requirements are ${JSON.stringify(requirements)}`);

		return requirements !== [] && intents.every(intent => !requirements.includes(intent));
	}

	public listenTo(event: GatewayDispatchEvents) {
		if (this.meetsRequirements(event)) {
			console.warn(`${event} requires specific intents but none were found.`);
			return;
		}

		if (!this.listenedEvents.includes(event)) {
			this.listenedEvents.push(event);
		}
	}

	public stopListeningTo(event: GatewayDispatchEvents) {
		const index = this.listenedEvents.indexOf(event);
		if (index !== -1) this.listenedEvents.splice(index, 1);
	}
}
