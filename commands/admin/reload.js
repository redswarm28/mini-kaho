/*
 * Reload command
 * Kendala:
 * Perintah tidak berfungsi jika args[0] atau
 * nama commandnya salah.
 *
 * Perintah akan diperbaiki dalam waktu dekat.
 */

const fs = require('fs')

module.exports = {
  name: 'reload',
  description: 'Reload sebuah perintah',
  args: true,
  usage: '<command>',
  execute (message, args) {
    const commandName = args[0].toLowerCase()
    const folders = fs.readdirSync('./commands')
    for (const folder of folders) {
      const files = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))
      for (file of files) {
        if (file === `${commandName}.js`) {
          const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
          delete require.cache[require.resolve(`../${folder}/${file}`)]
          try {
            const newCommand = require(`../${folder}/${file}`)
            message.client.commands.set(newCommand.name, newCommand)
          } catch (error) {
            console.error(error)
            message.channel.send(`There is an error when reloading \`${command.name}\`:\n\`${error.message}\``)
          }
          message.channel.send(`${command.name} has reloaded`)
        }
      }
    }
  }
} 
