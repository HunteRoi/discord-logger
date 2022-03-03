import { EventEmitter } from 'stream';
import { IModule, LoggerOptions } from '@types';

export class LoggerManager extends EventEmitter {
	constructor(options: LoggerOptions, modules: IModule[] = []) {
		super();

		if (!options) throw new Error('You must provide valid options!');
		if (!modules) throw new Error('You must provide valid modules!');
	}
}
