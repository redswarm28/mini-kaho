module.exports = {
  name: 'iq',
  description: 'Show your iq',
  execute (message, args) {
    const iq = Math.floor(Math.random() * 200)
    message.channel.send('Your IQ is ' + iq)
  }
}
