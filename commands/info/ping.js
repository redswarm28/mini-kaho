const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'ping',
  category: 'info',
  description: 'Check bot ping.',
  execute (message, args) {
    const ping = message.client.ws.ping.toFixed(0)
    const latency = (Date.now() - message.createdTimestamp).toFixed(0)
    let color = ''

    if (ping < 100) {
      color = '#5DFF6B'
    } else if (ping >= 100 && ping < 200) {
      color = '#F3FF0B'
    } else {
      color = '#FF5714'
    }

    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle('Pong! :ping_pong:')
      .addField('API', `\`${ping}ms\``)
      .addField('Latency', `\`${latency}ms\``)

    message.channel.send(embed)
      .catch(console.error)
  }
}
