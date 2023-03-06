import { storageReducer } from './storageReducer.js';
import { getCurrentDate } from '../utils/utils.js';

const skipSitesList = [
    'extensions',
    'newtab',
    'bgchfnhipcjdnheapocmppbbopafcfae',
    ''
];

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



