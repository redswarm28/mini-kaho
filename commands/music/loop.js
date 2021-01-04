module.exports = {
  name: 'loop',
  aliases: ['repeat'],
  description: 'Looping a track or queue',
  category: 'music',
  usage: '[queue]',
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
    if (args.join(' ').toLowerCase() === 'queue') {
      if (musicQueue.loopMode) {
        client.player.setLoopMode(message, false)
        return message.channel.send('Repeat mode disabled.')
      } else {
        client.player.setLoopMode(message, true)
        return message.channel.send('Repeat mode enabled, the whole queue will be repeated endlessly.')
      }
    } else {
      if (client.player.getQueue(message).repeatMode) {
        client.player.setRepeatMode(message, false)
        return message.channel.send('Repeat mode disabled.')
      } else {
        client.player.setRepeatMode(message, true)
        return message.channel.send('Repeat mode enabled, the current music will be repeated endlessly.')
      }
    }
  }
}
