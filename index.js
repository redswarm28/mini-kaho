const { readdirSync } = require('fs')
const { Client, Collection } = require('discord.js')
const { token } = require('./config/config.json')
const client = new Client()

/* Awal Command Handler */
const folders = readdirSync('./commands')
client.commands = new Collection()

for (const folder of folders) {
  const files = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'))

  for (const file of files) {
    const command = require(`./commands/${folder}/${file}`)
    client.commands.set(command.name, command)
  }
}
/* Akhir Command Handler */

/* Awal Event Handler */
const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of eventFiles) { // Event Handler
  const event = require(`./events/${file}`)
  event(client)
}
/* Akhir Event Handler */

/* Login */
client.login(token)
