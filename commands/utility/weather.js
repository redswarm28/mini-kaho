const { MessageEmbed } = require('discord.js')
const weather = require('weather-js')
const moment = require('moment')

module.exports = {
  name: 'weather',
  category: 'utility',
  description: 'Shows weather',
  args: true,
  usage: '<city name>',
  execute (message, args) {
    weather.find({
      search: args.join(' '),
      degreeType: 'C'
    }, function (err, result) {
      if (err) message.channel.send(err)

      const { date, imageUrl, observationpoint, skytext, temperature, winddisplay, humidity } = result[0].current
      const { degreetype, timezone } = result[0].location
      const time = moment(date).format('MMMM Do YYYY')
      const type = (degreetype === 'C') ? 'Celcius' : 'Fahrenheit'

      const embed = new MessageEmbed()
        .setColor(0xffffff)
        .setTitle('Weather')
        .setThumbnail(imageUrl)
        .addField(observationpoint, skytext)
        .addField('Timezone', `GMT ${timezone}`)
        .addField('Time', time)
        .addField('Degree Type', type)
        .addField('Temperature', `${temperature}° Degrees`)
        .addField('Wind Speed', winddisplay)
        .addField('Humidity', humidity)

      message.channel.send(embed)
    })
  }
}
