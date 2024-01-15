import App from "resource:///com/github/Aylur/ags/app.js"
import Widget from "resource:///com/github/Aylur/ags/widget.js"

import query from "./query.js"

function Launcher(monitor) {
    function close() {
        App.closeWindow(`launcher${monitor}`)
    }

    const Entry = Widget.Entry({
        placeholder_text: "Search for an app...",

        on_accept: ({text}) => {
            if (Results.children[0]) {
                Results.children[0].on_primary_click()
            } else {
                close()
            }
        },

        on_change: ({text}) => {
            Results.children = query(text).map(result => Widget.EventBox({
                cursor: result.action ? "pointer" : "default",
                on_primary_click: () => {
                    if (result.action) {result.action()}
                    close()
                },

                child: Widget.Box({
                    children: [
                        Widget.Icon(result.icon || ""),

                        Widget.Box({
                            vertical: true,

                            children: [
                                Widget.Label({
                                    hpack: "start",
                                    label: result.title
                                }),

                                Widget.Label({
                                    hpack: "start",
                                    label: result.description || ""
                                }),
                            ]
                        })
                    ]
                })
            }))
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
                
                Widget.Scrollable({
                    hscroll: "never",
                    vscroll: "automatic",

                    child: Results
                })
            ]
        })
    })
}

export default Launcher
