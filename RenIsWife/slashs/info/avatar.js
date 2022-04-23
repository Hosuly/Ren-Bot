const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    description: 'Xem Avatar Của Người Khác',
    type: 'CHAT_INPUT',
    options: [
        {
            name: 'user',
            description: 'tag someone you want to get they avatar.',
            type: 'USER',
            required: false
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.getUser('user') || interaction.user
        const avatarURL = user.displayAvatarURL({ format: 'png', size: 4096, dynamic: false })
        const embed = new MessageEmbed()
            .setImage(avatarURL)
            .setTitle(`${user.tag}'s Avatar`)
            .setColor('BLURPLE')
            .setURL(avatarURL)
        interaction.reply({ embeds: [embed] })
    },
}