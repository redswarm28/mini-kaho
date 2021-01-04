const { MessageEmbed } = require('discord.js')
const math = require('mathjs')

module.exports = {
  name: 'math',
  category: 'utility',
  aliases: ['calc', 'calculator'],
  description: 'Simple calculator',
  args: true,
  usage: '<expression> e.g., 2+2*(9/sqrt(9))',
  execute (message, args) {
    /*
     * Issue (1): Memory Leak when use ":" operator.
     * Solution: limit the number until 99.
     */
    const item = args[0]
    const condition = item.indexOf(':') === 1
    if (condition) {
      if (!(item.startsWith(1))) return
      const amount = item.split(':').slice(1)
      if (amount > 100) {
        message.channel.send('Sorry, only 99')
        return
      }
    }

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
