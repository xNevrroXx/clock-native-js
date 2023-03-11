import {createHoursSlider, createMinutesSlider, createSecondsSlider} from "../sliderForTime/slider";
import {
    createButton,
    createClockListElement,
    createMsElement,
    resetClockElement
} from "../techFunctions/createElements";
import { createSpans } from "../techFunctions/createElements";
import setTimeAtPage from "../setTimeAtPage/setTimeAtPage";
// types
import {TMainClockIdInterval} from "../../types";

function createTimer(refMainClockIdInterval: TMainClockIdInterval, containerSelector: string = "#clock", additionalSelector: string = "li.active-tasks__list-wrapper.timers > ol.active-tasks__list-tasks") {
    const containerElement: HTMLElement | null = document.querySelector(containerSelector);
    if (!containerElement) throw new Error(`Could not find ${containerSelector}`);
    const hoursWrap: HTMLElement | null = containerElement.querySelector(".hours");
    const minutesWrap: HTMLElement | null = containerElement.querySelector(".minutes");
    const secondsWrap: HTMLElement | null = containerElement.querySelector(".seconds");
    if (!hoursWrap ||!minutesWrap ||!secondsWrap) throw new Error("Missing elements");

    let intervalId: number | undefined = undefined;

    const startBtn = createButton("start timer");
    containerElement.appendChild(startBtn);

    createHoursSlider(hoursWrap);
    createMinutesSlider(minutesWrap);
    createSecondsSlider(secondsWrap);

    startBtn.addEventListener("click", startTimer);
    
    function startTimer() {
        if (!containerElement) throw new Error(`Could not find ${containerSelector}`);
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
            if (!intervalId) throw new Error("interval ID have no value");
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
            if (!hoursWrap || !minutesWrap || !secondsWrap) throw new Error("Missing elements");
            let hours: HTMLElement | null = hoursWrap.querySelector(".clock__wrapper-slider > span.active"),
                minutes: HTMLElement | null = minutesWrap.querySelector(".clock__wrapper-slider > span.active"),
                seconds: HTMLElement | null = secondsWrap.querySelector(".clock__wrapper-slider > span.active");
            if (!hours ||!minutes ||!seconds) throw new Error("Missing elements");

            return ((+hours.textContent! * 1000 * 60 * 60) + (+minutes.textContent! * 1000 * 60) + (+seconds.textContent! * 1000));
        }

        function timerInterval(remainedTime: number): number {
            if (!containerElement) throw new Error(`Could not find ${containerSelector}`);
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