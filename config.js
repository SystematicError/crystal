import App from "resource:///com/github/Aylur/ags/app.js"

import Bar from "./ui/bar.js"

export default {
    css: App.configDir + "/style.css",
    windows: [Bar(0)]
}
