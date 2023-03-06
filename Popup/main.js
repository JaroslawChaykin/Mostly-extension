import { getCurrentTab } from '../Store/store.js';
import { initialTime } from './Widgets/Time/Time.js';

const initial = async () => {
    const websiteNameNode = document.querySelector('.website__name');
    const widgetsNode = document.querySelector('.widgets');
    const currentTab = await getCurrentTab();

    setCurrentTabInnerHTML(websiteNameNode, currentTab)

    initialTime(widgetsNode.querySelector('.w-time'));
};

const setCurrentTabInnerHTML = (body, data) => {
    console.log(data);
    body.innerHTML = data.name;
}

initial();