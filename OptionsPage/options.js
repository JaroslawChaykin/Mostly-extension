import { getStoreSync } from '../Store/sync.js';
import {calculateDateFromAllTime, reduceAllSitesTime, timeConverter} from '../utils/utils.js';

const template = (data) => {

    let historyDays = []

    Object.keys(data.history).forEach((item, index) => {
        historyDays.push(
            `<div class="history_day ${index === Object.keys(data.history).length - 1 ? 'last-big' : ''}">
                <div class="history_day__time">${timeConverter(data.history[item])}</div>
                <div class="history_day__date">${item}</div>
                <div>${index === Object.keys(data.history).length - 1 ? 'СЕГОДНЯ' : ''}</div>
            </div>`
        )

    })

    return `
        <div class="history__website-btn">
            <div class="history__website">
                <div class="website__color category-${data.category}"></div>
                <div class="website__text">
                    <span>${data.name}</span>
                    <span>${timeConverter(data.time)}</span>
                </div>
                <div class="website__progress" style="width: ${data.width}%"></div>
            </div>
            <div class="history_days">
                ${historyDays.join(',').replace(/,/g, '')}
            </div>
        </div>
  `;
};

const template1 = () => {
    return `
        Вы уделяете много времени <span class="yellow">Развлечению</span> <br>  стоит поработать :)
    `
}

const template2 = () => {
    return `
        Вы уделяете много времени <span class="purple">Обучению</span> <br>  продалжайте в том же духе :)
    `
}
const template3 = () => {
    return `
        Вы уделяете много времени <span class="red">Соц-сетям</span> <br>  вы видимо очень общительны :)
    `
}

const template4 = () => {
    return `
        Вы уделяете много времени <span class="green">Работе</span> <br>  миллион всё ближе :)
    `
}


const initOptionsPage = async () => {
    const timeDaysNode = document.querySelector('.time__date');
    const timeHoursNode = document.querySelector('.time__time');
    const historyNode = document.querySelector('.history');
    const categoriesNode = document.querySelectorAll('.category-graph__category');
    const bestCategoryNode = document.querySelector('.best-category__text');

    const data = await getStoreSync();
    const allTime = reduceAllSitesTime(data.sites);
    const categories = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
    };
    let mostvalue = 1;
    let mostPopularity = 1;
    let allValuesCategories = 0;

    const {
        days,
        months,
        month,
        minutes,
        hours,
        seconds
    } = calculateDateFromAllTime(allTime);

    data.sites.forEach(item => {
        if (!isNaN(item.category)) {
            categories[item.category] += 1
        }
    })

    allValuesCategories = Object.values(categories).reduce((acc, item) => acc + item, 0)

    for (let key in categories) {
        let value = categories[key]

        if (mostvalue < value) {
            mostPopularity = key;
            mostvalue = value
        }
    }

    if (mostPopularity === '1') {
        bestCategoryNode.innerHTML = template1();
    } else if (mostPopularity === '2') {
        bestCategoryNode.innerHTML = template2();
    } else if (mostPopularity === '3') {
        bestCategoryNode.innerHTML = template3();
    } else if (mostPopularity === '4') {
        bestCategoryNode.innerHTML = template4();
    }

    categoriesNode.forEach((item, index) => {
        item.querySelector('.category-graph__graph').style.height = (categories[index + 1] * 100 / allValuesCategories) + '%'
    })

    data.sites.sort((a, b) =>  a.time - b.time).forEach(site => {
        const prepareData = {
            name: site.name,
            category: site.category,
            width:  (site.time * 100 / allTime) + 5,
            time: site.time,
            history: site.history
        }
        historyNode.insertAdjacentHTML('afterbegin',template(prepareData));
    })

    timeHoursNode.innerHTML = `${hours}:${minutes}:${seconds}`;
    timeDaysNode.innerHTML = days + ' дней';

    const site = document.querySelectorAll('.history__website-btn');

    site.forEach(item => {
        item.addEventListener('click', (evt) => {
            item.querySelector('.history_days').classList.toggle('d-block')
        })
    })
};

initOptionsPage();