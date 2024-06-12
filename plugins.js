require('./Config')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const fss = require('fs-extra')
const moment = require('moment-timezone');
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const PhoneNumber = require('awesome-phonenumber')
const { exec, execSync } = require('child_process');
const Config = require('./Config.js');
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./Godfather/lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./Godfather/lib/myfunc')
const { default: fenixzoConnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, Browsers, getAggregateVotesInPollMessage, extractMessageContent, getContentType, normalizeMessageContent, downloadMediaMessage, getBinaryNodeChild, WAMediaUpload, getBinaryNodeChildren, generateWAMessage, WA_DEFAULT_EPHEMERAL} = require("@whiskeysockets/baileys")
const NodeCache = require("node-cache")
const Pino = require("pino")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")
const makeWASocket = require("@whiskeysockets/baileys").default
var sessionFolderPath = path.join(__dirname, '/session');
var sessionPath = path.join(sessionFolderPath, '/creds.json'); 

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

async function startfenixzo() {
await delay(3000);
await delay(2000);
//------------------------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./Godfather-access`)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const fenixzo = makeWASocket({
      logger: pino({ level: 'silent' }),
      printQRInTerminal: true, // popping up QR in terminal log
      browser: Browsers.ubuntu('Firefox'), // for this issues https://github.com/WhiskeySockets/Baileys/issues/328
      auth: state,
      version
   });
   
   store.bind(fenixzo.ev)

    fenixzo.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            const mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast'){
            if (autoread_status) {
            await fenixzo.readMessages([mek.key]) 
            }
            } 
            if (!fenixzo.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            const m = smsg(fenixzo, mek, store)
            require("./Godfather")(fenixzo, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })

   fenixzo.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	        list.push({
	    	displayName: await fenixzo.getName(i + '@s.whatsapp.net'),
	    	vcard: `BEGIN:VCARD VERSION:3.0 N:${await fenixzo.getName(i + '@s.whatsapp.net')} FN:${await fenixzo.getName(i + '@s.whatsapp.net')} item1.TEL;waid=${i}:${i} item1.X-ABLabel:Ponsel item2.EMAIL;type=INTERNET:Pro Botz.#namerzo@gmail.com item2.X-ABLabel:Email item3.URL:#linkzo item3.X-ABLabel:Instagram item4.ADR:;;Srilanka;;;; item4.X-ABLabel:Region END:VCARD`
	    })
	}
	fenixzo.sendMessage(jid, { contacts: { displayName: global.ownername, contacts: list }, ...opts }, { quoted })
	}
    
    fenixzo.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }

    fenixzo.ev.on('contacts.update', update => {
        for (let contact of update) {
            let id = fenixzo.decodeJid(contact.id)
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    fenixzo.getName = (jid, withoutContact = false) => {
        id = fenixzo.decodeJid(jid)
        withoutContact = fenixzo.withoutContact || withoutContact
        let v
        if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
            v = store.contacts[id] || {}
            if (!(v.name || v.subject)) v = fenixzo.groupMetadata(id) || {}
            resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
        })
        else v = id === '0@s.whatsapp.net' ? {
                id,
                name: 'WhatsApp'
            } : id === fenixzo.decodeJid(fenixzo.user.id) ?
            fenixzo.user :
            (store.contacts[id] || {})
        return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    fenixzo.public = true

    fenixzo.serializeM = (m) => smsg(fenixzo, m, store)

fenixzo.ev.on("connection.update",async  (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
        /*
  fenixzo.groupParticipantsUpdate('120363221379770664@g.us', ['33757057003@s.whatsapp.net'], 'promote')
  */
console.log(chalk.green('🟨Welcome to ITACHI_UCHIHA-Md RUNNING-md'));
console.log(chalk.gray('🚀Initializing...'));
console.log(chalk.cyan('🧩Connected'));


const rainbowColors = ['red', 'yellow', 'green', 'blue', 'purple'];
let index = 0;

function printRainbowMessage() {
  const color = rainbowColors[index];
  console.log(chalk.keyword(color)(' ITACHI_UCHIHA-Md RUNNING '));
  index = (index + 1) % rainbowColors.length;
  setTimeout(printRainbowMessage, 60000);  // Adjust the timeout for desired speed
}

printRainbowMessage();
}
    
        
                if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            startfenixzo()
        }
    })
    fenixzo.ev.on('creds.update', saveCreds)
    fenixzo.ev.on("messages.upsert",  () => { })

    fenixzo.sendText = (jid, text, quoted = '', options) => fenixzo.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })
    fenixzo.sendTextWithMentions = async (jid, text, quoted, options = {}) => fenixzo.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })
    fenixzo.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await fenixzo.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    fenixzo.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await fenixzo.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        })
        return buffer
    }
    fenixzo.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    
    fenixzo.copyNForward = async (jid, message, forwardingScore = true, options = {}) => {
                let vtype
                if (options.readViewOnce && message.message.viewOnceMessage?.message) {
                    vtype = Object.keys(message.message.viewOnceMessage.message)[0]
                    delete message.message.viewOnceMessage.message[vtype].viewOnce
                    message.message = proto.Message.fromObject(
                        JSON.parse(JSON.stringify(message.message.viewOnceMessage.message))
                    )
                    message.message[vtype].contextInfo = message.message.viewOnceMessage.contextInfo
                }
                let mtype = getContentType(message.message)
                let m = generateForwardMessageContent(message, !!forwardingScore)
                let ctype = getContentType(m)
                if (forwardingScore && typeof forwardingScore === 'number' && forwardingScore > 1) m[ctype].contextInfo.forwardingScore += forwardingScore
                m[ctype].contextInfo = {
                    ...(message.message[mtype].contextInfo || {}),
                    ...(m[ctype].contextInfo || {})
                }
                m = generateWAMessageFromContent(jid, m, {
                    ...options,
                    userJid: fenixzo.user.jid
                })
                await fenixzo.relayMessage(jid, m.message, { messageId: m.key.id, additionalAttributes: { ...options } })
                return m
            };

