import Widget from "resource:///com/github/Aylur/ags/widget.js"
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js"

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

export default Workspaces
