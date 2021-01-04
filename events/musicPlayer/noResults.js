module.exports = client => {
  client.player.on('noResults', (message, query) => {
    message.channel.send(`No results found on YouTube for ${query}.`)
  })
}
