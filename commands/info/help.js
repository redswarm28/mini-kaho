const { prefix } = require('../../config/config.json')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'help',
  category: 'info',
  aliases: ['commands'],
  description: 'Command list',
  cooldown: 5,
  execute (message, args) {
    const { commands } = message.client
    if (!args.length) {
      function listCmd (category) {
        const name = commands
          .filter(cmd => cmd.category === category)
          .map(cmd => cmd.name)
          .join(', ')
        return name
      }

      const admin = listCmd('admin')
      const fun = listCmd('fun')
      const guild = listCmd('guild')
      const image = listCmd('image')
      const info = listCmd('info')
      const music = listCmd('music')
      const utility = listCmd('utility')
      const avatar = message.client.user.displayAvatarURL({
        dynamic: true,
        size: 2048
      })

      const embed = new MessageEmbed()
        .setColor(0xffffff)
        .setTitle('Help')
        .setThumbnail(avatar)
        .addField('Admin', admin)
        .addField('Fun', fun)
        .addField('Guild', guild)
        .addField('Image', image)
        .addField('Info', info)
        .addField('Music', music)
        .addField('Utility', utility)
        .setFooter(`Use ${prefix}help <command name> to get more info.`)
      message.channel.send(embed)
    } else {
      const input = args[0].toLowerCase()
      const command = commands.get(input) || commands.find(c => c.aliases && c.aliases.includes(input))

      if (!command) return message.reply('Wrong command')

      const { aliases, cooldown, description, name, usage } = command

      const embed = new MessageEmbed()
        .setColor(0xffffff)
        .setTitle(`${name} | Help`)

      if (aliases) embed.addField('Aliases:', `${aliases.join(', ')}`)
      if (description) embed.addField('Description:', `${description}`)
      if (usage) embed.addField('Usage:', `${prefix}${name} ${usage}`)
      embed.addField('Cooldowns:', `${cooldown || 3} seconds`)

      message.channel.send(embed)
    }
  }
}
