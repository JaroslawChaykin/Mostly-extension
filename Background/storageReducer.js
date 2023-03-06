import { setCurrentTab, setCurrentTabActiveTab, setSites } from '../Store/store.js';

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
    }
};