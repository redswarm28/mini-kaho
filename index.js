const { readdirSync } = require('fs')
const { token } = require('./config/config.json')
const { Client, Collection } = require('discord.js')
const client = new Client()
const { Player } = require('discord-player')
client.player = new Player(client)

/* Awal Command Handler */
const folders = readdirSync('./commands')
client.commands = new Collection()
for (const folder of folders) {
  const files = readdirSync(`./commands/${folder}`)
    .filter(file => file.endsWith('.js'))
  for (const file of files) {
    const command = require(`./commands/${folder}/${file}`)
    client.commands.set(command.name, command)
  }
}

/* Awal Event Handler */
const eventFiles = readdirSync('./events')
  .filter(file => file.endsWith('.js'))

const musicEventFiles = readdirSync('./events/musicPlayer')
  .filter(file => file.endsWith('.js'))

for (const file of eventFiles) { // Event Handler
  const event = require(`./events/${file}`)
  event(client)
}

for (const file of musicEventFiles) { // Music Event Handler
  const event = require(`./events/musicPlayer/${file}`)
  event(client)
}

/* Login */
client.login(token)
