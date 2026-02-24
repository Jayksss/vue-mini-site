export function loadJSON(key, defaultValue) {
    try {
        const raw = localStorage.getItem(key)
        return raw ? JSON.parse(raw) : defaultValue
    } catch {
        return defaultValue
    }
}

export function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function remove(key) {
    localStorage.removeItem(key)
}