import { IntentsString } from 'discord.js';

import { EventParser, Events } from '../src';

describe('EventParser', () => {
    it('should instanciate correctly', () => {
        expect(() => new EventParser()).not.toBeNull();
    });

    describe('getRequirements', () => {
        it('should return the expected strings', () => {
            const event: Events = 'guildCreate';
            const expected: IntentsString[] = ['GUILDS'];

            const actual = new EventParser().getRequirements(event);

            expect(actual).toEqual(expected);
        });
    });
});
