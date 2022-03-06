import { IntentsString } from 'discord.js';
import { GatewayDispatchEvents } from 'discord-api-types/v10';

import { EventParser } from '../src';

describe('EventParser', () => {
    it('should instanciate correctly', () => {
        expect(() => new EventParser()).not.toBeNull();
    });

    describe('getRequirements', () => {
        it('should return the expected string', () => {
            const event: GatewayDispatchEvents =
                GatewayDispatchEvents.GuildCreate;
            const expected: IntentsString = 'GUILDS';

            const actual = new EventParser().getRequirements(event);

            expect(() => expected === actual).toBeTruthy();
        });
    });
});
