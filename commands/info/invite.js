const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'invite',
  category: 'info',
  description: 'Invite the bot to your server',
  execute (message, args) {
    const embed = new MessageEmbed()
      .setColor(0xffffff)
      .addField('Invite', '[Click here](https://yourlink.com) to invite the bot to your server')

    message.channel.send(embed)
  }
}
