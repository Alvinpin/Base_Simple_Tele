require("./settings")
const {
    Telegraf,
    Context
} = require('telegraf')
const { simple, getBuffer } = require('./lib/myfunc')
const fs = require('fs')
const os = require('os')
const speed = require('performance-now')

if (BOT_TOKEN == 'YOUR_TELEGRAM_BOT_TOKEN') {
    return console.log(lang.noToken)
}

global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? {
        [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]
    } : {})
})) : '')

const bot = new Telegraf(BOT_TOKEN)
async function startitsvin() {
    bot.on('callback_query', async (itsvin) => {
        //console.log(itsvin)
        action = itsvin.callbackQuery.data.split(' ')
        args = action
        user_id = Number(action[1])
        if (itsvin.callbackQuery.from.id != user_id) return itsvin.answerCbQuery('Uppss... this button not for you!', {
            show_alert: true
        })
        const timestampi = speed();
        const latensii = speed() - timestampi
        const user = simple.getUserName(itsvin.callbackQuery.from)
        const {
            isUrl,
            fetchJson
        } = simple
        const pushname = user.full_name;
        const username = user.username ? user.username : "AlvinStore";
        const isCreator = [itsvin.botInfo.username, ...global.OWNER].map(v => v.replace("https://t.me/", '')).includes(user.username ? user.username : "-")
        const reply = async (text) => {
            for (var x of simple.range(0, text.length, 4096)) { //maks 4096 character, jika lebih akan eror
                return await itsvin.replyWithMarkdown(text.substr(x, 4096), {
                    disable_web_page_preview: true
                })
            }
        }
        try {
            switch (action[0]) {
                case "menucmd": {
                    let hit_total;
                    try {
                        hit_total = await simple.fetchJson('https://api.countapi.xyz/hit/api-itsvinbot.herokuapp.com/visits')
                    } catch {
                        hit_total = {
                            value: "-"
                        }
                    }
                    hitall = `${hit_total.value == undefined ? '-' : hit_total.value}`
                    let dnew = new Date(new Date + 3600000)
                    let week = dnew.toLocaleDateString('en', {
                        weekday: 'long'
                    })
                    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(dnew / 84600000) % 5]
                    let date = dnew.toLocaleDateString('en', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })
                    let dateIslamic = Intl.DateTimeFormat('en' + '-TN-u-ca-islamic', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    }).format(dnew)
                    lang.menu(itsvin, THUMBNAIL, pushname, OWNER_NAME, OWNER, "/", hitall, latensii, os, simple, week, date, dateIslamic, username, isCreator, user.id.toString())
                }
                break
                case "animecmd": {
                    lang.animecmd(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "asupancmd": {
                    lang.asupancmd(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "cecancmd": {
                    lang.cecancmd(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "cogancmd": {
                    lang.cogancmd(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "downloadcmd": {
                    lang.downloadcmd(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "ephotocmd": {
                    lang.ephotocmd(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "ephotocmd2": {
                    lang.ephotocmd2(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "logocmd": {
                    lang.logocmd(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "logocmd2": {
                    lang.logocmd2(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "islamcmd": {
                    lang.islamcmd(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "nsfwcmd": {
                    lang.nsfwcmd(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "photooxycmd": {
                    lang.photooxycmd(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "textprocmd": {
                    lang.textprocmd(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "textprocmd2": {
                    lang.textprocmd2(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "textprocmd3": {
                    lang.textprocmd3(itsvin, THUMBNAIL, user_id.toString())
                }
                break
                case "owner": {
                    await itsvin.sendContact(OWNER_NUMBER, OWNER_NAME)
                    reply(`My owner [${OWNER_NAME}](${OWNER[0]})`)
                }
                break
                case "ytmp3": {
                    if (!args[2]) return reply(`Kirim perintah:\n/ytmp3 link youtube\n\nContoh penggunaan:\n/ytmp3 https://youtu.be/kwop2Eg5QY4`)
                    if (!isUrl(args[2])) return reply(`Kirim perintah:\n/ytmp3 link youtube\n\nContoh penggunaan:\n/ytmp3 https://youtu.be/kwop2Eg5QY4`)
                    if (!args[2].includes('youtu.be') && !args[2].includes('youtube.com')) return reply(`Kirim perintah:\n/ytmp3 link youtube\n\nContoh penggunaan:\n/ytmp3 https://youtu.be/kwop2Eg5QY4`)
                    reply(lang.wait)
                    await itsvin.deleteMessage()
                    let res = await fetch(global.api('alfa', '/api/downloader/youtube-audio', {
                        url: args[2]
                    }, 'apikey'))
                    if (!res.ok) throw await res.text()
                    var result = await res.json()
                    var {
                        id,
                        thumbnail,
                        title,
                        quality,
                        filesize,
                        size,
                        download
                    } = result.result
                    if (size > 500000) { //batas download 50mb, tamabahin jika kurang (misal 100mb = 100000)
                        let key = "「 YOUTUBE AUDIO 」\n\n"
                        key += `• Id: ${id}\n`
                        key += `• Title: ${title}\n`
                        key += `• Quality: ${quality}\n`
                        key += `• Size: ${filesize}\n`
                        key += `• Download: ${download}\n\n`
                        key += `Ukuran media melebihi batas, silahkan download sendiri melalui link di atas.`
                        await itsvin.replyWithPhoto({
                            url: thumbnail
                        }, {
                            caption: key
                        })
                    } else {
                        let key = "「 YOUTUBE AUDIO 」\n\n"
                        key += `• Id: ${id}\n`
                        key += `• Title: ${title}\n`
                        key += `• Quality: ${quality}\n`
                        key += `• Size: ${filesize}\n`
                        key += `• Download: ${download}\n\n`
                        key += `Silahkan download melalui link di atas jika media tidak di kirim`
                        await itsvin.replyWithPhoto({
                            url: thumbnail
                        }, {
                            caption: key
                        })
                        await itsvin.replyWithAudio({
                            url: download,
                            filename: title
                        })
                    }
                }
                break
                case "ytmp4": {
                    if (!args[2]) return reply(`Kirim perintah:\n/ytmp4 link youtube\n\nContoh penggunaan:\n/ytmp4 https://youtu.be/kwop2Eg5QY4`)
                    if (!isUrl(args[2])) return reply(`Kirim perintah:\n/ytmp4 link youtube\n\nContoh penggunaan:\n/ytmp4 https://youtu.be/kwop2Eg5QY4`)
                    if (!args[2].includes('youtu.be') && !args[2].includes('youtube.com')) return reply(`Kirim perintah:\n/ytmp4 link youtube\n\nContoh penggunaan:\n/ytmp4 https://youtu.be/kwop2Eg5QY4`)
                    reply(lang.wait)
                    await itsvin.deleteMessage()
                    let res = await fetch(global.api('alfa', '/api/downloader/youtube-video', {
                        url: args[2]
                    }, 'apikey'))
                    if (!res.ok) throw await res.text()
                    var result = await res.json()
                    var {
                        id,
                        thumbnail,
                        title,
                        quality,
                        filesize,
                        size,
                        download
                    } = result.result
                    var getdl = await fetchJson(`https://tinyurl.com/api-create.php?url=${download}`)
                    if (size > 500000) { //batas download 50mb, tamabahin jika kurang (misal 100mb = 100000)
                        let key = "「 YOUTUBE VIDEO 」\n\n"
                        key += `• Id: ${id}\n`
                        key += `• Title: ${title}\n`
                        key += `• Quality: ${quality}\n`
                        key += `• Size: ${filesize}\n`
                        key += `• Download: ${getdl.data}\n\n`
                        key += `Ukuran media melebihi batas, silahkan download sendiri melalui link di atas.`
                        await itsvin.replyWithPhoto({
                            url: thumbnail
                        }, {
                            caption: key
                        })
                    } else {
                        let key = "「 YOUTUBE VIDEO 」\n\n"
                        key += `• Id: ${id}\n`
                        key += `• Title: ${title}\n`
                        key += `• Quality: ${quality}\n`
                        key += `• Size: ${filesize}\n`
                        key += `• Download: ${getdl.data}\n\n`
                        key += `Silahkan download melalui link di atas jika media tidak di kirim`
                        await itsvin.replyWithPhoto({
                            url: thumbnail
                        }, {
                            caption: key,
                            parse_mode: 'Markdown'
                        })
                        itsvin.replyWithVideo({
                            url: download
                        }, {
                            caption: lang.ok
                        })
                    }
                }
                break
            }
        } catch (e) {
            console.log(e)
        }
    })
    bot.command('help', async (itsvin) => {
        user = simple.getUserName(itsvin.message.from)
        await itsvin.reply(lang.first_chat(BOT_NAME, user.full_name), {
            parse_mode: "MARKDOWN",
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Group',
                        url: "https://t.me/ItsvinStore"
                    }, {                     
                        text: 'My Owner',
                        url: OWNER[0]
                    }]
                ]
            }
        })
    })

    bot.command('start', async (itsvin) => {
        let user = simple.getUserName(itsvin.message.from)
        await itsvin.reply(lang.first_chat(BOT_NAME, user.full_name), {
            parse_mode: "MARKDOWN",
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Group',
                        url: "https://t.me/ItsvinStore"
                    }, {
                        text: 'My Owner',
                        url: OWNER[0]
                    }]
                ]
            }
        })
    })
    bot.on('message', async (itsvin) => {
        require("./index")(itsvin, bot)
    })

    bot.launch({
        dropPendingUpdates: true
    })

    bot.telegram.getMe().then((getme) => {
        console.table({
            "Bot Name": getme.first_name,
            "Username": "@" + getme.username,
            "ID": getme.id,
            "Link": `https://t.me/${getme.username}`,
            "Author": "https://t.me/unknopin"
        })
    })
}
startitsvin()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))