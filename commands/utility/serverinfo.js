const { MessageEmbed } = require('discord.js')
const moment = require('moment')

module.exports = {
  name: 'serverinfo',
  category: 'utility',
  aliases: ['server'],
  description: 'Shows information about the server.',
  execute (message, args) {
    const { guild } = message
    const { createdAt, id, memberCount, name, ownerID, region, verificationLevel } = guild
    const owner = guild.members.cache.get(ownerID).user.tag
    const channel = guild.channels.cache.size
    const time = moment.utc(createdAt).format('MMMM Do YYYY, h:mm a')

    const embed = new MessageEmbed()
      .setColor(0xffffff)
      .setTitle('Server Info')
      .addField('Name', name)
      .addField('Owner', owner)
      .addField('Member Count', memberCount)
      .addField('Channels', channel)
      .addField('Region', region)
      .addField('ID', id)
      .addField('Verification Level', verificationLevel)
      .addField('Create At', time)

    message.channel.send(embed)
  }
}
