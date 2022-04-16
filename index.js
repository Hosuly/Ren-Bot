const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES] });
const config = require('./config.json');
const mineflayer = require('mineflayer');
var tpsPlugin = require('mineflayer-tps')(mineflayer);
const Vec3 = require('vec3').Vec3;
const minecraft = require('minecraft-server-util')
const antiafk = require("mineflayer-antiafk");
const ms = require("ms");
var fs = require("fs");
client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
client.interactions = new Collection();
client.snipes = new Map();

['command', 'event', 'slash'].forEach( handler => require(`./handlers/${handler}`)(client) );

// Snipe Code
client.on('messageDelete', function(message, channel){
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.id,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    })
})

// Mineflayer Code (Some embed code overhere is from HungChannels <3)
function RutiBot() {
    const bot = mineflayer.createBot({
        username: "__REN__",
        host: `2y2c.org`,
        version: '1.17.1'
    });

    bot.loadPlugin(tpsPlugin);
    bot.loadPlugin(antiafk);
    module.exports = require('./commands/2y2c/antiafk');
    var livechat = config.livechat
    var time = 5;

    bot.on('kicked', kick => {
            const gotkicked = new MessageEmbed()
            .setDescription(`${"**Ren đã bị đá ra khỏi server. Lý do**"}${kick}`)
            .setColor('GREY')
            client.channels.cache.get(livechat).send({ embeds: [gotkicked] })
            console.log(`${"**Ren đã bị đá ra khỏi server. Lý do**"}${kick}`);
    }),

    bot.on("end", reason => {
      const disconnected = new MessageEmbed()
      .setDescription(`${"**Bot mất kết nối server, lý do: \\`"}${reason}${"\\`\\, kết nối lại sau "}${time}${" giây**"}`)
      .setColor("RED")
      client.channels.cache.get(livechat).send({ embeds: [disconnected] })
      console.log(`${"Bot mất kết nối server, lý do: "}${reason}${", kết nối lại sau "}${time}${"s"}`)
      setTimeout(() => {
        const connected = new MessageEmbed()
            .setDescription(`${"**Đang kết nối lại server...**"}`)
            .setColor('ORANGE')
        client.channels.cache.get(livechat).send({ embeds: [connected] })
        console.log("Đang kết nối lại server...");
        RutiBot();
      }, ms(`${""}${time}${"s"}`))
        // setTimeout(() => RutiBot(), 1000)
    }),

    bot.on("windowOpen", async (window) => {
        window.requiresConfirmation = false;
        var pin = config.pin  
        bot.clickWindow(pin[0], 0, 0);
        bot.clickWindow(pin[1], 0, 0);
        bot.clickWindow(pin[2], 0, 0);
        bot.clickWindow(pin[3], 0, 0);
        setTimeout(() => {
          bot.chat("/2y2c");
        }, ms(`${"5s"}`));
        setTimeout(() => {
          bot.clickWindow(10, 0, 0);
        }, ms(`${"5s"}`));
    }),

    bot.once('login', () => {
        bot.once('spawn', () => {
            const joined = new MessageEmbed().setDescription(`${"**Ren đã ngủ dậy rồi đây!**"}`).setColor('BLURPLE')
            client.channels.cache.get(livechat).send({ embeds: [joined] });
            console.log("Ren đã ngủ dậy rồi đây!");
            setInterval(() => {
                bot.swingArm("left")
                bot.look(Math.floor(Math.random() * Math.floor("360")), 0, true, null)
            }, ms(`${"230s"}`))
            bot.once("message", () => {
                bot.chat('/skin GoCryBabe');
            })
          console.log(bot.entity.position.x, bot.entity.position.y, bot.entity.position.z);
        });
    })

    // Testing code moment lol
    // setTimeout(() => {
        // bot.on('playerJoined', (player) => {
        //     if (config.welcomePlayers = true) {
        //         if (player.username === bot.username) return;
        //         else {
        //             bot.chat(`> Xin chào ${player.username}! Tớ là Ren Bot thuộc sở hữu của Ruti được lập trình bởi Daddy Hosuly.`) // actually emits for every single player online to dont get kicked by server dont use it cuz it is so annoyingi
        //         }
        //     }
        // })
    // }, 19*1119);

    let px = config.prefix;
    bot.on('chat', async (username, message) => {
        if (!message.startsWith(px)) return
            const args = message.slice(px.length).trim().split(/ +/);
            const cmd = args.shift().toLowerCase();
            try {
                const command = require(`./commands/2y2c/${cmd}.js`);
                command.execute(bot, message, args, username)
            } catch (err) {
                console.log(err);
            }
        }),
    
    bot.on('message', (msg, username) => {
        console.log(`${msg.toString()} [${username}]`);
        const ratlivechat = new MessageEmbed()
            .setDescription(`${msg.toString()}`)
            .setColor('PURPLE');
        client.channels.cache.get(livechat).send({ embeds: [ratlivechat] });
    })

    client.on("message", async (client) => {
        if (!client.guild) {
          return;
        }
        if (client.author.bot || client.author.id === 'bot id') {
        return;
        }
        if (client.channel.id === livechat) {
            client.react('<:Ruti:960385259529191424>'); // <- dont mind this, its just a emoji react :) you can change it very easy, send "\emoji you want to copy id here"
            bot.chat(`${"["}${client.author.tag}${"] "}${client.content}${""}`);
        }
    });

    bot.on("message", async (bot, message, args, username) => {
        if (message === 'tps') {
            bot.chat(`${username} Current tps: ${bot.getTps()}`)
        } else if (message === 'online') {
            bot.chat(`${username} Player online: ${Object.values(bot.players).map(name => name.username).length}`)
        }
    })
}
RutiBot();

client.login(config.token)
