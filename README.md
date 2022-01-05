<a href="https://www.npmjs.com/package/@hunteroi/discord-logger"><img src="https://badge.fury.io/js/%40hunteroi%2Fdiscord-logger.svg" alt="npm version" height="18"></a>

# discord-logger

A superset of events on top of DiscordJS ones, enabling to log events occuring in your guild

![IMAGE](assets/example.gif)

See [./example/index.js](example/index.js).

## Installation

```sh
npm install --save @hunteroi/discord-logger
```

## Prerequisites ⚠️

You must use **NodeJS v16.6.0 or higher** to run a bot with this library.

You also must not forget to include [mandatory intents](#mandatory-intents) and [partials](#partials) as well as give your bot the rights to read messages and commands.

### Mandatory intents

-

### Partials

-

## Events

```ts
manager.on(LoggerManagerEvents.<eventname>, () => {});
```

## Contribution

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Branch: `git checkout -b patch/YourAmazingWork`
3. Commit your Changes: `git commit -m 'Add some amazing work'`
4. Push to the Branch: `git push origin patch/YourAmazingWork`
5. Open a Pull Request
