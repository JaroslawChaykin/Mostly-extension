import { getCurrentDate, timeConverter } from '../../../utils/utils.js';
import { storageReducer } from '../../../Background/storageReducer.js';
import { getCurrentTab } from '../../../Store/store.js';

const startInterval = (body) => {

    let lastActiveTab = body.querySelector('.session');
    const timeNode = body.querySelector('.time');
    const dateNow = getCurrentDate();

    const tabs = body.querySelector('.tabs');

    timeNode.innerHTML = `<div class="loading"></div>`

    setInterval(async () => {
        const data = await getCurrentTab();

        const timeInThiDay = data.history[dateNow];
        const activeTab = data.activeTab || 'сессия';

        if (activeTab === 'сессия') {
            console.log(2);
            timeNode.innerHTML = timeConverter(timeInThiDay);
        } else {
            console.log(1);
            timeNode.innerHTML = data.time;
        }
    }, 1000);

    const onTabsClickHandler = (e) => {
        if (lastActiveTab) {
            lastActiveTab.classList.remove('btn-tab__active');
        }

        storageReducer({action: 'SET_ACTIVE_TAB', payload: e.target.innerText});

        lastActiveTab = e.target;
        e.target.classList.add('btn-tab__active');
    };

    if (typeof tabs.onclick === 'function') {
        tabs.removeEventListener('click', onTabsClickHandler);
    } else {
        tabs.addEventListener('click', onTabsClickHandler);
    }
};

export const initialTime = (body, data) => {

    startInterval(body);
};