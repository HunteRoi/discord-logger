import { IntentsString, ClientEvents } from 'discord.js';

export type Events = keyof ClientEvents;

export interface IEventParser {
    getRequirements(event: Events): IntentsString[];
}
