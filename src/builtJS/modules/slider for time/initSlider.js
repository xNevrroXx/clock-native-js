import { createButton, createSpans } from "../tech functions/createElements";
import { resetClockElement } from "../tech functions/createElements";
import { createHoursSlider, createMinutesSlider, createSecondsSlider } from "./slider";
function initSlider(containerSelector, funcInitTask, taskStr) {
    var containerElement = document.querySelector(containerSelector);
    resetClockElement(containerElement);
    var hoursWrap = containerElement.querySelector(".hours");
    var minutesWrap = containerElement.querySelector(".minutes");
    var secondsWrap = containerElement.querySelector(".seconds");
    var setTaskBtn = taskStr === "alarm" ? createButton("set an alarm") : createButton("set an timer");
    var intervalID = null;
    createSpans(containerElement);
    createHoursSlider(hoursWrap);
    createMinutesSlider(minutesWrap);
    createSecondsSlider(secondsWrap);
    containerElement.append(setTaskBtn);
    setTaskBtn.addEventListener("click", startTask);
    // if(taskStr === "alarm") {
    //     menuTabs(intervalID, containerElement, "alarm createClock");
    // }
    // else {
    //     menuTabs(intervalID, containerElement, "timer");
    // }
    function startTask() {
        var alertTimeMs = getAlertTime();
        funcInitTask(alertTimeMs);
    }
    function getAlertTime() {
        var hours = hoursWrap.querySelector(".clock__wrapper-slider > span.active"), minutes = minutesWrap.querySelector(".clock__wrapper-slider > span.active"), seconds = secondsWrap.querySelector(".clock__wrapper-slider > span.active");
        return ((+hours.textContent * 1000 * 60 * 60) + (+minutes.textContent * 1000 * 60) + (+seconds.textContent * 1000));
    }
}
export default initSlider;
