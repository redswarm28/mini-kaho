module.exports = {
  name: 'reload',
  description: 'Reload sebuah perintah',
  args: true,
  usage: '<command>',
  execute (message, args) {
    const commandName = args[0].toLowerCase()
    const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) return message.channel.send(`Perintah ${commandName} tidak ditemukan, ${message.author}`)

    delete require.cache[require.resolve(`./${command.name}.js`)]

    try {
      const newCommand = require(`./${command.name}.js`)
      message.client.commands.set(newCommand.name, newCommand)
    } catch (error) {
      console.error(error)
      message.channel.send(`Terdapat kesalahan ketika reload perintah \`${command.name}\`:\n\`${error.message}\``)
    }

    message.channel.send(`Perintah ${command.name} telah di-reload.`)
  }
}
