import { LoggerManager, LoggerOptions, IModule } from '../src';

describe('LoggerManager', () => {
	let options: LoggerOptions;
	let modules: IModule[];

	beforeEach(() => {
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

	it('should throw errow when "modules" is undefined or null', () => {
		expect(() => new LoggerManager(options, null)).toThrowError(
			'You must provide valid modules!'
		);
	});
});
