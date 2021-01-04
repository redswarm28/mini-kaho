const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'f',
  category: 'fun',
  description: 'Press f to pay respect',
  execute (message, args) {
    const embed = new MessageEmbed()
      .setColor(0xffffff)
      .setDescription(`${message.author} had paid a respect`)

    message.channel.send(embed)
  }
}
