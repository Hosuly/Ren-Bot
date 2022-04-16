module.exports = {
    name: 'online',
    category: '2y2c',
    aliases: [],
    execute(bot, message, args, username)  {
        bot.chat(`/msg ${username} Player online: ${Object.values(bot.players).map(name => name.username).length}`)       
    }
}