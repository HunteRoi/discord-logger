import { GatewayDispatchEvents } from 'discord-api-types/v10';
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
		expect(() => new LoggerManager(options, client, modules)).not.toBeNull();
	});

	it('should throw error when "options" is falsy', () => {
		expect(() => new LoggerManager(null, client, modules)).toThrowError(
			'You must provide valid options!'
		);
	});

	it('should throw error when "modules" is undefined or null', () => {
		expect(() => new LoggerManager(options, client, null)).toThrowError(
			'You must provide valid modules!'
		);
	});

	it('should not throw error when "modules" is not defined', () => {
		expect(() => new LoggerManager(options, client)).not.toBeNull();
	});

	it('should throw error when "client" is undefined or null', () => {
		expect(() => new LoggerManager(options, null)).toThrowError(
			'You must provide a client'
		);
	});

	describe('listenTo', () => {
		it('should add event to the events list', () => {
			const sut = new LoggerManager(options, client, modules);
			const expected = GatewayDispatchEvents.ChannelCreate;

			sut.listenTo(expected);

			expect(sut.listenedEvents).toContain(expected);
		});

		it('should not add twice an event to the events list', () => {
			const sut = new LoggerManager(options, client, modules);
			const expected = GatewayDispatchEvents.ChannelCreate;

			sut.listenTo(expected);
			sut.listenTo(expected);

			const actual = expect(sut.listenedEvents);

			actual.toContain(expected);
			actual.toHaveLength(1);
		});
	});
});
