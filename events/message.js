const { Collection } = require('discord.js')
const { prefix } = require('../config/config.json')
const cooldowns = new Collection() // Cooldowns

module.exports = client => {
  client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/)
    const commandName = args.shift().toLowerCase()
    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === 'dm') return
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) // Command Aliases
    if (!command) return

    if (command.args && !args.length) { // Expected Command Usage & Required Arguments
      let reply = `You didn't provide any arguments, ${message.author}`
      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
      }
      return message.channel.send(reply)
    }

    if (!cooldowns.has(command.name)) { // Cooldowns
      cooldowns.set(command.name, new Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 3) * 1000
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000
        return message.reply(`Please wait ${timeLeft.toFixed(0)} more second(s) before using the \`${command.name}\` command.`)
      }
    }
    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

    try {
      command.execute(message, args)
    } catch (error) {
      console.error(error)
      message.reply('There was an error trying to execute that command!')
    }
  })
}
