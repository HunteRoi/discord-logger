import { Client, ClientEvents, Intents } from 'discord.js';

import { LoggerManager, IModule } from '../src';
import { generateTestModules, getTestEvent } from './_global';

describe('LoggerManager', () => {
	let modules: Partial<IModule>[];
	let client: Client;

	beforeEach(() => {
		client = new Client({ intents: [Intents.FLAGS.GUILDS] });
		client.removeAllListeners();

		modules = [
			...generateTestModules()
		];
	});

	it('should instanciate correctly', () => {
		expect(() => new LoggerManager(client, modules)).not.toBeNull();
	});

	it('should not throw error when "modules" is not defined', () => {
		expect(() => new LoggerManager(client)).not.toBeNull();
	});

	describe('listenWithAllModulesTo', () => {
		it('should add event to the events list', () => {
			const sut = new LoggerManager(client, modules);
			const event = getTestEvent();

			expect(client.listenerCount(event)).toBe(0);
			sut.listenWithAllModulesTo(event);
			expect(client.listenerCount(event)).toBe(modules.length);
		});

		it('should not add twice an event to the events list', () => {
			const sut = new LoggerManager(client, modules);
			const event = getTestEvent();

			sut.listenWithAllModulesTo(event);
			sut.listenWithAllModulesTo(event);

			expect(client.listenerCount(event)).toBe(modules.length);
		});

		it('should not add event if requirements are not met', () => {
			client = new Client({ intents: [] });
			const sut = new LoggerManager(client, modules);
			const event = getTestEvent();

			sut.listenWithAllModulesTo(event);

			expect(client.listenerCount(event)).toBe(0);
		});
	});

	describe('unlistenWithAllModulesTo', () => {
		it('should remove event from the events list', () => {
			const sut = new LoggerManager(client, modules);
			const event = getTestEvent();

			sut.listenWithAllModulesTo(event);
			sut.unlistenWithAllModulesTo(event);

			expect(client.listenerCount(event)).toBe(0);
		});

		it('should not remove any event from the events list if the event is not registered in the first place', () => {
			const sut = new LoggerManager(client, modules);
			const event = getTestEvent();

			expect(client.listenerCount(event)).toBe(0);
			sut.unlistenWithAllModulesTo(event);
			expect(client.listenerCount(event)).toBe(0);
		});
	});

	describe('listenWithModuleTo', () => {
		it('should listen to event with the right module', () => {
			const sut = new LoggerManager(client, modules);
			const event = getTestEvent();
			const module = { [`on_${event}`]: () => { } };

			expect(client.listenerCount(event)).toBe(0);
			sut.listenWithModuleTo(event, module);
			expect(client.listenerCount(event)).toBe(1);
		});

		it('should not add twice the same module to listen to an event', () => {
			const sut = new LoggerManager(client, modules);
			const event = getTestEvent();
			const module = { [`on_${event}`]: () => { } };

			expect(client.listenerCount(event)).toBe(0);
			sut.listenWithModuleTo(event, module);
			sut.listenWithModuleTo(event, module);
			expect(client.listenerCount(event)).toBe(1);
		});

		it('should listen to an event with different modules', () => {
			const sut = new LoggerManager(client, modules);
			const event = getTestEvent();
			const module = { [`on_${event}`]: () => { } };
			const moduleTwo = { [`on_${event}`]: () => { } };

			expect(client.listenerCount(event)).toBe(0);
			sut.listenWithModuleTo(event, module);
			sut.listenWithModuleTo(event, moduleTwo);
			expect(client.listenerCount(event)).toBe(2);
		});

		it('should not add event if requirements are not met', () => {
			client = new Client({ intents: [] });
			const sut = new LoggerManager(client, modules);
			const event = getTestEvent();
			const module = { [`on_${event}`]: () => { } };

			sut.listenWithModuleTo(event, module);

			expect(client.listenerCount(event)).toBe(0);
		});
	});

	describe('unlistenWithModuleTo', () => {
		it('should unlisten to event of the right module', () => {
			const sut = new LoggerManager(client, modules);
			const event = getTestEvent();
			const module = { [`on_${event}`]: () => { } };

			expect(client.listenerCount(event)).toBe(0);
			sut.listenWithModuleTo(event, module);
			expect(client.listenerCount(event)).toBe(1);
			sut.unlistenWithModuleTo(event, module);
			expect(client.listenerCount(event)).toBe(0);
		});

		it('should not remove another module listening to the same event', () => {
			const event = getTestEvent();
			const module = { [`on_${event}`]: () => { } };
			const sut = new LoggerManager(client, [...modules, module]);

			expect(client.listenerCount(event)).toBe(0);
			sut.listenWithAllModulesTo(event);
			expect(client.listenerCount(event)).toBe(modules.length + 1);
			sut.unlistenWithModuleTo(event, module);
			expect(client.listenerCount(event)).toBe(modules.length);
		});
	});
});