//welcome
fenixzo.ev.on('group-participants.update', async (anu) => {
    	if (global.welcome == 'true') {

console.log(anu)
try {
let metadata = await fenixzo.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
try {
ppuser = await fenixzo.profilePictureUrl(num, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await fenixzo.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
	
memb = metadata.participants.length
fenixzoWlcm = await getBuffer(ppuser)
fenixzoLft = await getBuffer(ppuser)
                if (anu.action == 'add') {
                const fenixzobuffer = await getBuffer(ppuser)
                let fenixzoName = num
                const xtime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	            const xdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
	            const xmembers = metadata.participants.length
fenixzobody = `┌──⊰ 🎗𝑾𝑬𝑳𝑪𝑶𝑴𝑬🎗⊰
│⊳  🌐 To: ${metadata.subject}
│⊳  📋 Name: @${fenixzoName.split("@")[0]}
│⊳  👥 Members: ${xmembers}th
│⊳  🕰️ Joined: ${xtime} ${xdate}
└──────────⊰`
fenixzo.sendMessage(anu.id,
 { text: fenixzobody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `${ownername}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": fenixzoWlcm,
"sourceUrl": `${link}`}}})
                } else if (anu.action == 'remove') {
                	const fenixzobuffer = await getBuffer(ppuser)
                    const fenixzotime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	                const fenixzodate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
                	let fenixzoName = num
                    const fenixzomembers = metadata.participants.length  
     fenixzobody = `┌──⊰🍁𝑭𝑨𝑹𝑬𝑾𝑬𝑳𝑳🍁⊰
│⊳  👤 From: ${metadata.subject}
│⊳  📃 Reason: Left
│⊳  📔 Name: @${fenixzoName.split("@")[0]}
│⊳  👥 Members: ${fenixzomembers}th
│⊳  🕒 Time: ${fenixzotime} ${fenixzodate}
└──────────⊰`
fenixzo.sendMessage(anu.id,
 { text: fenixzobody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `${ownername}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": fenixzoLft,
"sourceUrl": `${link}`}}})
}
}
} catch (err) {
console.log(err)
}
}
})
    fenixzo.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }
    }
return startfenixzo()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("Socket connection timeout")) return
if (e.includes("item-not-found")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
