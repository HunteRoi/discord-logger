import { IModule, LoggerOptions } from '@types';

export class LoggerManager {
	constructor(options: LoggerOptions, modules: IModule[] = []) {
		if (!options) throw new Error('You must provide valid options!');
		if (!modules) throw new Error('You must provide valid modules!');
	}
}
