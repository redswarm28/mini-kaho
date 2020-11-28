const { prefix } = require('../../config/config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'help',
  aliases: ['commands'],
  description: 'Command list',
  cooldown: 5,
  execute (message, args) {
    const data = []
    const { commands } = message.client

    if (!args.length) {
      data.push(commands.map(command => command.name).join('`, `'))

      const embed = new MessageEmbed()
        .setColor(0xffffff)
        .setTitle('Help')
        .setDescription(`Command List:\n\`${data}\``)
        .setFooter(`Use ${prefix}help <command name> to get more info.`)

      message.channel.send(embed)
    } else {
      const input = args[0].toLowerCase()
      const command = commands.get(input) || commands.find(c => c.aliases && c.aliases.includes(input))

      if (!command) {
        return message.reply('Wrong command')
      }

      const { aliases, cooldown, description, name, usage } = command

      const embed = new MessageEmbed()
        .setColor(0xffffff)
        .setTitle(`${name} | Help`)

      if (aliases) {
        embed.addField('Aliases:', `${aliases.join(', ')}`)
      }
      if (description) {
        embed.addField('Description:', `${description}`)
      }
      if (usage) {
        embed.addField('Usage:', `${prefix}${name} ${usage}`)
      }

      embed.addField('Cooldowns:', `${cooldown || 3} seconds`)

      message.channel.send(embed)
    }
  }
}
