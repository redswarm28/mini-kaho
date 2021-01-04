module.exports = client => {
  client.player.on('queueEnd', (message, queue) => {
    message.channel.send('Music stopped as there is no more music in the queue.')
  })
}
