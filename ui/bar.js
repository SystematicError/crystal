import Widget from "resource:///com/github/Aylur/ags/widget.js"
import Battery from "resource:///com/github/Aylur/ags/service/battery.js"
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js"
import SystemTray from 'resource:///com/github/Aylur/ags/service/systemtray.js'

function Workspaces() {
    return Widget.Box({
        class_name: "workspaces",
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
    return Widget.Label({class_name: "clock"}).poll(10000, self => {
        const date = new Date()

        const raw_hours = date.getHours()

        const day = date.getDate()
        const month =
            ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            [date.getMonth()]

        const hours = raw_hours <= 12 ? raw_hours == 0 ? 12 : raw_hours : raw_hours - 12
        const minutes = `${date.getMinutes()}`.padStart(2, "0")
        const meridiem = raw_hours < 12 ? "AM" : "PM"

        self.label = `${day} ${month}    ${hours}:${minutes} ${meridiem}`
    })
}

function SysTray() {
    return Widget.Box({
        class_name: "systray",
        children: SystemTray.bind("items").transform(items => items.map(item => Widget.Button({
            child: Widget.Icon().bind("icon", item, "icon"),
            tooltipMarkup: item.bind("tooltip-markup"),
            onPrimaryClick: (_, event) => item.activate(event),
            onSecondaryClick: (_, event) => item.openMenu(event),
        })))
    })
}

function BatteryInfo() {
    return Widget.Icon({
        class_name: "battery",
        size: 16,
        icon: Battery.bind("icon_name")
    })
}

function Left() {
    return Workspaces()
}

function Center() {
    return Clock()
}

function Right() {
    return Widget.Box({
        hpack: "end",

        children: [
            SysTray(),
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
            class_name: "bar",
            start_widget: Left(),
            center_widget: Center(),
            end_widget: Right()
        })
    })
}

export default Bar
