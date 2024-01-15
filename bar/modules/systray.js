import Widget from "resource:///com/github/Aylur/ags/widget.js"
import SystemTray from "resource:///com/github/Aylur/ags/service/systemtray.js"

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

export default SysTray
