import { getStoreSync } from '../Store/sync.js';
import { calculateDateFromAllTime, reduceAllSitesTime } from '../utils/utils.js';

const categories = {
    'Другое': 'other',
    'Развлечения': 'entertainments',
    'Обучение': 'training',
    'Соц-сети': 'social',
    'Рабочие': 'workers'
}

const template = (data) => {
    return `
        <div class="history__website">
            <div class="website__color category-${categories[data.category]}"></div>
            <div class="website__text">${data.name}</div>
            <div class="website__progress" style="width: ${data.width}%"></div>
        </div>
  `;
};

const initOptionsPage = async () => {
    const timeDaysNode = document.querySelector('.time__date')
    const timeHoursNode = document.querySelector('.time__time')
    const historyNode = document.querySelector('.history')

    const data = await getStoreSync();
    const allTime = reduceAllSitesTime(data.sites);

    const {
        days,
        months,
        month,
        minutes,
        hours,
        seconds
    } = calculateDateFromAllTime(allTime);

    data.sites.sort((a, b) =>  a.time - b.time).forEach(site => {
        const prepareData = {
            name: site.name,
            category: site.category,
            width:  (site.time * 100 / allTime) + 5,
        }
        historyNode.insertAdjacentHTML('afterbegin',template(prepareData));
    })

    timeHoursNode.innerHTML = `${hours}:${minutes}:${seconds}`
    timeDaysNode.innerHTML = days + ' дней'
};

initOptionsPage();