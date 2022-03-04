import { IEventParser } from '@types';

export class EventParser implements IEventParser {
	getRequirements(event: string): string {
		if (event === 'test') return 'ok';
	}
}
