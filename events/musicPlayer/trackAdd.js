module.exports = client => {
  client.player.on('trackAdd', (message, queue, track) => {
    message.channel.send(`${track.title} [${track.duration}] has been added to the queue`)
  })
}
