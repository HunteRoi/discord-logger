import { EventParser } from '../src';

describe('EventParser', () => {
	it('should instanciate correctly', () => {
		expect(() => new EventParser()).not.toBeNull();
	});

	describe('getRequirements', () => {
		it('should return the expected string', () => {
			// arrange
			const event = 'test';
			const expected = 'ok';

			// act
			const actual = new EventParser().getRequirements(event);

			// assert
			expect(() => expected === actual).toBeTruthy();
		});
	});
});
