module.exports = {
  name: 'volume',
  category: 'music',
  usage: '<volume size between 1-100>',
  execute (message, args) {
    const { client } = message
    const memberVoiceChannel = message.member.voice.channel
    const guildVoiceChannel = message.guild.me.voice.channel
    const musicQueue = client.player.getQueue(message)
    function noInVoice () {
      return guildVoiceChannel && memberVoiceChannel.id !== guildVoiceChannel.id
    }
    function noNumberInput () {
      return !args[0] || isNaN(args[0]) || args[0] === 'Infinity'
    }
    function invalidNumberInput () {
      return Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100
    }

    if (!memberVoiceChannel) return message.channel.send('You are not in a voice channel.')
    if (noInVoice()) return message.channel.send('You are not in the same voice channel.')
    if (!musicQueue) return message.channel.send('No music currently playing.')
    if (noNumberInput()) return message.channel.send('Please enter a valid number')
    if (invalidNumberInput()) return message.channel.send('Please enter a valid number (between 1 and 100).')

    client.player.setVolume(message, parseInt(args[0]))
    message.channel.send(`Volume set to ${parseInt(args[0])}%`)
  }
}
