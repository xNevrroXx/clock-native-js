import { createButton, createClockListElement, resetClockElement } from "../tech functions/createElements";
import setTimeAtPage from "../set time at page/setTimeAtPage";
function createStopwatch(refMainClockIdInterval, containerSelector, additionalSelector) {
    if (containerSelector === void 0) { containerSelector = "#clock"; }
    if (additionalSelector === void 0) { additionalSelector = "li.active-tasks__list-wrapper.stopwatches > ol.active-tasks__list-tasks"; }
    var containerElement = document.querySelector(containerSelector);
    resetClockElement(containerSelector, true);
    var startBtn = createButton("start timer");
    var stopBtn = createButton("stop button");
    var intervalId = null;
    var time = 0;
    resetClockElement(containerElement, true);
    containerElement.appendChild(startBtn);
    setTimeAtPage(containerElement, time);
    startBtn.addEventListener("click", startStopwatch);
    function startStopwatch() {
        var listElem = createClockListElement(additionalSelector);
        resetClockElement(listElem, true);
        setTimeAtPage(listElem, time);
        listElem.addEventListener("click", function () {
            if (refMainClockIdInterval.intervalID !== intervalId) {
                refMainClockIdInterval.intervalID = intervalId;
                resetClockElement(containerElement, true);
                setTimeAtPage(containerElement, time, true);
            }
        });
        startBtn.removeEventListener("click", startStopwatch);
        startBtn.remove();
        containerElement.appendChild(stopBtn);
        stopBtn.addEventListener("click", stopStopwatch);
        intervalId = window.setInterval(function () {
            time += 10;
            if (refMainClockIdInterval.intervalID === intervalId) {
                setTimeAtPage(containerElement, time, true);
            }
            setTimeAtPage(listElem, time, true);
        }, 10);
        refMainClockIdInterval.intervalID = intervalId;
    }
    function stopStopwatch() {
        clearInterval(intervalId);
        if (intervalId === refMainClockIdInterval.intervalID) {
            refMainClockIdInterval.resetIntervalIDToZero();
        }
        resetClockElement(containerSelector);
        stopBtn.removeEventListener("click", stopStopwatch);
        stopBtn.remove();
        containerElement.appendChild(startBtn);
        startBtn.addEventListener("click", startStopwatch);
    }
}
export default createStopwatch;
