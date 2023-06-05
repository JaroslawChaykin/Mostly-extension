import { storageReducer } from './storageReducer.js';
import { getCurrentDate } from '../utils/utils.js';
import { getStore } from "../Store/store.js";

const skipSitesList = [
    'extensions',
    'newtab',
    'boaijoghmncecjggkgaljipngpoclnab',
    ''
];

let intervalTimer;

const getActiveTab = () => {
    return new Promise((resolve) => {
        chrome.tabs.query({active: true}, function (tabs) {
            let activeTab = tabs[0];
            resolve(activeTab);
        });
    }).then(activeTab => activeTab);
};

const getSiteName = (href) => {
    return new URL(href).hostname.replace(/^www\./, '');
};

setInterval(async () => {
    const activeTab = await getActiveTab();
    const currentDate = getCurrentDate();

    if (skipSitesList.includes(getSiteName(activeTab.url))) {
        return;
    }

    storageReducer({
        action: 'SET_SITES',
        payload: {
            tab: getSiteName(activeTab.url),
            date: currentDate
        }
    });
}, 1000);

chrome.runtime.onMessage.addListener(async (req, cb) => {
    const activeTab = await getActiveTab();

    if (req.name === 'blockSiteInStore') {
        storageReducer({
            action: 'BLOCK_SITE',
            payload: {
                name: getSiteName(activeTab.url),
            }
        });
    } else if (req.name === 'unBlockSiteInStore') {
        storageReducer({
            action: 'UNBLOCK_SITE',
            payload: {
                name: getSiteName(activeTab.url),
            }
        });
    } else if (req.name === 'setTimer') {
        storageReducer({
            action: 'SET_TIMER',
            payload: req.data
        });

        startTimer()
    } else if (req.name === 'changeCategory') {
        storageReducer({
            action: 'CHANGE_CATEGORY',
            payload: req.data
        });
    } else if (req.name === 'clearHistory') {
        storageReducer({
            action: 'CLEAR_HISTORY',
            payload: req.data
        });
    }
})


const startTimer = () => {

    if (intervalTimer) {
        clearInterval(intervalTimer);
    }

    intervalTimer = setInterval(async () => {
        const activeTab = await getActiveTab();
        const { timer } = await getStore()

        if (timer.time === 0) {
            clearInterval(intervalTimer);

            chrome.tabs.sendMessage(activeTab.id, {name: 'timerEnd'}, function(response) {

            });

            if (timer.needBlock) {
                storageReducer({
                    action: 'BLOCK_SITE',
                    payload: {
                        name: getSiteName(activeTab.url),
                    }
                });
            }
            return
        }

        if (timer.siteName === getSiteName(activeTab.url)) {
            storageReducer({
                action: 'DECREASE_TIMER',
            });
        }

    }, 1000)
}