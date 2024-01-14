import App from "resource:///com/github/Aylur/ags/app.js"
import * as Utils from "resource:///com/github/Aylur/ags/utils.js"

import Bar from "./bar/bar.js"

// Temporary, just to help development
// TODO: Remove autoreload css
Utils.monitorFile(
    App.configDir,
    () => {
        App.resetCss()
        App.applyCss(`${App.configDir}/style.css`)
    },
    "directory"
)

export default {
    style: `${App.configDir}/style.css`,
    windows: [Bar(0)]
}
