const { MessageEmbed } = require('discord.js')
const weather = require('weather-js')
const moment = require('moment')

module.exports = {
  name: 'weather',
  description: 'Shows weather',
  args: true,
  usage: '<city name>',
  execute (message, args) {
    weather.find({
      search: args.join(' '),
      degreeType: 'C'
    }, function (err, result) {
      if (err) {
        message.channel.send(err)
      }

      const { date, imageURL, observationpoint, skytext, temperature, windspeed, humidity } = result[0].current
      let { degreeType, timezone } = result[0].location
      const time = moment(date).format('MMMM Do YYYY')

      if (degreeType === 'C') {
        degreeType = 'Celcius'
      } else {
        degreeType = 'Fahrenheit'
      }

      const embed = new MessageEmbed()
        .setColor(0xffffff)
        .setTitle('Weather')
        .setThumbnail(imageURL)
        .addField(observationpoint, skytext)
        .addField('Timezone', `GMT ${timezone}`)
        .addField('Time', time)
        .addField('Degree Type', degreeType)
        .addField('Temperature', `${temperature}° Degrees`)
        .addField('Wind Speed', windspeed)
        .addField('Humidity', humidity)

      message.channel.send(embed)
    })
  }
}
