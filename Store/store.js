import { getStoreSync, setStoreSync } from './sync.js';

let state = {
    currentTab: '',
    sites: [],
    blackList: [],
};

let proxedState = new Proxy(state, {
    get: async function (target, prop) {
        return Reflect.get(target, prop);
    },
    set: function (target, prop, value) {
        setStoreSync(target);
        return Reflect.set(target, prop, value);
    }
});

(async function () {
    if (await getStoreSync()) {
        proxedState = new Proxy(await getStoreSync(), {
            get: async function (target, prop) {
                return Reflect.get(target, prop);
            },
            set: function (target, prop, value) {
                setStoreSync(target);
                return Reflect.set(target, prop, value);
            }
        });
    }
})();

export const getCurrentTab = async () => {
    const mostlyState = await getStoreSync();

    return mostlyState.sites.filter((site) => {
        return site.name === mostlyState.currentTab;
    })[0];
};

export const setCurrentTabActiveTab = async (activeTab) => {
    const proxySites = await proxedState.sites.then(data => data);
    const mostlyState = await getStoreSync();

    proxySites.map((site) => {
        if (site.name === mostlyState.currentTab) {
            site.activeTab = activeTab
        }
    });
};

export const setCurrentTab = (newCurrentTab) => {
    proxedState.currentTab = newCurrentTab;
};

export const setSites = async ({tab, date}) => {
    const proxySites = await proxedState.sites.then(data => data);
    const proxyBlackList = await proxedState.blackList.then(data => data);

    const tabIncludes = proxySites.filter((site) => site.name === tab);

    if (proxyBlackList.includes(tab)) {
        return;
    }

    if (!Boolean(tabIncludes.length)) {
        proxySites.push({
            name: tab,
            time: 1000,
            category: 'Другое',
            history: {
                [date]: 1000
            },
            activeTab: 'сессия'
        });
        return;
    }

    proxySites.map((site) => {
        if (site.name === tab) {
            site.time = site.time + 1000;

            if (!Object.keys(site.history).includes(date)) {
                site.history[date] = 1000;
                return;
            }

            site.history[date] = site.history[date] + 1000;
        }
    });

};