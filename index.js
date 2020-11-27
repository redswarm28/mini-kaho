const fs = require('fs')
const { Client, Collection } = require('discord.js')
const { token } = require('./config/config.json')
const client = new Client()

/* Awal Command Handler */
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
client.commands = new Collection()

for (const file of commandFiles) { // Command Handler
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}
/* Akhir Command Handler */

/* Awal Event Handler */
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of eventFiles) { // Event Handler
  const event = require(`./events/${file}`)
  event(client)
}
/* Akhir Event Handler */

/* Login */
client.login(token)
