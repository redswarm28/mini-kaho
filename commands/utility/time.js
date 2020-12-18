const { MessageEmbed } = require('discord.js')
const moment = require('moment-timezone')

module.exports = {
  name: 'time',
  category: 'utility',
  aliases: ['clock'],
  description: 'Time in Indonesia',
  execute (message, args) {
    const wib = moment(Date.now()).tz('Asia/Jakarta').format('HH:mm A')
    const wita = moment(Date.now()).tz('Asia/Makassar').format('HH:mm A')
    const wit = moment(Date.now()).tz('Asia/Jayapura').format('HH:mm A')

    const embed = new MessageEmbed()
      .setColor(0xffffff)
      .setTitle('Time in Indonesia')
      .addField('Asia/Jakarta', wib)
      .addField('Asia/Makassar', wita)
      .addField('Asia/Jayapura', wit)

    message.channel.send(embed)
  }
}
