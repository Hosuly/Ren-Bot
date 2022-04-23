const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'snipe',
    category: 'ulits',
    aliases: ['sn'],
    run: (client, message, args) => {
        const msg = client.snipes.get(message.channel.id);
        if (!msg) return message.channel.send('Không Thể Tìm Thấy Tin Nhắn Đã Xóa!');

        const embed = new MessageEmbed()
            .setTitle('Tìm Thấy Tin Nhắn Đã Xóa!')
            .setDescription('Người Gửi: ' + `<@${msg.author}>\n` + 'Trong Kênh: ' + `<#${message.channel.id}>\n` + 'Tin Nhắn Đã Xóa:\n' + msg.content)
            .setColor('BLURPLE')
            .setTimestamp()
            if (msg.image) embed.setImage(msg.image);
        message.channel.send({ embeds: [embed] })
    }
}