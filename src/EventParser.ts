import { IntentsString, Constants } from 'discord.js';

import { Events, IEventParser } from '@types';

type EventsPerIntents = { [key in IntentsString]: Events[] };

const eventsPerIntents: EventsPerIntents = {
    GUILDS: [
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

    GUILD_MEMBERS: [
        Constants.Events.GUILD_MEMBER_ADD,
        Constants.Events.GUILD_MEMBER_UPDATE,
        Constants.Events.GUILD_MEMBER_REMOVE,
        Constants.Events.THREAD_MEMBERS_UPDATE
    ],

    GUILD_BANS: [
        Constants.Events.GUILD_BAN_ADD,
        Constants.Events.GUILD_BAN_REMOVE
    ],

    GUILD_EMOJIS_AND_STICKERS: [
        Constants.Events.GUILD_EMOJI_CREATE,
        Constants.Events.GUILD_EMOJI_UPDATE,
        Constants.Events.GUILD_EMOJI_DELETE,
        Constants.Events.GUILD_STICKER_CREATE,
        Constants.Events.GUILD_STICKER_UPDATE,
        Constants.Events.GUILD_STICKER_DELETE
    ],

    GUILD_INTEGRATIONS: [
        Constants.Events.GUILD_INTEGRATIONS_UPDATE
    ],

    GUILD_WEBHOOKS: [
        Constants.Events.WEBHOOKS_UPDATE,
    ],

    GUILD_INVITES: [
        Constants.Events.INVITE_CREATE,
        Constants.Events.INVITE_DELETE
    ],

    GUILD_VOICE_STATES: [
        Constants.Events.VOICE_STATE_UPDATE
    ],

    GUILD_PRESENCES: [
        Constants.Events.PRESENCE_UPDATE
    ],

    GUILD_MESSAGES: [
        Constants.Events.MESSAGE_CREATE,
        Constants.Events.MESSAGE_UPDATE,
        Constants.Events.MESSAGE_DELETE,
        Constants.Events.MESSAGE_BULK_DELETE
    ],

    GUILD_MESSAGE_REACTIONS: [
        Constants.Events.MESSAGE_REACTION_ADD,
        Constants.Events.MESSAGE_REACTION_REMOVE,
        Constants.Events.MESSAGE_REACTION_REMOVE_ALL,
        Constants.Events.MESSAGE_REACTION_REMOVE_EMOJI
    ],

    GUILD_MESSAGE_TYPING: [
        Constants.Events.TYPING_START
    ],

    DIRECT_MESSAGES: [
        Constants.Events.MESSAGE_CREATE,
        Constants.Events.MESSAGE_UPDATE,
        Constants.Events.MESSAGE_DELETE,
        Constants.Events.CHANNEL_PINS_UPDATE
    ],

    DIRECT_MESSAGE_REACTIONS: [
        Constants.Events.MESSAGE_REACTION_ADD,
        Constants.Events.MESSAGE_REACTION_REMOVE,
        Constants.Events.MESSAGE_REACTION_REMOVE_ALL,
        Constants.Events.MESSAGE_REACTION_REMOVE_EMOJI
    ],

    DIRECT_MESSAGE_TYPING: [
        Constants.Events.TYPING_START
    ],

    GUILD_SCHEDULED_EVENTS: [
        Constants.Events.GUILD_SCHEDULED_EVENT_CREATE,
        Constants.Events.GUILD_SCHEDULED_EVENT_UPDATE,
        Constants.Events.GUILD_SCHEDULED_EVENT_DELETE,
        Constants.Events.GUILD_SCHEDULED_EVENT_USER_ADD,
        Constants.Events.GUILD_SCHEDULED_EVENT_USER_REMOVE
    ]
};

export class EventParser implements IEventParser {
    getRequirements(event: Events): IntentsString[] {
        const requirements = Object.entries(eventsPerIntents).filter(([_, events]) => events.includes(event));
        return requirements.map(([key, _]) => key as IntentsString);
    }
}
