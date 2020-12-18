const { MessageEmbed } = require('discord.js')
const superagent = require('superagent')

module.exports = {
  name: 'cat',
  category: 'image',
  aliases: ['kitten', 'kitty'],
  description: 'Random cat image',
  async execute (message, args) {
    const { body } = await superagent
      .get('http://aws.random.cat/meow')

    const embed = new MessageEmbed()
      .setColor(0xffffff)
      .setTitle('Cat :cat:')
      .setImage(body.file)

    message.channel.send(embed)
  }
}
