import { getCurrentTab, getStore } from '../Store/store.js';
import { initialTime } from './Widgets/Time/Time.js';
import { initialTimer } from "./Widgets/Timer/Timer.js";
import { initialGraphs } from "./Widgets/Graphs/Graphs.js";

const initial = async () => {
    const websiteNameNode = document.querySelector('.website__name');
    const categoryNode = document.querySelector('.website__category');
    const widgetsNode = document.querySelector('.widgets');

    const currentTab = await getCurrentTab();
    const store = await getStore();

    const blockSite = document.querySelector('.btn-block');
    const deleteHistory = document.querySelector('.btn-delete');
    const openHistory = document.querySelector('.btn-history');

    setCurrentTabInnerHTML(websiteNameNode, currentTab)

    initialTime(widgetsNode.querySelector('.w-time'));
    initialTimer(widgetsNode.querySelector('.w-timer'));
    initialGraphs(widgetsNode.querySelector('.w-graphs'));

    categoryNode.querySelector('#category').value = isNaN(currentTab.category) ? 0 : currentTab.category;

    categoryNode.querySelector('#category').addEventListener('change', (event) => {
        const prepareData = {
            siteName: currentTab.name,
            categoryCode: event.target.value
        }

        chrome.runtime.sendMessage({name: 'changeCategory', data: prepareData}, async () => {

        })
    })

    blockSite.onclick = async (e) => {
        if (store.blackList.includes(currentTab.name)) {
            chrome.runtime.sendMessage({name: 'unBlockSiteInStore'}, async () => {
                let message = {name: "unBlock"};
                let queryOptions = { active: true };
                let tab = await chrome.tabs.query(queryOptions);

                chrome.tabs.sendMessage(tab[0].id, message, function(response) {});
            })
        } else {
            chrome.runtime.sendMessage({name: 'blockSiteInStore'}, async () => {
                let message = {name: "block"};
                let queryOptions = { active: true };
                let tab = await chrome.tabs.query(queryOptions);

                chrome.tabs.sendMessage(tab[0].id, message, function(response) {
                });
            })
        }

        window.close()
    }

    openHistory.onclick = () => {
        window.open('chrome-extension://boaijoghmncecjggkgaljipngpoclnab/OptionsPage/options.html', '_blank');
    }
};

const setCurrentTabInnerHTML = (body, data) => {
    body.innerHTML = data.name;
}



initial();