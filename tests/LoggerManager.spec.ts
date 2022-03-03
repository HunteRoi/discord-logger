import { Client } from 'discord.js';
import { LoggerManager, LoggerOptions, IModule } from '../src';

describe('LoggerManager', () => {
	let options: LoggerOptions;
	let modules: IModule[];
	let client: Client;

	beforeEach(() => {
		client = new Client({ intents: [] });
		options = {};
		modules = [];
	});

	it('should instanciate correctly', () => {
		expect(() => new LoggerManager(options, modules)).not.toBeNull();
	});

	it('should throw error when "options" is falsy', () => {
		expect(() => new LoggerManager(null, modules)).toThrowError(
			'You must provide valid options!'
		);
	});

	it('should throw error when "modules" is undefined or null', () => {
		expect(() => new LoggerManager(options, null)).toThrowError(
			'You must provide valid modules!'
		);
	});

	it('should not throw error when "modules" is not defined', () => {
		expect(() => new LoggerManager(options)).not.toBeNull();
	});
});
