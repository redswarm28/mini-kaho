/*
 * Color
 *   - Hex without prefix (#). i.e. ffffff
 *   - Hex with prefix (#). i.e. #ffffff
 *   - Hex with prefix (0x). i.e. 0xffffff
 *   - Don't support by RGB, HSL and HSV
 */

module.exports = {
  name: 'addrole',
  category: 'guild',
  description: 'Add a role to your server',
  args: true,
  usage: '<role name> <role color>',
  execute (message, args) {
    const { guild, member } = message

    if (member.hasPermission('MANAGE_ROLES')) {
      const name = args[0]
      let color = args[1]

      if (!color) color = 'None'
      guild.roles.create({
        data: {
          name: name,
          color: color
        }
      })
        .then(() => message.channel.send(`Created role ${name} role!`))
        .catch(console.error)
    } else {
      message.channel.send("Sorry, you don't have permission!")
    }
  }
}
