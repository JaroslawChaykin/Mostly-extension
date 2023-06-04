import { getCurrentTab, getStore } from '../../../Store/store.js';
import { calculateDateFromAllTime } from "../../../utils/utils.js";

let interval;

export const initialTimer = async (body) => {
    const hourNode = body.querySelector('.counter-timer__hours');
    const minuteNode = body.querySelector('.counter-timer__minutes');
    const secondNode = body.querySelector('.counter-timer__seconds');
    const checkBoxNode = body.querySelector('.counter-timer__checkbox');
    const startTimerBtn = body.querySelector('.header-timer__button');

    const dataActiveTab = await getCurrentTab();
    const data = await getStore();

    if (data.timer.time > 0 && dataActiveTab.name === data.timer.siteName) {
        interval = setInterval(async () => {
            const { timer } = await getStore();
            const { hours, minutes, seconds } = calculateDateFromAllTime(timer.time);

            if (timer.time > 0) {
                hourNode.value = hours;
                minuteNode.value = minutes;
                secondNode.value = seconds;

                disabledControls();
            } else {
                hourNode.value = '';
                minuteNode.value = '';
                secondNode.value = '';

                clearInterval(interval);
                enableControls();
            }
        }, 1000)
    } else {
        clearInterval(interval);
    }

    const disabledControls = () => {
        hourNode.disabled = true;
        minuteNode.disabled = true;
        secondNode.disabled = true;
        startTimerBtn.disabled = true;
        checkBoxNode.disabled = true;
    }
    const enableControls = () => {
        hourNode.disabled = false;
        minuteNode.disabled = false;
        secondNode.disabled = false;
        startTimerBtn.disabled = false;
        checkBoxNode.disabled = false;
    }

    startTimerBtn.addEventListener('click', () => {
        const selectedTime = Number(
            (hourNode.value * 60 * 60 * 1000) +
            (minuteNode.value * 60 * 1000) +
            (secondNode.value * 1000)
        );
        const needBlockSiteAfterTimer = checkBoxNode.checked;

        const prepareData = {
            siteName: dataActiveTab.name,
            time: selectedTime,
            needBlock: needBlockSiteAfterTimer,
        }

        chrome.runtime.sendMessage({name: 'setTimer', data: prepareData}, async () => {

        })

        interval = setInterval(async () => {
            const { timer } = await getStore();
            const { hours, minutes, seconds } = calculateDateFromAllTime(timer.time);

            if (timer.time > 0) {
                hourNode.value = hours;
                minuteNode.value = minutes;
                secondNode.value = seconds;

                disabledControls();
            } else {
                hourNode.value = '';
                minuteNode.value = '';
                secondNode.value = '';

                clearInterval(interval);
                enableControls();
            }
        }, 1000)
    })
};
