import { Constants, Intents } from 'discord.js';

import { IEventParser } from '@types';

type EventsByIntent = { [key: number]: string[] };

const eventsByIntents: EventsByIntent = {
    [Intents.FLAGS.GUILDS]: [
        Constants.Events.GUILD_CREATE,
        Constants.Events.GUILD_UPDATE,
        Constants.Events.GUILD_DELETE,
        Constants.Events.GUILD_ROLE_CREATE,
        Constants.Events.GUILD_ROLE_UPDATE,
        Constants.Events.GUILD_ROLE_DELETE,
        Constants.Events.CHANNEL_CREATE,
        Constants.Events.CHANNEL_UPDATE,
        Constants.Events.CHANNEL_DELETE,
        Constants.Events.CHANNEL_PINS_UPDATE,
        Constants.Events.THREAD_CREATE,
        Constants.Events.THREAD_UPDATE,
        Constants.Events.THREAD_DELETE,
        Constants.Events.THREAD_LIST_SYNC,
        Constants.Events.THREAD_MEMBER_UPDATE,
        Constants.Events.THREAD_MEMBERS_UPDATE,
        Constants.Events.STAGE_INSTANCE_CREATE,
        Constants.Events.STAGE_INSTANCE_UPDATE,
        Constants.Events.STAGE_INSTANCE_DELETE
    ],

    [Intents.FLAGS.GUILD_MEMBERS]: [
        Constants.Events.GUILD_MEMBER_ADD,
        Constants.Events.GUILD_MEMBER_UPDATE,
        Constants.Events.GUILD_MEMBER_REMOVE,
        Constants.Events.THREAD_MEMBERS_UPDATE
    ],

    [Intents.FLAGS.GUILD_BANS]: [
        Constants.Events.GUILD_BAN_ADD,
        Constants.Events.GUILD_BAN_REMOVE
    ],

    [Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS]: [
        Constants.Events.GUILD_EMOJI_UPDATE,
        Constants.Events.GUILD_STICKER_UPDATE
    ],

    [Intents.FLAGS.GUILD_INTEGRATIONS]: [
        Constants.Events.GUILD_INTEGRATIONS_UPDATE
        /*Constants.Events.INTEGRATION_CREATE,
		Constants.Events.INTEGRATION_UPDATE,
		Constants.Events.INTEGRATION_DELETE*/
    ],

    [Intents.FLAGS.GUILD_WEBHOOKS]: [Constants.Events.WEBHOOKS_UPDATE],

    [Intents.FLAGS.GUILD_INVITES]: [
        Constants.Events.INVITE_CREATE,
        Constants.Events.INVITE_DELETE
    ],

    [Intents.FLAGS.GUILD_VOICE_STATES]: [Constants.Events.VOICE_STATE_UPDATE],

    [Intents.FLAGS.GUILD_PRESENCES]: [Constants.Events.PRESENCE_UPDATE],

    [Intents.FLAGS.GUILD_MESSAGES]: [
        Constants.Events.MESSAGE_CREATE,
        Constants.Events.MESSAGE_UPDATE,
        Constants.Events.MESSAGE_DELETE,
        Constants.Events.MESSAGE_BULK_DELETE
    ],

    [Intents.FLAGS.GUILD_MESSAGE_REACTIONS]: [
        Constants.Events.MESSAGE_REACTION_ADD,
        Constants.Events.MESSAGE_REACTION_REMOVE,
        Constants.Events.MESSAGE_REACTION_REMOVE_ALL,
        Constants.Events.MESSAGE_REACTION_REMOVE_EMOJI
    ],

    [Intents.FLAGS.GUILD_MESSAGE_TYPING]: [Constants.Events.TYPING_START],

    [Intents.FLAGS.DIRECT_MESSAGES]: [
        Constants.Events.MESSAGE_CREATE,
        Constants.Events.MESSAGE_UPDATE,
        Constants.Events.MESSAGE_DELETE,
        Constants.Events.CHANNEL_PINS_UPDATE
    ],

    [Intents.FLAGS.DIRECT_MESSAGE_REACTIONS]: [
        Constants.Events.MESSAGE_REACTION_ADD,
        Constants.Events.MESSAGE_REACTION_REMOVE,
        Constants.Events.MESSAGE_REACTION_REMOVE_ALL,
        Constants.Events.MESSAGE_REACTION_REMOVE_EMOJI
    ],

    [Intents.FLAGS.DIRECT_MESSAGE_TYPING]: [Constants.Events.TYPING_START],

    [Intents.FLAGS.GUILD_SCHEDULED_EVENTS]: [
        Constants.Events.GUILD_SCHEDULED_EVENT_CREATE,
        Constants.Events.GUILD_SCHEDULED_EVENT_UPDATE,
        Constants.Events.GUILD_SCHEDULED_EVENT_DELETE,
        Constants.Events.GUILD_SCHEDULED_EVENT_USER_ADD,
        Constants.Events.GUILD_SCHEDULED_EVENT_USER_REMOVE
    ]
};

export class EventParser implements IEventParser {
    getRequirements(event: string): string {
        if (event === 'test') return 'ok';
    }
}
