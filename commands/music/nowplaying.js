const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  description: 'Checks the now playing track.',
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
    if (noInVoice()) return message.channel.send('You are not in the same voice channel')
    if (!musicQueue) return message.channel.send('No music currently playing.')

    const track = client.player.nowPlaying(message)
    const embed = new MessageEmbed()
      .setColor(0xffffff)
      .setTitle(track.title)
      .setThumbnail(track.thumbnail)
      .addField('Duration: ', track.duration)
      .addField('Volume: ', musicQueue.volume)
      .addField('Repeat Mode: ', musicQueue.repeatMode ? 'Yes' : 'No')
      .setFooter('Requested by: ' + track.requestedBy.username)
    message.channel.send(embed)
  }
}
