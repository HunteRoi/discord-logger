import { EventParser } from '../src';

describe('EventParser', () => {
	it('should instanciate correctly', () => {
		expect(() => new EventParser()).not.toBeNull();
	});

	describe('getRequirements', () => {
		it('should return the expected string', () => {
			const event = 'test';
			const expected = 'ok';

			const actual = new EventParser().getRequirements(event);

			expect(() => expected === actual).toBeTruthy();
		});
	});
});
