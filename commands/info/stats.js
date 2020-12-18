const { MessageEmbed, version } = require('discord.js')
const cpuStat = require('cpu-stat')
const moment = require('moment')
require('moment-duration-format')

module.exports = {
  name: 'stats',
  category: 'info',
  description: 'Bot stats',
  execute (message, args) {
    const { client } = message

    cpuStat.usagePercent(function (err, percent, seconds) {
      if (err) {
        return console.log(err)
      }

      const duration = moment.duration(client.uptime).format(' D [Days], H [Hours], m [Minutes], s [Seconds]')
      const usage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(0)
      const ping = client.ws.ping.toFixed(0)
      const latency = (Date.now() - message.createdTimestamp).toFixed(0)
      const cpu = percent.toFixed(0)

      const embed = new MessageEmbed()
        .setColor(0xffffff)
        .setTitle('Statistics')
        .setThumbnail(client.user.displayAvatarURL({ format: 'png' }))
        .setDescription(`Discord.js v${version} and Node.js ${process.version}`)
        .addField('Memory Usage', `${usage} MB`)
        .addField('Uptime', duration)
        .addField('Architecture', process.arch)
        .addField('Platform', process.platform)
        .addField('CPU Usage', `${cpu} %`)
        .addField('Connection', `Ping: ${ping}ms and Latency: ${latency}ms`)

      message.channel.send(embed)
    })
  }
}
