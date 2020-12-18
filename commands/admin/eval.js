const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'eval',
  aliases: ['e'],
  category: 'admin',
  description: 'Another terminal',
  args: true,
  usage: '<code>',
  execute (message, args) {
    const { guild, member, content } = message
    const input = args.join(' ')
    if (member.id === guild.ownerID) { // guild.ownerID dapat diganti dengan user ID kita.
      try {
        const result = eval(content.replace('k.eval ', ''))
        const embed = new MessageEmbed()
          .setColor(0xffffff)
          .addField('Input', `\`\`\`js\n${input}\`\`\``)
          .addField('Output', `\`\`\`js\n${result}\`\`\``)
        message.channel.send(embed)
      } catch (e) {
        const embed = new MessageEmbed()
          .setColor(0xffffff)
          .addField('Input', `\`\`\`js\n${input}\`\`\``)
          .addField('Output', `\`\`\`js\n${e}\`\`\``)
        message.channel.send(embed)
      }
    } else {
      console.log("Doesn't work")
    }
  }
}
