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
    await channel.send('[DiscordChannelModule] on_messageCreate (async)');
  }

  on_messageUpdate(oldMessage, newMessage) {
    if (newMessage.author.bot) return;
    newMessage.reply('[DiscordChannelModule] on_messageUpdate (sync)');
  }

  async on_messageDelete(message) {
    if (message.author.bot) return;
    const channel = await this.#client.channels.fetch(message.channelId);
    await channel.send('[DiscordChannelModule] on_messageDelete (async)');
  }
}

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const modules = [
  {
    on_ready() {
      console.log('[anonymous 1] on_ready (sync)');
    },

    on_messageCreate(message) {
      if (message.author.bot) return;
      console.log(`[anonymous 1] on_messageCreate (sync): ${message.content}`);
    },

    async on_messageUpdate(oldMessage, newMessage) {
      if (newMessage.author.bot) return;
      await newMessage.reply('[anonymous 1] on_messageUpdate (async)');
    },
  },
  new DiscordChannelModule(client),
];
const manager = new LoggerManager(client, modules);

manager.listenWithAllModulesTo('messageCreate');
manager.listenWithAllModulesTo('messageUpdate');
manager.listenWithAllModulesTo('messageDelete');
manager.listenWithAllModulesTo('ready');

client.login('TOKEN');
