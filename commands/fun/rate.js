module.exports = {
  name: 'rate',
  category: 'fun',
  description: 'Rate your waifu.',
  args: true,
  usage: '<text>',
  execute (message, args) {
    const input = args.join(' ')
    const rate = Math.floor(Math.random() * 10)

    message.channel.send(`I would give ${input} ${rate}`)
  }
}
