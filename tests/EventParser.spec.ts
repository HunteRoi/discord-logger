import { ClientEvents, IntentsString } from 'discord.js';

import { EventParser } from '../src';

describe('EventParser', () => {
    it('should instanciate correctly', () => {
        expect(() => new EventParser()).not.toBeNull();
    });

    describe('getRequirements', () => {
        it('should return the expected strings', () => {
            const event: keyof ClientEvents = 'guildCreate';
            const expected: IntentsString[] = ['GUILDS'];

            const actual = new EventParser().getRequirements(event);

            expect(actual).toEqual(expected);
        });

        it('should return nothing if the event has no requirements', () => {
            const event: keyof ClientEvents = 'rateLimit';
            const expected: IntentsString[] = [];

            const actual = new EventParser().getRequirements(event);

            expect(actual).toEqual(expected);
        });
    });
});
