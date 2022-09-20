import {createHoursSlider, createMinutesSlider, createSecondsSlider} from "../slider for time/slider";
import {
    createButton,
    createClockListElement,
    createMsElement,
    resetClockElement
} from "../tech functions/createElements";
import { createSpans } from "../tech functions/createElements";
import setTimeAtPage from "../set time at page/setTimeAtPage";
// types
import {TMainClockIdInterval} from "../../types";

function createTimer(refMainClockIdInterval: TMainClockIdInterval, containerSelector: string = "#clock", additionalSelector: string = "li.active-tasks__list-wrapper.timers > ol.active-tasks__list-tasks") {
    const containerElement: HTMLElement = document.querySelector(containerSelector);
    const hoursWrap: HTMLElement = containerElement.querySelector(".hours");
    const minutesWrap: HTMLElement = containerElement.querySelector(".minutes");
    const secondsWrap: HTMLElement = containerElement.querySelector(".seconds");
    let intervalId: number = null;

    const startBtn = createButton("start timer");
    containerElement.appendChild(startBtn);

    createHoursSlider(hoursWrap);
    createMinutesSlider(minutesWrap);
    createSecondsSlider(secondsWrap);

    startBtn.addEventListener("click", startTimer);
    
    function startTimer() {
        let remainedTime = getStartTime();

        startBtn.removeEventListener("click", startTimer);
        startBtn.remove();
        resetClockElement(containerSelector);
        setTimeAtPage(containerElement, remainedTime);


        const listElem = createClockListElement(additionalSelector);
        resetClockElement(listElem);
        setTimeAtPage(listElem, remainedTime);

        const stopBtn = createButton("stop timer");
        containerElement.appendChild(stopBtn);

        intervalId = timerInterval(remainedTime);
        refMainClockIdInterval.intervalID = intervalId;

        listElem.addEventListener("click", () => {
            if(refMainClockIdInterval.intervalID !== intervalId) {
                refMainClockIdInterval.intervalID = intervalId;

                resetClockElement(containerSelector);
                setTimeAtPage(containerElement, remainedTime, false);
            }
        })

        stopBtn.addEventListener("click", techStopTimer);


        // functions
        function techStopTimer() {
            stopBtn.removeEventListener("click", techStopTimer); 
            stopBtn.remove();
            resetClockElement(containerSelector);

            clearInterval(intervalId);
            if(intervalId === refMainClockIdInterval.intervalID) {
                refMainClockIdInterval.resetIntervalIDToZero();
            }
        }

        function autoStopTimer() { //add some music, maybe animation
            techStopTimer();
        }

        function getStartTime() {
            let hours = hoursWrap.querySelector(".clock__wrapper-slider > span.active"),
                minutes = minutesWrap.querySelector(".clock__wrapper-slider > span.active"),
                seconds = secondsWrap.querySelector(".clock__wrapper-slider > span.active");

            return ((+hours.textContent * 1000 * 60 * 60) + (+minutes.textContent * 1000 * 60) + (+seconds.textContent * 1000));
        }

        function timerInterval(remainedTime: number): number {
            return window.setInterval(() => {
                if(remainedTime == 0) {
                    clearInterval(intervalId);
                    return;
                }
                if(refMainClockIdInterval.intervalID === intervalId) {
                    setTimeAtPage(containerElement, remainedTime, false, intervalId);
                }

                remainedTime = remainedTime - 1000;
                setTimeAtPage(listElem, remainedTime, false, intervalId);
            }, 1000)
        }
    }
}

export default createTimer;