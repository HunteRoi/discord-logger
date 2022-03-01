import { LoggerOptions } from '@types';

export class LoggerManager {
	constructor(options: LoggerOptions) {
		if (!options) throw new Error('You must provide valid options!');
	}
}
