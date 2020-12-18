module.exports = {
  name: 'say',
  categry: 'fun',
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
