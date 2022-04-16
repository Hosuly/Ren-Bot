module.exports = {
    name: '',
    execute(bot, message, args, username)  {
        bot.chat(`/msg ${username} Current tps: ${bot.getTps()}`)
    }    
}