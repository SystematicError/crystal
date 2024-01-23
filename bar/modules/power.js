import Widget from "resource:///com/github/Aylur/ags/widget.js"
import Battery from "resource:///com/github/Aylur/ags/service/battery.js"

function Power() {
    return Widget.Box({
        children: [
            Widget.Icon({
                class_name: "battery",
                size: 16,
                icon: Battery.bind("icon_name")
            }),

            Widget.Label({
                label: Battery.bind("percent").transform(p => `${p}%`)
            })
        ]
    })
}

export default Power
