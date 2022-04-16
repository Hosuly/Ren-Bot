module.exports = {
    name: 'tps',
    category: '2y2c',
    aliases: [],
    execute(bot, message, args, username)  {
        bot.chat(`/msg ${username} Current tps: ${bot.getTps()}`)
        
    }
}