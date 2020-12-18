module.exports = {
  name: 'clear',
  category: 'utility',
  aliases: ['prune'],
  description: 'Clear message(s)',
  cooldown: 5,
  args: true,
  usage: '<amount>',
  execute (message, args) {
    const amount = parseInt(args[0]) + 1

    if (amount <= 1 || amount > 100) {
      return message.reply('You need to input a number between 1 and 99.')
    }

    message.channel.bulkDelete(amount, true)
      .then(() => message.channel.send(`Deleted ${args[0]} messages`))
      .catch(error => {
        console.error(error)
        message.channel.send('There was an error trying to prune messages in this channel')
      })
  }
}
