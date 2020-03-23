import * as webix from 'webix';

export const toolbar: webix.ui.toolbarConfig = {
    view: "toolbar",
    css: "webix_dark",
    cols: [
        { view: "icon", icon: "mdi mdi-android", popup: "popupMenu" },
        {},
        { view: "template", id: "clock", borderless: true, width:80}
    ]
}

export function clockStart(): void {
    setInterval(update, 1000)
    update()
}

function update() {
    let clock = webix.$$("clock") as webix.ui.template
    let now = new Date()

    let hours = now.getHours()
    let hoursStr: string
    (hours < 10) ? (hoursStr = '0' + hours.toString()) : (hoursStr = hours.toString())

    let minutes = now.getMinutes()
    let minutesStr: string
    (minutes < 10) ? (minutesStr = '0' + minutes.toString()) : (minutesStr = minutes.toString())

    let seconds = now.getSeconds()
    let secondsStr: string
    (seconds < 10) ? (secondsStr = '0' + seconds.toString()) : (secondsStr = seconds.toString())
    clock.setHTML(`<div>${hoursStr}:${minutesStr}:${secondsStr}</div>`)
}