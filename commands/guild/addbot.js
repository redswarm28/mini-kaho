const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'addbot',
  category: 'guild',
  description: 'Give a bot invite link to your server.',
  args: true,
  usage: '<bot id> [prefix]',
  execute (message, args) {
    const botID = args[0]
    const bot = message.client.users.cache.get(args[0])
    let prefix = args[1]

    if (!prefix) {
      prefix = 'Unknown'
    }

    const embed = new MessageEmbed()
      .setColor(0xffffff)
      .setTitle('Invite a bot to your server')
      .setDescription(`${message.author}, the bot invite link is ready. [Click here](https://discordapp.com/api/oauth2/authorize?client_id=${botID}&permissions=8&scope=bot)`)
      .addField('Name', `${bot.username}#${bot.discriminator}`)
      .addField('ID', botID)
      .addField('Prefix', prefix)

    return message.channel.send(embed)
  }
}
