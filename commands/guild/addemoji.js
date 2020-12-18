module.exports = {
  name: 'addemoji',
  category: 'guild',
  description: 'Add an emoji to your server.',
  cooldown: 10,
  args: true,
  usage: '<image url> <emoji name>',
  execute (message, args) {
    const { guild, member } = message

    if (member.hasPermission('MANAGE_EMOJIS')) {
      const link = args[0]
      const name = args[1]

      if (!name) {
        message.channel.send('Give the emoji name first!')
      }

      guild.emojis.create(link, name)
        .then(() => message.channel.send(`Created :${name}: emote!`))
        .catch(console.error)
    } else {
      message.channel.send("Sorry, you don't have the permission to run this command!")
    }
  }
}
