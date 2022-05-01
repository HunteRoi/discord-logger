import { Client, Intents } from 'discord.js';

import { LoggerManager, IModule } from '../src';
import { generateTestModules, getTestEvent } from './_global';

describe('LoggerManager', () => {
  let modules: Partial<IModule>[];
  let client: Client;

  beforeEach(() => {
    client = new Client({ intents: [Intents.FLAGS.GUILDS] });
    client.removeAllListeners();

    modules = [...generateTestModules()];
  });

  it('should instanciate correctly', () => {
    expect(() => new LoggerManager(client, modules)).not.toBeNull();
  });

  it('should not throw error when "modules" is not defined', () => {
    expect(() => new LoggerManager(client)).not.toBeNull();
  });

  describe('listenWithAllModulesTo', () => {
    it('should add all modules as listeners for the event', () => {
      const sut = new LoggerManager(client, modules);
      const event = getTestEvent();

      sut.listenWithAllModulesTo(event);

      expect(client.listenerCount(event)).toBe(modules.length);
    });

    it('should not add twice the modules listeners to this event', () => {
      const sut = new LoggerManager(client, modules);
      const event = getTestEvent();

      sut.listenWithAllModulesTo(event);
      sut.listenWithAllModulesTo(event);

      expect(client.listenerCount(event)).toBe(modules.length);
    });
  });

  describe('unlistenWithAllModulesTo', () => {
    it('should remove all modules listeners for this event', () => {
      const sut = new LoggerManager(client, modules);
      const event = getTestEvent();

      sut.listenWithAllModulesTo(event);
      sut.unlistenWithAllModulesTo(event);

      expect(client.listenerCount(event)).toBe(0);
    });

    it('should not remove modules for the event if it is not registered in the first place', () => {
      const sut = new LoggerManager(client, modules);
      const event = getTestEvent();

      sut.unlistenWithAllModulesTo(event);

      expect(client.listenerCount(event)).toBe(0);
    });
  });

  describe('listenWithModuleTo', () => {
    it('should listen to event with the right module', () => {
      const sut = new LoggerManager(client, modules);
      const event = getTestEvent();
      const module = { [`on_${event}`]: () => {} };

      sut.listenWithModuleTo(event, module);

      expect(client.listenerCount(event)).toBe(1);
    });

    it('should not add twice the same module to listen to an event', () => {
      const sut = new LoggerManager(client, modules);
      const event = getTestEvent();
      const module = { [`on_${event}`]: () => {} };

      sut.listenWithModuleTo(event, module);
      sut.listenWithModuleTo(event, module);

      expect(client.listenerCount(event)).toBe(1);
    });

    it('should listen to an event with different modules', () => {
      const sut = new LoggerManager(client, modules);
      const event = getTestEvent();
      const module = { [`on_${event}`]: () => {} };
      const moduleTwo = { [`on_${event}`]: () => {} };

      sut.listenWithModuleTo(event, module);
      sut.listenWithModuleTo(event, moduleTwo);

      expect(client.listenerCount(event)).toBe(2);
    });
  });

  describe('unlistenWithModuleTo', () => {
    it('should unlisten to event of the right module', () => {
      const sut = new LoggerManager(client, modules);
      const event = getTestEvent();
      const module = { [`on_${event}`]: () => {} };

      sut.listenWithModuleTo(event, module);
      expect(client.listenerCount(event)).toBe(1);
      sut.unlistenWithModuleTo(event, module);
      expect(client.listenerCount(event)).toBe(0);
    });

    it('should not remove another module listening to the same event', () => {
      const event = getTestEvent();
      const module = { [`on_${event}`]: () => {} };
      const sut = new LoggerManager(client, [...modules, module]);

      sut.listenWithAllModulesTo(event);
      expect(client.listenerCount(event)).toBe(modules.length + 1);
      sut.unlistenWithModuleTo(event, module);
      expect(client.listenerCount(event)).toBe(modules.length);
    });
  });
});
