module.exports = {
    name: 'ping',
    category: 'info',
    aliases: ['p'],
    run: (client, message, args) => {
        message.reply(`${client.ws.ping}ms`)
    }
}