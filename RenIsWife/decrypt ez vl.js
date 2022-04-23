var mineflayer = require("mineflayer");
var fs = require("fs");
const {Client, MessageEmbed} = require("discord.js");
const client = new Client;
const keepAlive = require("./server");
const superagent = require("superagent");
const util = require("minecraft-server-util");
const ms = require("ms");
const mongoose = require("mongoose");
const blacklist = require("./blacklist");
require("dotenv").config();
const {ownerid, livechat} = require("./config.json");
const config = {token: process.env.DISCORD_TOKEN, pin: process.env.PIN};
mongoose.connect("mongodb+srv://HungChannels:Aphihung1@iamhungchannels2002.w25vp.mongodb.net/Data", {useUnifiedTopology: true, useNewUrlParser: true});
client.on("ready", () => {
  console.log(`${""}${client.user.tag}${" đang hoạt động | https://www.facebook.com/HungChannels.TV"}`);
});
createBot();
function createBot() {
  const bot = mineflayer.createBot({host: "2y2c.org", port: 25565, username: username, version: "1.17.1"});
  bot.on("windowOpen", async (window) => {
    window.requiresConfirmation = false;
    bot.clickWindow(config.pin.split(" ")[0], 0, 0);
    bot.clickWindow(config.pin.split(" ")[1], 0, 0);
    bot.clickWindow(config.pin.split(" ")[2], 0, 0);
    bot.clickWindow(config.pin.split(" ")[3], 0, 0);
    setTimeout(() => {
      bot.chat("/2y2c");
    }, ms(`${"5s"}`));
    setTimeout(() => {
      bot.clickWindow(10, 0, 0);
    }, ms(`${"5s"}`));
  });
  bot.once("login", () => {
    bot.once("spawn", () => {
      const rejoin = (new MessageEmbed).setDescription(`${"**Bot đã đăng nhập vào server**"}`).setColor("GREEN");
      client.channels.cache.get(livechat).send(rejoin);
      console.log("Bot đã đăng nhập vào server");
      setInterval(() => {
        bot.swingArm("left");
        bot.look(Math.floor(Math.random() * Math.floor("360")), 0, true, null);
      }, 6e4);
    });
  });
  var time = 300;
  bot.on("end", reason => {
    const embed = (new MessageEmbed).setDescription(`${"**Bot mất kết nối server, lý do: \\`"}${reason}${"\\`\\, kết nối lại sau "}${time}${" giây**"}`).setColor("RED");
    client.channels.cache.get(livechat).send(embed);
    console.log(`${"Bot mất kết nối server, lý do: "}${reason}${", kết nối lại sau "}${time}${"s"}`);
    setTimeout(() => {
      const connected = (new MessageEmbed).setDescription(`${"**Đang kết nối lại server...**"}`).setColor("YELLOW");
      client.channels.cache.get(livechat).send(connected);
      console.log("Đang kết nối lại server...");
      createBot();
    }, ms(`${""}${time}${"s"}`));
  });
  bot.on("message", msg => {
    console.log(msg.toString());
    const ratlivechat = (new MessageEmbed).setDescription(msg.toString()).setColor("WHITE");
    client.channels.cache.get(livechat).send(ratlivechat);
  });
  client.on("message", async (client) => {
    if (!client.guild) {
      return;
    }
    if (client.author.bot || client.author.id === client.user.id) {
      return;
    }
    blacklist.findOne({id: client.author.id}, async (err, data) => {
      if (err) {
        throw err;
      }
      if (!data) {
        if (client.channel.id === livechat) {
          client.react("✅");
          bot.chat(`${"["}${client.author.tag}${"] "}${client.content}${""}`);
        }
      }
    });
  });
}
keepAlive();
client.login(config.token);