module.exports = {
  name: 'iq',
  category: 'fun',
  description: 'Show your iq',
  execute (message, args) {
    const iq = Math.floor(Math.random() * 200)
    message.channel.send('Your IQ is ' + iq)
  }
}
