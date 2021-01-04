module.exports = client => {
  client.player.on('searchResults', (message, query, tracks) => {
    const searchList = tracks
      .map((t, i) => `${i + 1} - ${t.title} [${t.duration}]`)
      .join('\n')
    message.channel.send(
      `Here are your search results for ${query} \n` +
      `\`\`\`\n${searchList}\`\`\` \n` +
      'Type **cancel** to cancel the selection.'
    )
  })
}
