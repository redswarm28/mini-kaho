const fs = require('fs')
const fetch = require('node-fetch')

module.exports = {
  name: 'achievement',
  category: 'image',
  aliases: ['ach'],
  description: 'Minecraft achievement unlocked',
  args: true,
  usage: '<text>',
  async execute (message, args) {
    const text = args.join(' ')
    const url = 'https://www.minecraftskinstealer.com/achievement/a.php?i=13&h=Achievement%20unlocked&t='

    if (text.length > 20) {
      return message.channel.send('Only 22 characters!')
    }

    async function download () {
      const response = await fetch(url + text)
      const buffer = await response.buffer()

      fs.writeFile('./assets/img/achievement.png', buffer, () => {
        message.channel.send({
          files: [{
            attachment: './assets/img/achievement.png',
            name: 'achievement.png'
          }]
        })
      })
    }

    download()
  }
}
