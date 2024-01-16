import app_provider from "./providers/app.js"
import run_provider from "./providers/run.js"

const fallback_provider = app_provider
const special_providers = {
    "$": run_provider
}

function query(text) {
    text = text.trim().toLowerCase()
    
    if (special_providers[text[0]]) {
        return special_providers[text[0]](text.slice(1))
    } else {
        return fallback_provider(text)
    }
}

export default query
