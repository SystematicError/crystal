import Applications from "resource:///com/github/Aylur/ags/service/applications.js"

export default (text) => {
    return Applications.query(text).map(result => {
        return {
            title: result.name,
            icon: result.icon_name,
            action: () => result.launch()
        }
    })
}

