import { LoggerManager, LoggerOptions } from '../src';

describe('LoggerManager', () => {
	let options: LoggerOptions;

	beforeEach(() => {
		options = {};
	});

	it('should instanciate correctly', () => {
		expect(() => new LoggerManager(options)).not.toBeNull();
	});

	it('should throw error when "options" is falsy', () => {
		expect(() => new LoggerManager(null)).toThrowError(
			'You must provide valid options!'
		);
	});
});
