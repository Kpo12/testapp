import * as webix  from 'webix';

export const toolbar:webix.ui.toolbarConfig = {
    view: "toolbar",
    css: "webix_dark",
    cols: [
        { view: "icon", icon: "mdi mdi-android", popup: "popupMenu" },
    ]
}

