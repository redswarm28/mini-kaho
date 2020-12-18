module.exports = {
  name: 'createcategory',
  category: 'guild',
  description: 'Create a new channel category',
  args: true,
  usage: '<category name>',
  execute (message, args) {
    const { guild, member } = message
    const name = args.join(' ')

    if (member.hasPermission('MANAGE_CHANNELS')) {
      guild.channels.create(name)
        .then(() => message.channel.send(`Created ${name} category!`))
        .catch(console.error)
    } else {
      message.channel.send("Sorry, you don't have permission!")
    }
  }
}
