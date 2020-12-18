const { MessageEmbed } = require('discord.js')
const superagent = require('superagent')

module.exports = {
  name: '8ball',
  category: 'fun',
  description: 'Question and answer',
  args: true,
  usage: '<question>',
  async execute (message, args) {
    const color = 0xffffff
    const question = args.join(' ')

    const { body } = await superagent
      .get('https://8ball.delegator.com/magic/JSON/' + question)

    const q = body.magic.question
    const a = body.magic.answer
    const t = body.magic.type

    const embed = new MessageEmbed()
      .setColor(color)
      .setTitle(':8ball: 8ball')
      .addField('Question', q)
      .addField('Answer', a)
      .setFooter(`${t}. Requested by ${message.author.tag}`)

    message.channel.send(embed)
  }
}
