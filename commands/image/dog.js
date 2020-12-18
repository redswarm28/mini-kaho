const { MessageEmbed } = require('discord.js')
const superagent = require('superagent')

module.exports = {
  name: 'dog',
  category: 'image',
  aliases: ['doggo'],
  description: 'Random dog image',
  async execute (message, args) {
    const { body } = await superagent
      .get('https://random.dog/woof.json')

    const embed = new MessageEmbed()
      .setColor(0xffffff)
      .setTitle('Dog :dog:')
      .setImage(body.url)

    message.channel.send(embed)
  }
}
