import Applications from "resource:///com/github/Aylur/ags/service/applications.js"

function app_provider(text) {
    console.log(Applications.query(text))
}

export default app_provider
