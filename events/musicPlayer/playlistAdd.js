module.exports = client => {
  client.player.on('playlistAdd', (message, queue, playlist) => {
    message.channel.send(
      `${playlist.title} [${playlist.duration}] has been added to the queue (${playlist.tracks.length} songs).`
    )
  })
}
