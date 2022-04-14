const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./config.json');
const fs = require('fs');
client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
client.interactions = new Collection();
client.snipes = new Map();

['command', 'event', 'slash'].forEach( handler => require(`./handlers/${handler}`)(client) );

client.on('messageDelete', function(message, channel){ //Sn
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.id,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})

client.login(config.token)
