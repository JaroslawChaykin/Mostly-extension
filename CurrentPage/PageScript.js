const template = (title, description) => {
    return `
                <div style="box-sizing: border-box; background: white; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: flex-end; text-align: center; flex-direction: column; padding-bottom: 120px">
                    <h1 style="font-family: sans-serif; font-size: 42px;">${title}</h1>
                    <p style="font-family: sans-serif; font-size: 24px;">${description}</p>
                </div>
                `
}

const templateTimer = (title, description) => {
    return `
                <div class="timer-alert" style="position: absolute; top: 0; z-index: 100; background: white; right: 0; box-sizing: border-box; width: 100vw; height: 100vh; display: flex; align-items: center; justify-content: flex-end; text-align: center; flex-direction: column; padding-bottom: 120px">
                    <h1 style="font-family: sans-serif; font-size: 42px">${title}</h1>
                </div>
                `
}


const getSiteName = (href) => {
    return new URL(href).hostname.replace(/^www\./, '');
};

const getStoreSync = () => {
    return new Promise((resolve) => {
        const state = chrome.storage.local.get(['mostlyState']).then(data => {
            resolve(data['mostlyState'])
        })
    }).then(data => {
        if (data.blackList.includes(getSiteName(location.href))) {
            window.document.body.innerHTML = template('Содержимое страницы заблокировано', 'Разблокируйте содержимое в расширении');
        }
    })
}

getStoreSync()

window.onload = () => {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.name === "block") {
                window.document.body.innerHTML = template('Содержимое страницы заблокировано', 'Разблокируйте содержимое в расширении');
            } else if (request.name === "unBlock") {
                location.reload()
            } else if (request.name === 'timerEnd') {
                window.document.body.insertAdjacentHTML('afterbegin', templateTimer('Таймер завершил свою работу'))
                let timerAlert = window.document.body.querySelector('.timer-alert')
                setTimeout(() => {
                    timerAlert.remove()
                }, 1000)
            }
        }
    );
}
