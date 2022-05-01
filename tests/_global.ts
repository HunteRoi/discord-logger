import { ClientEvents } from 'discord.js';
import { IModule } from '../src';

export function generateTestModule(): Partial<IModule> {
  const event = getTestEvent();
  return {
    [`on_${event}`]: () => {},
  };
}

export function generateTestModules(): Array<Partial<IModule>> {
  return [generateTestModule(), generateTestModule(), generateTestModule()];
}

export function getTestEvent(): keyof ClientEvents {
  return 'channelCreate';
}
