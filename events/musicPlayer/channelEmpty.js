module.exports = client => {
  client.player.on('channelEmpty', (message, queue) => {
    message.channel.send('Music stopped as there is no more member in the voice channel.')
  })
}
