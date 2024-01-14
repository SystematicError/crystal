import Widget from "resource:///com/github/Aylur/ags/widget.js"

import Clock from "./modules/clock.js"
import Power from "./modules/power.js"
import SysTray from "./modules/systray.js"
import Workspaces from "./modules/workspaces.js"

const left = [
    Workspaces()
]

const center = [
    Clock()
]

const right = [
    SysTray(),
    Power()
]

function Bar(monitor) {
    return Widget.Window({
        monitor,
        name: `bar${monitor}`,
        exclusivity: "exclusive",
        anchor: ["top", "left", "right"],

        child: Widget.CenterBox({
            class_name: "bar",
            start_widget: Widget.Box({hpack: "start", children: left}),
            center_widget: Widget.Box({hpack: "center", children: center}),
            end_widget: Widget.Box({hpack: "end", children: right})
        })
    })
}

export default Bar
