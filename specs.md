Logger = l'information est récupérée et restructurée puis envoyée à travers un événement personnalisé

Par défaut, rien n'est loggé.
Si un événement est activé, alors il est loggé.
Si l'événement "all" est activé, alors tous les événéments sont loggés.

Un module de logging est une classe qui contient des méthodes pour logger chaque événement de manière personnalisée. Le module par défaut partagé par cette librairie utilise le bot et un canal Discord public pour partager l'information.

## Events

### Guild

| Event(s) DiscordJS | Event(s) Discord-Logs   | Description |
| ------------------ | ----------------------- | ----------- |
| guildUpdate        | guildBannerAdd          |             |
| guildUpdate        | guildAfkChannelAdd      |             |
| guildUpdate        | guildVanityURLRemove    |             |
| guildUpdate        | guildVanityURLUpdate    |             |
| guildUpdate        | guildFeaturesUpdate     |             |
| guildUpdate        | guildAcronymUpdate      |             |
| guildUpdate        | guildOwnerUpdate        |             |
| guildUpdate        | guildPartnerAdd         |             |
| guildUpdate        | guildPartnerRemove      |             |
| guildUpdate        | guildVerificationAdd    |             |
| guildUpdate        | guildVerificationRemove |             |
| guildUpdate        | guildBoostLevelUp       |             |
| guildUpdate        | guildBoostLevelDown     |             |
| guildUpdate        | unhandledGuildUpdate    |             |

### Guild Invites

| Event(s) DiscordJS | Event(s) Discord-Logs | Description |
| ------------------ | --------------------- | ----------- |
| inviteCreate       |                       |             |
| inviteDelete       |                       |             |

### Guild Channels

| Event(s) DiscordJS | Event(s) Discord-Logs           | Description |
| ------------------ | ------------------------------- | ----------- |
| channelCreate      |                                 |             |
| channelDelete      |                                 |             |
| channelUpdate      | guildChannelPermissionsUpdate   |             |
| channelUpdate      | guildChannelTopicUpdate         |             |
| channelUpdate      | unhandledGuildChannelUpdate     |             |
| threadCreate       |                                 |             |
| threadDelete       |                                 |             |
| threadUpdate       | threadStateUpdate               |             |
| threadUpdate       | threadNameUpdate                |             |
| threadUpdate       | threadLockStateUpdate           |             |
| threadUpdate       | threadRateLimitPerUserUpdate    |             |
| threadUpdate       | threadAutoArchiveDurationUpdate |             |
| threadUpdate       | unhandledThreadUpdate           |             |

### Guild Resources (emojis, stickers)

| Event(s) DiscordJS | Event(s) Discord-Logs | Description |
| ------------------ | --------------------- | ----------- |
| emojiCreate        |                       |             |
| emojiDelete        |                       |             |
| emojiUpdate        |                       |             |
| stickerCreate      |                       |             |
| stickerDelete      |                       |             |
| stickerUpdate      |                       |             |

### Guild Roles

| Event(s) DiscordJS | Event(s) Discord-Logs | Description |
| ------------------ | --------------------- | ----------- |
| roleCreate         |                       |             |
| roleDelete         |                       |             |
| roleUpdate         | rolePositionUpdate    |             |
| roleUpdate         | rolePermissionsUpdate |             |
| roleUpdate         | unhandledRoleUpdate   |             |

### Guild Events

| Event(s) DiscordJS        | Event(s) Discord-Logs | Description |
| ------------------------- | --------------------- | ----------- |
| guildScheduledEventCreate |                       |             |
| guildScheduledEventDelete |                       |             |
| guildScheduledEventUpdate |                       |             |

### Guild Members

| Event(s) DiscordJS                                          | Event(s) Discord-Logs                                 | Description                 |
| ----------------------------------------------------------- | ----------------------------------------------------- | --------------------------- |
| guildMemberAdd                                              | guildMemberEntered                                    |                             |
| guildMemberRemove                                           |                                                       | kick                        |
| guildMemberRemove<br>guildBanAdd                            |                                                       | ban                         |
| guildBanRemove                                              |                                                       | unban                       |
| guildMemberRemove                                           |                                                       | leave                       |
| guildMemberUpdate                                           | guildMemberNicknameUpdate                             |                             |
| guildMemberUpdate                                           | guildMemberRoleAdd<br>guildMemberRoleRemove           | role:\<id>                  |
| guildMemberUpdate                                           | guildMemberBoost                                      |                             |
| guildMemberUpdate                                           | guildMemberUnboost                                    |                             |
| guildScheduledEventUserAdd<br>guildScheduledEventUserRemove |                                                       | event:\<id>                 |
| guildMemberUpdate                                           | guildMemberOnline                                     |                             |
| guildMemberUpdate                                           | guildMemberOffline                                    |                             |
| guildMemberUpdate                                           |                                                       | member accepted guild rules |
| guildMemberUpdate                                           |                                                       | member got timed out        |
| guildMemberUpdate                                           | unhandledPresenceUpdate<br>unhandledGuildMemberUpdate |                             |

### User

| Event(s) DiscordJS | Event(s) Discord-Logs   | Description |
| ------------------ | ----------------------- | ----------- |
| userUpdate         | userAvatarUpdate        |             |
| userUpdate         | userUsernameUpdate      |             |
| userUpdate         | userDiscriminatorUpdate |             |
| userUpdate         | userFlagsUpdate         |             |
| userUpdate         | unhandledUserUpdate     |             |

### Messages

| Event(s) DiscordJS | Event(s) Discord-Logs  | Description |
| ------------------ | ---------------------- | ----------- |
| messageCreate      |                        |             |
| messageDelete      |                        |             |
| messageUpdate      | messagePinned          |             |
| messageUpdate      | messageContentEdited   |             |
| messageUpdate      | unhandledMessageUpdate |             |

### Voice

| Event(s) DiscordJS | Event(s) Discord-Logs     | Description |
| ------------------ | ------------------------- | ----------- |
| voiceStateUpdate   | voiceChannelJoin          |             |
| voiceStateUpdate   | voiceChannelLeave         |             |
| voiceStateUpdate   | voiceChannelSwitch        |             |
| voiceStateUpdate   | voiceChannelMute          |             |
| voiceStateUpdate   | voiceChannelUnmute        |             |
| voiceStateUpdate   | voiceChannelDeaf          |             |
| voiceStateUpdate   | voiceChannelUndeaf        |             |
| voiceStateUpdate   | voiceStreamingStart       |             |
| voiceStateUpdate   | voiceStreamingStop        |             |
| voiceStateUpdate   | unhandledVoiceStateUpdate |             |
