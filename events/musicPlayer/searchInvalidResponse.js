module.exports = client => {
  client.player.on('searchInvalidResponse', (message, query, tracks, invalidResponse, collector) => {
    if (invalidResponse === 'cancel') {
      collector.stop()
      return message.channel.send('The selection has been cancelled.')
    }
    message.channel.send(`You must send a valid number between 1 and ${tracks.length}.`)
  })
}
