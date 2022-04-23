module.exports = (client, interaction) => {
    if (!interaction.isCommand()) return
    const command = client.interactions.get(interaction.commandName)
    if (!command) interaction.reply('Unknowns Command!')
    command.run(client, interaction)
}