import { IntentsString } from 'discord.js';
import { GatewayDispatchEvents } from 'discord-api-types/v10';

export interface IEventParser {
    getRequirements(event: GatewayDispatchEvents): IntentsString[];
}
