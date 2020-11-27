const { MessageEmbed } = require('discord.js')
const math = require('mathjs')

module.exports = {
  name: 'math',
  aliases: ['calc', 'calculator'],
  description: 'Simple calculator',
  args: true,
  usage: '<expression> e.g., 2+2*(9/sqrt(9))',
  execute (message, args) {
    let expression

    try {
      expression = math.evaluate(args.join(' '))
    } catch (e) {
      message.channel.send(`${e.message}`)
    }

    const embed = new MessageEmbed()
      .setColor(0xffffff)
      .addField('Output', `\`\`\`\n${expression}\`\`\``)

    message.channel.send(embed)
  }
}
