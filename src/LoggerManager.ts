import { EventEmitter } from 'stream';
import { Client } from 'discord.js';

import { EventParser } from './EventParser';
import { IEventParser, IModule, LoggerOptions } from '@types';

export class LoggerManager extends EventEmitter {
	private readonly _eventParser: IEventParser;

	constructor(options: LoggerOptions, client: Client, modules: IModule[] = []) {
		super();
		if (!options) throw new Error('You must provide valid options!');
		if (!client) throw new Error('You must provide a client!');
		if (!modules) throw new Error('You must provide valid modules!');

		this._eventParser = new EventParser();
	}
}
