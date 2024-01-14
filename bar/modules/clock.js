import Widget from "resource:///com/github/Aylur/ags/widget.js"

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

export default Clock
