import App from "resource:///com/github/Aylur/ags/app.js"
import Widget from "resource:///com/github/Aylur/ags/widget.js"

import app_provider from "./providers/app.js"

function Entry(monitor) {
    return Widget.Entry({
        placeholder_text: "Search for an app...",

        on_accept: ({text}) => {
            app_provider(text)
            App.closeWindow(`launcher${monitor}`)
        }
    })
}

function Results() {
    return Widget.Box({
        vertical: true,

        children: [
            Widget.Label("result 1"),
            Widget.Label("result 2"),
            Widget.Label("result 3")
        ]
    })
}

function Launcher(monitor) {
    return Widget.Window({
        monitor,
        name: `launcher${monitor}`,
        // anchor: ["top", "left"],
        focusable: true,
        popup: true,

        child: Widget.Box({
            vertical: true,

            children: [
                Entry(monitor),
                Results()
            ]
        })
    })
}

export default Launcher
