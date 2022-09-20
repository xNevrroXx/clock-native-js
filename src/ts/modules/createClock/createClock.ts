import {createClockListElement, createSpans, resetClockElement} from "../tech functions/createElements";
import setTimeAtPage from "../set time at page/setTimeAtPage";
import {TMainClockIdInterval} from "../../types";

function createClock(refMainClockIdInterval: TMainClockIdInterval, clockSelector: string = "#clock", additionalSelector: string = "li.active-tasks__list-wrapper.clocks > ol.active-tasks__list-tasks", timezoneOffset = new Date().getTimezoneOffset()) {
    const clockElement: HTMLElement = document.querySelector(clockSelector);
    const listElem = createClockListElement(additionalSelector);
    let intervalId: number = null;
    let timeMs = new Date().getTime() + (1000 * 60 * 60 * (-timezoneOffset / 60));
    refMainClockIdInterval.timeMs = timeMs;
    resetClockElement(clockSelector);
    resetClockElement(listElem)

    setTimeAtPage(clockElement, timeMs, false);
    setTimeAtPage(listElem, timeMs, false);

    listElem.addEventListener("click", () => {
        if(refMainClockIdInterval.intervalID !== intervalId) {
            refMainClockIdInterval.intervalID = intervalId;

            resetClockElement(clockSelector);
            setTimeAtPage(clockElement, timeMs, false);
        }
    })

    intervalId = window.setInterval(() => {
        timeMs = new Date().getTime() + (1000 * 60 * 60 * (-timezoneOffset / 60));

        if(refMainClockIdInterval.intervalID === intervalId) {
            setTimeAtPage(clockElement, timeMs, false, intervalId);
            refMainClockIdInterval.timeMs = timeMs;
        }
        if(listElem) {
            setTimeAtPage(listElem, timeMs, false, intervalId);
        }
    }, Math.floor(timeMs / 1000 % 60));

    refMainClockIdInterval.intervalID = intervalId;
}

export default createClock;