import { getCurrentTab } from "../../../Store/store.js";
import { timeConverter } from "../../../utils/utils.js";

export const initialGraphs = async (body) => {
    const { history, time } = await getCurrentTab();
    const daysNode = body.querySelectorAll('.graphs-day');
    const datesOfCurrentWeek = [];

    for (let i = -6; i < 1; i++) {
        let day = moment().weekday(i)

        datesOfCurrentWeek.push(`${day.date()}:${day.month() + 1}:${day.year()}`)
    }

    daysNode.forEach((node, index) => {
        const width = ((history[datesOfCurrentWeek[index]] || 0) * 100 / time) + 15;

        if (history[datesOfCurrentWeek[index]]) {
            node.querySelector('.graphs-day__name').style.height = width + '%'
            node.querySelector('.graphs-day__time').innerText = timeConverter(history[datesOfCurrentWeek[index]])
        }
    })
};