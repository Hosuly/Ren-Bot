module.exports = {
    name: 'ping',
    description: 'Xem Ping Của Bot',
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        interaction.reply(`${client.ws.ping}ms`)
    },
}