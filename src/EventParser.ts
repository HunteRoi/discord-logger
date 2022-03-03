import { IEventParser } from '@types';

export class EventParser implements IEventParser {
	getRequirements(event: string) {
		throw new Error('Method not implemented.');
	}
}
