module.exports = {
  name: 'createvoice',
  category: 'guild',
  description: 'Create a new voice channel',
  args: true,
  usage: '<channel name>',
  execute (message, args) {
    const { guild, member } = message
    const name = args.join(' ')

    if (member.hasPermission('MANAGE_CHANNELS')) {
      guild.channels.create(name, {
        type: 'voice'
      })
        .then(() => message.channel.send(`Created ${name} channel!`))
        .catch(console.error)
    } else {
      message.channel.send("Sorry, you don't have permission!")
    }
  }
}
