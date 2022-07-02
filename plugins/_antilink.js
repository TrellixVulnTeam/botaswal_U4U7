let handler = m => m

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
handler.before = async function (m, { user, isBotAdmin, isAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true
  let chat = global.db.data.chats[m.chat]
  let isGroupLink = linkRegex.exec(m.text)

  if (chat.antiLink && isGroupLink) {
    await m.reply(`*「 ANTI LINK 」*\n\nDetected *${await conn.getName(m.sender)}* you have sent the group link!\n\nSorry you will be kicked from this group byee!`)
    if (isAdmin) return m.reply('*Astaghfirullah,maaf ya min😢 kirain kamu member hehe..*')
    if (!isBotAdmin) return m.reply('*Fitur ini dpt digunakan setelah Bot menjadi Admin 🤗*')
    let linkGC = ('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat))
    let isLinkconnGc = new RegExp(linkGC, 'i')
    let isgclink = isLinkconnGc.test(m.text)
    if (isgclink) return m.reply('*「 ANTI LINK 」*\n\nItu Dilarang kak😣❗, Maaf ya🙂,sesuai peraturan mngenai larangan share link gc lain😊.\nBismillah Kick...')
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
  }
  return true
}

module.exports = handler


