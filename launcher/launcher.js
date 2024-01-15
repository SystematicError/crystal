import App from "resource:///com/github/Aylur/ags/app.js"
import Widget from "resource:///com/github/Aylur/ags/widget.js"

import query from "./query.js"

function Launcher(monitor) {
    const Entry = Widget.Entry({
        placeholder_text: "Search for an app...",

        on_accept: ({text}) => {
            App.closeWindow(`launcher${monitor}`)
        },

        on_change: ({text}) => {
            Results.children = query(text).map(result => Widget.Label(result.title))
        }
    })

    const Results = Widget.Box({
        vertical: true,
    })

    return Widget.Window({
        monitor,
        name: `launcher${monitor}`,
        // anchor: ["top", "left"],
        focusable: true,
        popup: true,

        child: Widget.Box({
            vertical: true,

            children: [
                Entry,
                Results
            ]
        })
    })
}

export default Launcher
