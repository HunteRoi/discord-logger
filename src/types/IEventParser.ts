import { IntentsString, ClientEvents } from 'discord.js';

export interface IEventParser {
    getRequirements<Event extends keyof ClientEvents>(event: Event): IntentsString[];
}
