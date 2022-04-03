const { Client, Intents } = require('discord.js');
const { LoggerManager } = require('../lib');

class DiscordChannelModule {
    #client;

    constructor(client) {
        this.#client = client;
    }

    async on_messageCreate(message) {
        if (message.author.bot) return;
        const channel = await this.#client.channels.fetch(message.channelId);
        await channel.send('[2] ok!!');
    }

    on_messageUpdate(oldMessage, newMessage) {
        if (newMessage.author.bot) return;
        newMessage.reply('[2] ah updated one I see');
    }

    async on_messageDelete(message) {
        if (message.author.bot) return;
        const channel = await this.#client.channels.fetch(message.channelId);
        await channel.send('[2] you deleted it????');
    }
}

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});
const modules = [
    {
        on_ready() {
            console.log('[1] client ready!');
        },

        on_messageCreate(message) {
            if (message.author.bot) return;
            console.log(`[1] ${message.content}`);
        },

        async on_messageUpdate(oldMessage, newMessage) {
            if (newMessage.author.bot) return;
            await newMessage.reply('[1] yes');
        }
    },
    new DiscordChannelModule(client)
];
const manager = new LoggerManager(client, modules);

manager.listenWithAllModulesTo('messageCreate');
manager.listenWithAllModulesTo('messageUpdate');
manager.listenWithAllModulesTo('messageDelete');
manager.listenWithAllModulesTo('ready');

client.login('TOKEN');
