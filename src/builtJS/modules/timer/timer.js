import { createHoursSlider, createMinutesSlider, createSecondsSlider } from "../slider for time/slider";
import { createButton, createClockListElement, resetClockElement } from "../tech functions/createElements";
import setTimeAtPage from "../set time at page/setTimeAtPage";
function createTimer(refMainClockIdInterval, containerSelector, additionalSelector) {
    if (containerSelector === void 0) { containerSelector = "#clock"; }
    if (additionalSelector === void 0) { additionalSelector = "li.active-tasks__list-wrapper.timers > ol.active-tasks__list-tasks"; }
    var containerElement = document.querySelector(containerSelector);
    var hoursWrap = containerElement.querySelector(".hours");
    var minutesWrap = containerElement.querySelector(".minutes");
    var secondsWrap = containerElement.querySelector(".seconds");
    var intervalId = null;
    var startBtn = createButton("start timer");
    containerElement.appendChild(startBtn);
    createHoursSlider(hoursWrap);
    createMinutesSlider(minutesWrap);
    createSecondsSlider(secondsWrap);
    startBtn.addEventListener("click", startTimer);
    function startTimer() {
        var remainedTime = getStartTime();
        startBtn.removeEventListener("click", startTimer);
        startBtn.remove();
        resetClockElement(containerSelector);
        setTimeAtPage(containerElement, remainedTime);
        var listElem = createClockListElement(additionalSelector);
        resetClockElement(listElem);
        setTimeAtPage(listElem, remainedTime);
        var stopBtn = createButton("stop timer");
        containerElement.appendChild(stopBtn);
        intervalId = timerInterval(remainedTime);
        refMainClockIdInterval.intervalID = intervalId;
        listElem.addEventListener("click", function () {
            if (refMainClockIdInterval.intervalID !== intervalId) {
                refMainClockIdInterval.intervalID = intervalId;
                resetClockElement(containerSelector);
                setTimeAtPage(containerElement, remainedTime, false);
            }
        });
        stopBtn.addEventListener("click", techStopTimer);
        // functions
        function techStopTimer() {
            stopBtn.removeEventListener("click", techStopTimer);
            stopBtn.remove();
            resetClockElement(containerSelector);
            clearInterval(intervalId);
            if (intervalId === refMainClockIdInterval.intervalID) {
                refMainClockIdInterval.resetIntervalIDToZero();
            }
        }
        function autoStopTimer() {
            techStopTimer();
        }
        function getStartTime() {
            var hours = hoursWrap.querySelector(".clock__wrapper-slider > span.active"), minutes = minutesWrap.querySelector(".clock__wrapper-slider > span.active"), seconds = secondsWrap.querySelector(".clock__wrapper-slider > span.active");
            return ((+hours.textContent * 1000 * 60 * 60) + (+minutes.textContent * 1000 * 60) + (+seconds.textContent * 1000));
        }
        function timerInterval(remainedTime) {
            return window.setInterval(function () {
                if (remainedTime == 0) {
                    clearInterval(intervalId);
                    return;
                }
                if (refMainClockIdInterval.intervalID === intervalId) {
                    setTimeAtPage(containerElement, remainedTime, false, intervalId);
                }
                remainedTime = remainedTime - 1000;
                setTimeAtPage(listElem, remainedTime, false, intervalId);
            }, 1000);
        }
    }
}
export default createTimer;
