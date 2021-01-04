module.exports = client => {
  client.player.on('trackStart', (message, track) => {
    message.channel.send(
      `Now Playing: ${track.title} [${track.duration}] \n` +
      `into channel: ${message.member.voice.channel.name}`
    )
  })
}
