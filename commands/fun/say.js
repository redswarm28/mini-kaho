module.exports = {
  name: 'say',
  description: 'Say something',
  args: true,
  usage: '<text>',
  execute (message, args) {
    const input = args.join(' ')

    message.channel.send(input)
      .then(() => message.delete())
      .catch(console.error)
  }
}
