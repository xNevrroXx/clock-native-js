"use strict";
import getZero from "../tech functions/getZero";
function setTimeAtPage(containerElement, timeMs, isMsElement, intervalId) {
    if (isMsElement === void 0) { isMsElement = false; }
    if (intervalId) {
        containerElement.dataset.id = intervalId.toString();
    }
    var hoursElement = containerElement.querySelector(".hours > span");
    var minutesElement = containerElement.querySelector(".minutes > span");
    var secondsElement = containerElement.querySelector(".seconds > span");
    var hours = getZero(Math.floor(timeMs / (1000 * 60 * 60) % 24));
    var minutes = getZero(Math.floor(timeMs / (1000 * 60) % 60));
    var seconds = getZero(Math.floor(timeMs / 1000 % 60));
    hoursElement.textContent = hours.toString();
    minutesElement.textContent = minutes.toString();
    secondsElement.textContent = seconds.toString();
    if (isMsElement) {
        var millisecondsElement = containerElement.querySelector(".milliseconds > span");
        var milliseconds = getZero(Math.floor((timeMs % 1000) / 10));
        millisecondsElement.textContent = milliseconds.toString();
    }
}
export default setTimeAtPage;
