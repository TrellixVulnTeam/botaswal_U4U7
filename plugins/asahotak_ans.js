const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*ao/i.test(m.quoted.text)) return !0
    this.asahotak = this.asahotak ? this.asahotak : {}
    if (!(id in this.asahotak)) return m.reply('Pertanyaan itu telah dijawab kak,Tetap semangat belajarnya❗,mudah"an kk bisa Sukses dikemudian hari,membanggakan ortu🥰' )
    if (m.quoted.id == this.asahotak[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.asahotak[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.asahotak[id][2]
            global.db.data.users[m.sender].tiketcoin += 1
            m.reply(`𝐉𝐀𝐖𝐀𝐁𝐀𝐍 𝐊𝐀𝐌𝐔 𝐁𝐄𝐍𝐀𝐑👏\n+${this.asahotak[id][2]} XP\n+1 TiketCoin`)
            clearTimeout(this.asahotak[id][3])
            delete this.asahotak[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`𝐀𝐘𝐎 𝐃𝐈𝐊𝐈𝐓 𝐋𝐀𝐆𝐈🙈`)
        else m.reply(`𝐒𝐀𝐋𝐀𝐇 𝐊𝐀𝐊😣`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
