import {execAsync} from "resource:///com/github/Aylur/ags/utils.js"

export default (text) => [{
    title: "Run command",
    action: () => execAsync(text)
}]

