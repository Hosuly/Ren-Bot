const { Client, Intents, Collection, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES] });
const config = require('./config.json');
const mineflayer = require('mineflayer');
var tpsPlugin = require('mineflayer-tps')(mineflayer);
const Vec3 = require('vec3').Vec3;
const { pathfinder, Movements } = require('mineflayer-pathfinder')
const { GoalBlock } = require('mineflayer-pathfinder').goals
const minecraft = require('minecraft-server-util');
const antiafk = require("mineflayer-antiafk");
const mineflayerViewer = require('prismarine-viewer').mineflayer;
var navigatePlugin = require('mineflayer-navigate')(mineflayer);
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
        username: "bot username",
        host: `2y2c.org`,
        version: '1.17.1',
        keepAlive: false
    });

    bot.loadPlugin(tpsPlugin);
    navigatePlugin(bot);
    bot.loadPlugin(antiafk);
    bot.loadPlugin(pathfinder);
    const mcData = require('minecraft-data')(bot.version)
    module.exports = require('./commands/2y2c/antiafk');
    const defaultMove = new Movements(bot, mcData);
    var time = 5;
    const World = require('prismarine-world')(bot.version);
    const Chunk = require('prismarine-chunk')(bot.version);
    const world = new World(() => new Chunk()); 
    mineflayerViewer(bot, { port: 25568, firstPerson: false })

    bot.on("end", reason => {
        bot.viewer.close()
        const disconnected = new MessageEmbed()
        .setDescription(`${"**Ren đã bị đá ra khỏi server. Lý do: \\`"}${reason}${"\\`\\, kết nối lại sau "}${time}${" giây**"}`)
        .setColor("RED")
        client.channels.cache.get(config.livechat).send({ embeds: [disconnected] })
        console.log(`${"Bot mất kết nối server, lý do: "}${reason}${", kết nối lại sau "}${time}${"s"}`)
        setTimeout(() => {
            const connected = new MessageEmbed()
                .setDescription(`${"**Đang kết nối lại server...**"}`)
                .setColor('ORANGE')
            client.channels.cache.get(config.livechat).send({ embeds: [connected] })
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
            client.once('msg', () => {
                const imjoin = new MessageEmbed().setDescription("**Ren đã ngủ dậy rồi đây!**").setColor('BLURPLE')
                client.channels.cache.get(config.livechat).send({ embeds: [imjoin] });
            })
            console.log("Ren đã ngủ dậy rồi đây!");
            setInterval(() => {
                bot.afk.start()
                bot.chat('> join Ruti for Ren. please~ -w- | https://discord.gg/QRFes3n4We') || bot.chat('> Xin chào mọi người! Tớ là Ren Bot thuộc sở hữu của Ruti được lập trình bởi Daddy Hosuly.') || bot.chat('> Shop kit của Ruti nè nhớ ủng nha! Link: https://discord.gg/bdpx9P5HWV')
            }, ms(`${"32s"}`))
            bot.once("chat", () => {
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
        //             bot.chat(`> Xin chào ${player.username}! Tớ là Ren Bot thuộc sở hữu của Ruti được lập trình bởi Daddy Hosuly.`) // actually emits for every single player online
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
        client.channels.cache.get(config.livechat).send({ embeds: [ratlivechat] });
    })

    client.on("message", async (client) => {
        if (!client.guild) {
          return;
        }
        if (client.author.bot || client.author.id === 'bot id') {
        return;
        }
        if (client.channel.id === config.livechat) {
            client.react('<:Ruti:960385259529191424>');
            bot.chat(`${"["}${client.author.tag}${"] "}${client.content}${""}`);
        } 
        else if (client.channel.id === config.onlyaccess) {
            client.react('<:Ruti:960385259529191424>');
            bot.chat(`${client.content}${""}`);
        }
    });
    bot.on("message", async (bot, message, args, username, client) => {
        if (message === 'tps') {
            bot.chat(`${username} Current tps: ${bot.getTps()}`)
        } else if (message === 'online') {
            bot.chat(`${username} Player online: ${Object.values(bot.players).map(name => name.username).length}`)
        } else if (message === 'ninjago') {
            bot.on('path_update', (r) => {
                const nodesPerTick = (r.visitedNodes * 50 / r.time).toFixed(2)
                console.log(`I can get there in ${r.path.length} moves. Computation took ${r.time.toFixed(2)} ms (${nodesPerTick} nodes/tick). ${r.status}`)
                const path = [bot.entity.position.offset(0, 0.5, 0)]
                for (const node of r.path) {
                  path.push({ x: node.x, y: node.y + 0.5, z: node.z })
                }
                bot.viewer.drawLine('path', path, 0xff00ff)
            })
            bot.viewer.on('blockClicked', (block, face, button) => {
                if (button !== 2) return // only right click
            
                const p = block.position.offset(0, 1, 0)
            
                bot.pathfinder.setMovements(defaultMove)
                bot.pathfinder.setGoal(new GoalBlock(p.x, p.y, p.z))
            })
        }
    })
}
RutiBot();

client.login(config.token)
