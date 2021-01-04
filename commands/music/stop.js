module.exports = {
  name: 'stop',
  description: 'Stop the track',
  category: 'music',
  execute (message, args) {
    const { client } = message
    const memberVoiceChannel = message.member.voice.channel
    const guildVoiceChannel = message.guild.me.voice.channel
    const musicQueue = client.player.getQueue(message)
    function noInVoice () {
      return guildVoiceChannel && memberVoiceChannel.id !== guildVoiceChannel.id
    }

    if (!memberVoiceChannel) return message.channel.send('You are not in a voice channel.')
    if (noInVoice()) return message.channel.send('You are not in the same voice channel.')
    if (!musicQueue) return message.channel.send('No music currently playing.')

    client.player.setRepeatMode(message, false)
    client.player.stop(message)
    message.channel.send('Music stopped into this server.')
  }
}
