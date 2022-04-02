import { Client, Intents } from 'discord.js';
import { LoggerManager, LoggerOptions, IModule } from '../src';

describe('LoggerManager', () => {
	let options: LoggerOptions;
	let modules: IModule[];
	let client: Client;

	beforeEach(() => {
		client = new Client({ intents: [Intents.FLAGS.GUILDS] });
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
			const expected = 'channelCreate';

			sut.listenTo(expected);

			expect(sut.listenedEvents).toContain(expected);
		});

		it('should not add twice an event to the events list', () => {
			const sut = new LoggerManager(options, client, modules);
			const expected = 'channelCreate';

			sut.listenTo(expected);
			sut.listenTo(expected);

			const expectation = expect(sut.listenedEvents);
			expectation.toContain(expected);
			expectation.toHaveLength(1);
		});

		it('should not add event if requirements are not met', () => {
			client = new Client({ intents: [] });
			const sut = new LoggerManager(options, client, modules);
			const event = 'channelCreate';

			sut.listenTo(event);

			expect(sut.listenedEvents).not.toContain(event);
		});

		it('should remove event from the events list', () => {
			const sut = new LoggerManager(options, client, modules);
			const event = 'channelCreate';
			sut.listenTo(event);

			sut.stopListeningTo(event);

			expect(sut.listenedEvents).not.toContain(event);
		});

		it('should not remove any event from the events list if the event is not registerd in the first place', () => {
			const sut = new LoggerManager(options, client, modules);
			const event = 'channelCreate';

			expect(sut.listenedEvents).not.toContain(event);
			sut.stopListeningTo(event);
			expect(sut.listenedEvents).not.toContain(event);
		});
	});
});
