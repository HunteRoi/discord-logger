import { EventParser } from '../src';

describe('EventParser', () => {
	it('should instanciate correctly', () => {
		expect(() => new EventParser()).not.toBeNull();
	});
});
