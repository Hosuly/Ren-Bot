const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
const config = require('./config.json');
const mineflayer = require('mineflayer');
var tpsPlugin = require('mineflayer-tps')(mineflayer);
const Vec3 = require('vec3').Vec3;
const minecraft = require('minecraft-server-util')
client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
client.interactions = new Collection();
client.snipes = new Map();
client.commands = new Collection();

['command', 'event', 'slash'].forEach( handler => require(`./handlers/${handler}`)(client) );

// Snipe Code
client.on('messageDelete', function(message, channel){
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.id,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})

// Mineflayer Code
function RutiBot() {
    const bot = mineflayer.createBot({
        username: "__REN__",
        host: `2y2c.org`,
        version: '1.17.1'
    });
    bot.loadPlugin(tpsPlugin);
    bot.on('kicked', kick => {
        console.log(`Bot đã ngắt kết nối bới server. Lý do ${kick}`)
    })
    bot.on('end', (reason) => {
        console.log('Bot đã ngắt kết nối bới server. Lý do ' + reason)
        setTimeout(() => RutiBot(), 1000)
    })
    bot.on('spawn', () => {
        console.log('Bot spawn !')
        console.log(bot.entity.position.x, bot.entity.position.y, bot.entity.position.z)
       // mineflayerViewer(bot, { port: config.localport, firstPerson: true })
    })

    bot.on('windowOpen', async (window) => {
        var pin = config.pin    
        window.requiresConfirmation = false;
        bot.clickWindow(pin[0], 0, 0);
        bot.clickWindow(pin[1], 0, 0);
        bot.clickWindow(pin[2], 0, 0);
        bot.clickWindow(pin[3], 0, 0);
    
        
        setTimeout(() => { bot.chat('/2y2c') },  4*1000); // Dùng /2y2c sau khi login xong
    
        setTimeout(() => { bot.clickWindow(10,0,0) }, 7*1000);
    }),
    
    bot.on('message', (msg) => {
        console.log(msg.toString())
        client.channels.cache.get('964773010026418218').send('```\n' + `${msg.toString()}\n` + '```')
    })
}
RutiBot();

client.login(config.token)
