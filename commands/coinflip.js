module.exports = {
  name: 'coinflip',
  description: 'Simple coinflip',
  execute (message, args) {
    function coinFlip () {
      const choice = ['Head', 'Tail']
      return choice[Math.floor(Math.random() * choice.length)]
    }

    message.channel.send(`${message.author} tossed a coin and got ${coinFlip()}!`)
  }
}
