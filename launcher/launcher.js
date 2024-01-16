import App from "resource:///com/github/Aylur/ags/app.js"
import Widget from "resource:///com/github/Aylur/ags/widget.js"

import query from "./query.js"

function Launcher() {
    const WINDOW_NAME = "launcher"

    const Entry = Widget.Entry({
        class_name: "entry",
        placeholder_text: "Search for an app...",

        on_accept: ({text}) => {
            if (Results.children[0]) {
                Results.children[0].on_primary_click()
            } else {
                App.closeWindow(WINDOW_NAME)
            }
        },

        on_change: ({text}) => {
            Results.children = query(text).slice(0, 6).map(result => Widget.EventBox({
                class_name: "result",
                cursor: result.action ? "pointer" : "default",
                on_primary_click: () => {
                    if (result.action) {result.action()}
                    App.closeWindow(WINDOW_NAME)
                },

                child: Widget.Box({
                    children: [
                        Widget.Icon(result.icon || ""),

                        Widget.Label({
                            hpack: "start",
                            label: result.title
                        }),
                    ]
                })
            }))
        }
    })

    const Results = Widget.Box({
        class_name: "results",
        vertical: true,
    })

    const Window = Widget.Window({
        name: WINDOW_NAME,
        focusable: true,
        popup: true,
        visible: false,

        child: Widget.Box({
            class_name: "launcher",
            vertical: true,

            children: [
                Entry,
                Results
            ]
        })
    })

    App.connect("window-toggled", (_, name, status) => {
        if (name == WINDOW_NAME && status == false) {
            Entry.set_text("")
            Results.children = []
        }
    })

    return Window
}

export default Launcher
