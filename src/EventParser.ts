import { Intents, IntentsString } from 'discord.js';
import {
    GatewayDispatchEvents,
    GatewayIntentBits
} from 'discord-api-types/v10';

import { IEventParser } from '@types';

type EventsByIntent = { [K in GatewayIntentBits]: GatewayDispatchEvents[] };

const eventsByIntents: EventsByIntent = {
    [GatewayIntentBits.Guilds]: [
        GatewayDispatchEvents.GuildCreate,
        GatewayDispatchEvents.GuildUpdate,
        GatewayDispatchEvents.GuildDelete,
        GatewayDispatchEvents.GuildRoleCreate,
        GatewayDispatchEvents.GuildRoleUpdate,
        GatewayDispatchEvents.GuildRoleDelete,
        GatewayDispatchEvents.ChannelCreate,
        GatewayDispatchEvents.ChannelUpdate,
        GatewayDispatchEvents.ChannelDelete,
        GatewayDispatchEvents.ChannelPinsUpdate,
        GatewayDispatchEvents.ThreadCreate,
        GatewayDispatchEvents.ThreadUpdate,
        GatewayDispatchEvents.ThreadDelete,
        GatewayDispatchEvents.ThreadListSync,
        GatewayDispatchEvents.ThreadMemberUpdate,
        GatewayDispatchEvents.ThreadMembersUpdate,
        GatewayDispatchEvents.StageInstanceCreate,
        GatewayDispatchEvents.StageInstanceUpdate,
        GatewayDispatchEvents.StageInstanceDelete
    ],

    [GatewayIntentBits.GuildMembers]: [
        GatewayDispatchEvents.GuildMemberAdd,
        GatewayDispatchEvents.GuildMemberUpdate,
        GatewayDispatchEvents.GuildMemberRemove,
        GatewayDispatchEvents.ThreadMembersUpdate
    ],

    [GatewayIntentBits.GuildBans]: [
        GatewayDispatchEvents.GuildBanAdd,
        GatewayDispatchEvents.GuildBanRemove
    ],

    [GatewayIntentBits.GuildEmojisAndStickers]: [
        GatewayDispatchEvents.GuildEmojisUpdate,
        GatewayDispatchEvents.GuildStickersUpdate
    ],

    [GatewayIntentBits.GuildIntegrations]: [
        GatewayDispatchEvents.GuildIntegrationsUpdate,
        GatewayDispatchEvents.IntegrationCreate,
        GatewayDispatchEvents.IntegrationUpdate,
        GatewayDispatchEvents.IntegrationDelete
    ],

    [GatewayIntentBits.GuildWebhooks]: [GatewayDispatchEvents.WebhooksUpdate],

    [GatewayIntentBits.GuildInvites]: [
        GatewayDispatchEvents.InviteCreate,
        GatewayDispatchEvents.InviteDelete
    ],

    [GatewayIntentBits.GuildVoiceStates]: [
        GatewayDispatchEvents.VoiceStateUpdate
    ],

    [GatewayIntentBits.GuildPresences]: [GatewayDispatchEvents.PresenceUpdate],

    [GatewayIntentBits.GuildMessages]: [
        GatewayDispatchEvents.MessageCreate,
        GatewayDispatchEvents.MessageUpdate,
        GatewayDispatchEvents.MessageDelete,
        GatewayDispatchEvents.MessageDeleteBulk
    ],

    [GatewayIntentBits.GuildMessageReactions]: [
        GatewayDispatchEvents.MessageReactionAdd,
        GatewayDispatchEvents.MessageReactionRemove,
        GatewayDispatchEvents.MessageReactionRemoveAll,
        GatewayDispatchEvents.MessageReactionRemoveEmoji
    ],

    [GatewayIntentBits.GuildMessageTyping]: [GatewayDispatchEvents.TypingStart],

    [GatewayIntentBits.DirectMessages]: [
        GatewayDispatchEvents.MessageCreate,
        GatewayDispatchEvents.MessageUpdate,
        GatewayDispatchEvents.MessageDelete,
        GatewayDispatchEvents.ChannelPinsUpdate
    ],

    [GatewayIntentBits.DirectMessageReactions]: [
        GatewayDispatchEvents.MessageReactionAdd,
        GatewayDispatchEvents.MessageReactionRemove,
        GatewayDispatchEvents.MessageReactionRemoveAll,
        GatewayDispatchEvents.MessageReactionRemoveEmoji
    ],

    [GatewayIntentBits.DirectMessageTyping]: [
        GatewayDispatchEvents.TypingStart
    ],

    [GatewayIntentBits.GuildScheduledEvents]: [
        GatewayDispatchEvents.GuildScheduledEventCreate,
        GatewayDispatchEvents.GuildScheduledEventUpdate,
        GatewayDispatchEvents.GuildScheduledEventDelete,
        GatewayDispatchEvents.GuildScheduledEventUserAdd,
        GatewayDispatchEvents.GuildScheduledEventUserRemove
    ],

    [GatewayIntentBits.MessageContent]: []
};

export class EventParser implements IEventParser {
    getRequirements(event: GatewayDispatchEvents): IntentsString {
        const intentBit = (
            Object.keys(eventsByIntents) as unknown as GatewayIntentBits[]
        ).find((intent: GatewayIntentBits) =>
            eventsByIntents[intent].includes(event)
        );

        return (Object.keys(Intents.FLAGS) as unknown as IntentsString[]).find(
            (intent: IntentsString) => Intents.FLAGS[intent] === intentBit
        );
    }
}
