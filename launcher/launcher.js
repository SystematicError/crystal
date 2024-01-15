import App from "resource:///com/github/Aylur/ags/app.js"
import Widget from "resource:///com/github/Aylur/ags/widget.js"

import query from "./query.js"

function Launcher(monitor) {
    function close() {
        App.closeWindow(`launcher${monitor}`)
    }

    const Entry = Widget.Entry({
        class_name: "entry",
        placeholder_text: "Search for an app...",

        on_accept: ({text}) => {
            if (Results.children[0]) {
                Results.children[0].on_primary_click()
            } else {
                close()
            }
        },

        on_change: ({text}) => {
            Results.children = query(text).slice(0, 5).map(result => Widget.EventBox({
                class_name: "result",
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
        class_name: "results",
        vertical: true,
    })

    return Widget.Window({
        monitor,
        name: `launcher${monitor}`,
        focusable: true,
        popup: true,

        child: Widget.Box({
            class_name: "launcher",
            vertical: true,

            children: [
                Entry,
                Results
            ]
        })
    })
}

export default Launcher
