import { createClockListElement, resetClockElement } from "../tech functions/createElements";
import setTimeAtPage from "../set time at page/setTimeAtPage";
function createClock(refMainClockIdInterval, clockSelector, additionalSelector, timezoneOffset) {
    if (clockSelector === void 0) { clockSelector = "#clock"; }
    if (additionalSelector === void 0) { additionalSelector = "li.active-tasks__list-wrapper.clocks > ol.active-tasks__list-tasks"; }
    if (timezoneOffset === void 0) { timezoneOffset = new Date().getTimezoneOffset(); }
    var clockElement = document.querySelector(clockSelector);
    var listElem = createClockListElement(additionalSelector);
    var intervalId = null;
    var timeMs = new Date().getTime() + (1000 * 60 * 60 * (-timezoneOffset / 60));
    refMainClockIdInterval.timeMs = timeMs;
    resetClockElement(clockSelector);
    resetClockElement(listElem);
    setTimeAtPage(clockElement, timeMs, false);
    setTimeAtPage(listElem, timeMs, false);
    listElem.addEventListener("click", function () {
        if (refMainClockIdInterval.intervalID !== intervalId) {
            refMainClockIdInterval.intervalID = intervalId;
            resetClockElement(clockSelector);
            setTimeAtPage(clockElement, timeMs, false);
        }
    });
    intervalId = window.setInterval(function () {
        timeMs = new Date().getTime() + (1000 * 60 * 60 * (-timezoneOffset / 60));
        if (refMainClockIdInterval.intervalID === intervalId) {
            setTimeAtPage(clockElement, timeMs, false, intervalId);
            refMainClockIdInterval.timeMs = timeMs;
        }
        if (listElem) {
            setTimeAtPage(listElem, timeMs, false, intervalId);
        }
    }, Math.floor(timeMs / 1000 % 60));
    refMainClockIdInterval.intervalID = intervalId;
}
export default createClock;
