module.exports = {
  name: 'queue',
  description: 'Shows the track queue',
  category: 'music',
  execute (message, args) {
    const { client } = message
    const memberVoiceChannel = message.member.voice.channel
    const guildVoiceChannel = message.guild.me.voice.channel
    const musicQueue = client.player.getQueue(message)
    const isLooped = musicQueue.loopMode ? '(looped)' : ''
    const statementTrue = `And ${musicQueue.tracks.length - 5} other songs.`
    const statementFalse = `In the playlist ${musicQueue.tracks.length} song(s).`
    function noInVoice () {
      return guildVoiceChannel && memberVoiceChannel.id !== guildVoiceChannel.id
    }
    function queueMoreThan5 () {
      return (musicQueue.tracks.length > 5) ? statementTrue : statementFalse
    }

    if (!memberVoiceChannel) return message.channel.send('You are not in a voice channel.')
    if (noInVoice()) return message.channel.send('You are not in the same voice channel.')
    if (!musicQueue) return message.channel.send('No songs currently playing.')

    message.channel.send(
      `Server queue - ${message.guild.name} ${isLooped} \n` +
      `Current: ${musicQueue.playing.title} \n\n \`` +
      (musicQueue.tracks.map((track, i) => {
        return `#${i + 1} - ${track.title} (requested by : ${track.requestedBy.username})`
      }).slice(0, 5).join('\n') +
      `\`\n\n${queueMoreThan5()}`
      )
    )
  }
}
