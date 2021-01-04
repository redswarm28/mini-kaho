module.exports = client => {
  client.player.on('searchCancel', (message, query, tracks) => {
    message.channel.send('You did not provide a valid response. Please send the command again.')
  })
}
