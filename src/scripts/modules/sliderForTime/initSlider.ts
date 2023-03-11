import { createButton, createSpans } from "../techFunctions/createElements";
import {resetClockElement} from "../techFunctions/createElements";
import { createHoursSlider, createMinutesSlider, createSecondsSlider } from "./slider";

function initSlider(containerSelector: string, funcInitTask: (alertTimeMs: number) => {}, taskStr: string) {
    const containerElement: HTMLElement | null = document.querySelector(containerSelector);
    if (!containerElement) throw new Error(`Could not find element with selector ${containerSelector}`);
    resetClockElement(containerElement)

    const hoursWrap: HTMLElement | null = containerElement.querySelector(".hours");
    const minutesWrap: HTMLElement | null = containerElement.querySelector(".minutes");
    const secondsWrap: HTMLElement | null = containerElement.querySelector(".seconds");
    if (!hoursWrap ||!minutesWrap ||!secondsWrap) throw new Error(`Could not find elements`);
    const setTaskBtn = taskStr === "alarm" ? createButton("set an alarm") : createButton("set an timer");
    let intervalID = null;

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
        const alertTimeMs = getAlertTime();

        funcInitTask(alertTimeMs);
    }

    function getAlertTime() {
        if (!hoursWrap ||!minutesWrap ||!secondsWrap) throw new Error(`Could not find elements`);
        let hours = hoursWrap.querySelector(".clock__wrapper-slider > span.active"),
            minutes = minutesWrap.querySelector(".clock__wrapper-slider > span.active"),
            seconds = secondsWrap.querySelector(".clock__wrapper-slider > span.active");
        if (!hours ||!minutes ||!seconds) throw new Error(`Could not find elements`);

        
        return ((+hours.textContent! * 1000 * 60 * 60) + (+minutes.textContent! * 1000 * 60) + (+seconds.textContent! * 1000));
    }
}

export default initSlider;