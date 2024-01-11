import Widget from "resource:///com/github/Aylur/ags/widget.js"
import Battery from "resource:///com/github/Aylur/ags/service/battery.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";

function Workspaces() {
    return Widget.Box({
        children: Hyprland.bind("workspaces").transform(workspaces => {
            workspaces.sort((a, b) => a.id - b.id)

            return workspaces.map(({name, id}) => Widget.Button({
                on_clicked: () => Hyprland.sendMessage(`dispatch workspace ${id}`),
                class_name: Hyprland.active.workspace.bind("id").transform(i => `${i === id ? "active-ws" : ""}`),
                child: Widget.Label(name)
            }))
        })
    })
}

function Clock() {
    return Widget.Label().poll(10000, self => {
        const date = new Date()

        const raw_hours = date.getHours()

        const hours = raw_hours <= 12 ? raw_hours == 0 ? 12 : raw_hours : raw_hours - 12
        const minutes = date.getMinutes()
        const meridiem = raw_hours < 12 ? "AM" : "PM"

        self.label = `${hours}:${minutes} ${meridiem}`
    })
}

function BatteryInfo() {
    return Widget.Icon({
        icon: Battery.bind("icon_name")
    })
}

function Left() {
    return Widget.Box({
        children: [
            Workspaces()
        ]
    })
}

function Center() {
    return Clock()
}

function Right() {
    return Widget.Box({
        hpack: "end",

        children: [
            BatteryInfo()
        ]
    })
}

function Bar(monitor) {
    return Widget.Window({
        monitor,
        name: `bar${monitor}`,
        exclusivity: "exclusive",
        anchor: ["top", "left", "right"],

        child: Widget.CenterBox({
            start_widget: Left(),
            center_widget: Center(),
            end_widget: Right()
        })
    })
}

export default Bar
