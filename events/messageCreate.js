module.exports = (client, message) => {
    if (message.author.bot) return
    const prefix = 'r:'
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(' ')
    const ear = args.shift().toLowerCase()
    const command = client.commands.get(ear) || client.commands.get(client.aliases.get(ear))
    if (command) command.run(client, message, args)
}