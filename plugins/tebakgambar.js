let fetch = require('node-fetch')

let timeout = 60000
let poin = 50000
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakgambar = conn.tebakgambar ? conn.tebakgambar : {}
  let id = m.chat
  if (id in conn.tebakgambar) {
    conn.reply(m.chat, 'Maaf kak🙏hehe,soal sebelumnya masih belum terjawab😉', conn.tebakgambar[id][0])
    throw false
  }
  let src = await (await fetch('https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakgambar.json')).json()
    let json = src[Math.floor(Math.random() * src.length)]
  // if (!json.status) throw json
  let caption = `
  ${json.deskripsi}
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hint untuk hint
Bonus: ${poin} XP
Tiketcoin: 1 Tiketcoin
    `.trim()
  conn.tebakgambar[id] = [
    await conn.sendFile(m.chat, json.img, 'tebakgambar.jpg', caption, m, false, { thumbnail: Buffer.alloc(0) }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakgambar[id]) conn.reply(m.chat, `𝐖𝐚𝐤𝐭𝐮 𝐇𝐚𝐛𝐢𝐬❗!\n𝐉𝐚𝐰𝐚𝐛𝐚𝐧 𝐲𝐠 𝐛𝐞𝐧𝐚𝐫 𝐀𝐝𝐚𝐥𝐚𝐡➡️*${json.jawaban}*`, conn.tebakgambar[id][0])
      delete conn.tebakgambar[id]
    }, timeout)
  ]
}
handler.help = ['tebakgambar']
handler.tags = ['game']
handler.command = /^tebakgambar/i
handler.limit = true
handler.group = true

module.exports = handler
