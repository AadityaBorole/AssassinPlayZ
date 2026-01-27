// === Minecraft AFK Bot ===
// Created by Ass OP (YouTube: AAG OP) — Cleaned & optimized version by ChatGPT
// Safe for Node v22 + Mineflayer v4.33.0+

const mineflayer = require('mineflayer')

const usernames = ['goonerbot1', 'goonerbot2', 'goonerbot3', 'goonerbot4', 'goonerbot5']

function createBot(accountIndex = 0) {
  const username = usernames[accountIndex]
  const bot = mineflayer.createBot({
    host: 'Garrinch211.aternos.me',   // 🌐 Server IP
    port: 25565,               // 🔌 Server Port
    username: username, // 🤖 Bot Username
    version: '1.21.4'          // 🧩 Minecraft Version (use 1.21.4 for Mineflayer support)
  })

  // === When Bot Spawns ===
  bot.once('spawn', () => {
    console.log('✅ Bot has joined the server.')

  setTimeout(() => {
    bot.chat('dez nuts')
    console.log('🔐 Login command sent.')
  }, 1500)

  setTimeout(() => {
    bot.chat('/is warp abhay6660 afk')
    console.log('🚀 Warp command sent.')
  }, 4000) // wait ~2.5s after login
})

  // === AFK Movement System ===
  // Keeps the bot moving so it doesn't get kicked for being idle
  bot.on('physicTick', () => {
    // This triggers every game tick (20x per second)
    // To prevent constant spam of movement, we use timed toggles.
    const time = Date.now() % 10000 // loop every 10s

    if (time < 1000) bot.setControlState('jump', true)
    else bot.setControlState('jump', false)

    if (time >= 1000 && time < 2000) bot.setControlState('forward', true)
    else bot.setControlState('forward', false)

    if (time >= 2000 && time < 3000) bot.setControlState('back', true)
    else bot.setControlState('back', false)

    if (time >= 3000 && time < 4000) bot.setControlState('right', true)
    else bot.setControlState('right', false)

    if (time >= 4000 && time < 5000) bot.setControlState('left', true)
    else bot.setControlState('left', false)
  })

  // === Error Handling ===
  bot.on('kicked', reason => {
    console.log('⚠️ Bot was kicked:', reason)
  })

  bot.on('error', err => {
    console.error('❌ Bot error:', err.message)
  })

  // === Auto Reconnect ===
  bot.on('end', () => {
    console.log('🔄 Bot disconnected. Reconnecting in 5 seconds...')
    setTimeout(createBot, 5000)
  })
}

// === Start the Bot ===
// Create all 5 bots with staggered start times
usernames.forEach((username, index) => {
  setTimeout(() => {
    console.log(`🚀 Starting bot ${index + 1}/${usernames.length}: ${username}`)
    createBot(index)
  }, index * 3000) // 3 second delay between each bot startup
})
