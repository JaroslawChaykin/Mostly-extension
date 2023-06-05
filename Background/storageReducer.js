import {
    setCurrentTab,
    setCurrentTabActiveTab,
    setSites,
    blockSite,
    unBlockSite,
    setTimer,
    decreaseTimer,
    changeCategory, clearHistory
} from '../Store/store.js';

export const storageReducer = ({action, payload}) => {
    if (action === 'SET_SITES') {
        setCurrentTab(payload.tab);
    }

    switch (action) {
        case 'SET_SITES':
            setSites(payload);
            break
        case 'SET_ACTIVE_TAB':
            setCurrentTabActiveTab(payload)
            break
        case 'BLOCK_SITE':
            blockSite(payload)
            break
        case 'UNBLOCK_SITE':
            unBlockSite(payload)
            break
        case 'SET_TIMER':
            setTimer(payload)
            break
        case 'DECREASE_TIMER':
            decreaseTimer()
            break
        case 'CHANGE_CATEGORY':
            changeCategory(payload)
            break
        case 'CLEAR_HISTORY':
            clearHistory(payload)
            break
    }
};