module.exports = client => {
  client.player.on('botDisconnect', message => {
    message.channel.send('Music stopped as i have been disconnected from the channel')
  })
}
