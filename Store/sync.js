export const setStoreSync = (state) => {
    chrome.storage.local.set({'mostlyState': state})
}

export const getStoreSync = () => {
    return new Promise((resolve) => {
        const state = chrome.storage.local.get(['mostlyState']).then(data => {
            resolve(data['mostlyState'])
        })
    }).then(data => data)
}