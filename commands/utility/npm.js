const { MessageEmbed } = require('discord.js')
const request = require('node-superfetch')
const moment = require('moment')

module.exports = {
  name: 'npm',
  category: 'utility',
  description: 'Show information about node packages',
  cooldown: 5,
  args: true,
  usage: '<package name>',
  async execute (message, args) {
    const input = args.join(' ')
    const { body } = await request.get(`https://registry.npmjs.com/${input}`)

    if (body.time.unpublished) {
      return message.channel.send('This package is no longer exists.')
    }

    const description = body.description || 'No Description'
    const version = body['dist-tags'].latest
    const maintainers = body.maintainers.map(user => user.name).join(', ')
    const dependencies = body.versions[version].dependencies ? Object.keys(body.versions[version].dependencies) : null
    const license = body.license || 'None'
    const author = body.author ? body.author.name : 'Unknown'
    const creationDate = moment.utc(body.time.created).format('MMMM Do YYYY, h:mm a')
    const modificationDate = moment.utc(body.time.modified).format('MMMM Do YYYY, h:mm a')
    const depValue = dependencies && dependencies.length ? dependencies.join(', ') : 'None'

    const embed = new MessageEmbed()
      .setColor(0xffffff)
      .setTitle(`NPM | ${body.name}`)
      .setURL(`https://www.npmjs.com/package/${input}`)
      .setDescription(description)
      .addField('Version', version)
      .addField('License', license)
      .addField('Author', author)
      .addField('Creation Date', creationDate)
      .addField('Modification Date', modificationDate)
      .addField('Dependencies', depValue) // Work. With 'array trim' soon.
      .addField('Maintainers', maintainers)

    message.channel.send(embed)
  }
}
