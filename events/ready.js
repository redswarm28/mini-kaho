module.exports = client => {
  client.once('ready', () => { // Event Ready
    console.log('Ready!')
    client.user.setPresence({ activity: { name: 'your command.', type: 'LISTENING' }, status: 'dnd' })
  })
}
