import { Client, GatewayIntentBits, type Message, type PartialMessage } from 'discord.js';

import { type IModule, LoggerManager } from '../lib/index.js';

class DiscordChannelModule implements IModule {
  #client: Client;

  constructor(client: Client) {
    this.#client = client;
  }

  async on_messageCreate(message: Message) {
    if (message.author.bot) return;
    await message.reply('[DiscordChannelModule] on_messageCreate (async)');
  }

  on_messageUpdate(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) {
    if (newMessage.author?.bot) return;
    newMessage.reply('[DiscordChannelModule] on_messageUpdate (sync)');
  }

  async on_messageDelete(message: Message | PartialMessage) {
    if (message.author?.bot) return;
    const channel = await this.#client.channels.fetch(message.channelId);

    if (channel && "send" in channel)
      await channel.send('[DiscordChannelModule] on_messageDelete (async)');
  }
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});
const modules: IModule[] = [
  {
    on_ready() {
      console.log('[anonymous 1] on_ready (sync)');
    },

    on_messageCreate(message: Message) {
      if (message.author.bot) return;
      console.log(`[anonymous 1] on_messageCreate (sync): ${message.content}`);
    },

    async on_messageUpdate(oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage) {
      if (newMessage.author?.bot) return;
      await newMessage.reply(`[anonymous 1] on_messageUpdate (async) ${newMessage.content}`);
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
