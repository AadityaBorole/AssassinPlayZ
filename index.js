// === Multi-Bot AFK System ===

const mineflayer = require('mineflayer')

const config = {
  host: 'garrinch211.aternos.me',
  port: 54869,          // Use your Aternos port
  version: '1.21.4'
}

// 👇 Add as many bot usernames as you want
const usernames = [
  'goonerbot1',
  'goonerbot2',
  'goonerbot3',
  'goonerbot4',
  'goonerbot5'
]

function createBot(username) {
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: username,
    version: config.version,
    connectTimeout: 30000
  })

  bot.once('spawn', () => {
    console.log(`✅ ${username} joined the server.`)

    setTimeout(() => {
      bot.chat(`${username} ready for fire`)
    }, 1500)
  })

  // AFK Movement Loop
  bot.on('physicTick', () => {
    const time = Date.now() % 10000

    bot.setControlState('jump', time < 1000)
    bot.setControlState('forward', time >= 1000 && time < 2000)
    bot.setControlState('back', time >= 2000 && time < 3000)
    bot.setControlState('right', time >= 3000 && time < 4000)
    bot.setControlState('left', time >= 4000 && time < 5000)
  })

  bot.on('kicked', reason => {
    console.log(`⚠️ ${username} was kicked:`, reason)
  })

  bot.on('error', err => {
    console.log(`❌ ${username} error:`, err.message)
  })

  bot.on('end', () => {
    console.log(`🔄 ${username} disconnected. Reconnecting...`)
    setTimeout(() => createBot(username), 5000)
  })
}

// Spawn all bots with slight delay between each
usernames.forEach((name, index) => {
  setTimeout(() => {
    createBot(name)
  }, index * 3000) // 3 second spacing
})
