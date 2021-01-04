/*
 * Reload command
 * Kendala:
 * Perintah tidak berfungsi jika args[0] atau
 * nama commandnya salah.
 *
 * Perintah akan diperbaiki dalam waktu dekat.
 */

module.exports = {
  name: 'reload',
  description: 'Reload sebuah perintah',
  args: true,
  usage: '<command directory>',
  execute (message, args) {
    const { channel, client, guild, member } = message
    const dir = args.join(' ')
    if (member.id === guild.ownerID) { // guild.ownerID dapat diganti dengan user ID kita.
      delete require.cache[require.resolve(dir)]

      try {
        const newCommand = require(dir)
        client.commands.set(newCommand.name, newCommand)
      } catch (error) {
        console.log(error)
        channel.send(`There is an error when reloading this command:\n\`${error.message}\``)
      }

      message.channel.send('Reloaded!')
    } else {
      console.log("Doesn't work")
    }
  }
}
