module.exports = {
    name: '',
    execute(bot, message, args, username)  {
        bot.chat(`/msg ${username} Player online: ${Object.values(bot.players).map(name => name.username).length}`)
    }    
}