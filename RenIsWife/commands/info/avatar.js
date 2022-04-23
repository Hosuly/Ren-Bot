const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    category: 'info',
    aliases: ['avt'],
    run: (client, message, args) => {
        const face = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
        const avatarURL = face.displayAvatarURL({ format: 'png', size: 4096, dynamic: false })
        const embed = new MessageEmbed()
            .setImage(avatarURL)
            .setTitle(`${face.tag}'s Avatar`)
            .setColor('BLURPLE')
            .setURL(avatarURL)
        message.channel.send({ embeds: [embed] })
    }
}