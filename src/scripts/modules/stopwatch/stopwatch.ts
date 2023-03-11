import {createButton, createClockListElement, resetClockElement} from "../techFunctions/createElements";
import { createSpans, createMsElement } from "../techFunctions/createElements";
import setTimeAtPage from "../setTimeAtPage/setTimeAtPage";
import {TMainClockIdInterval} from "../../types";

function createStopwatch(refMainClockIdInterval: TMainClockIdInterval, containerSelector: string = "#clock", additionalSelector: string = "li.active-tasks__list-wrapper.stopwatches > ol.active-tasks__list-tasks") {
    const containerElement: HTMLElement | null = document.querySelector(containerSelector);
    if (!containerElement) throw new Error(`Could not find ${containerSelector}`);
    resetClockElement(containerSelector, true);

    const startBtn = createButton("start timer");
    const stopBtn = createButton("stop button");

    let intervalId: number | undefined = undefined;
    let time = 0;
    resetClockElement(containerElement, true);
    containerElement.appendChild(startBtn);

    setTimeAtPage(containerElement, time);
    startBtn.addEventListener("click", startStopwatch);

    function startStopwatch() {
        const listElem = createClockListElement(additionalSelector);
        resetClockElement(listElem, true);
        setTimeAtPage(listElem, time);

        listElem.addEventListener("click", () => {
            if (!intervalId) throw new Error("intervalId have no value");
            if(refMainClockIdInterval.intervalID !== intervalId) {
                refMainClockIdInterval.intervalID = intervalId;

                if (!containerElement) throw new Error(`Could not find ${containerSelector}`);
                resetClockElement(containerElement, true);
                setTimeAtPage(containerElement, time, true);
            }
        })

        startBtn.removeEventListener("click", startStopwatch);
        startBtn.remove();

        if (!containerElement) throw new Error(`Could not find ${containerSelector}`);
        containerElement.appendChild(stopBtn);
        stopBtn.addEventListener("click", stopStopwatch);

        intervalId = window.setInterval(() => {
            time += 10;
            if(refMainClockIdInterval.intervalID === intervalId) {
                setTimeAtPage(containerElement, time, true);
            }
            setTimeAtPage(listElem, time, true);
        }, 10);
        refMainClockIdInterval.intervalID = intervalId;
    }

    function stopStopwatch() {
        clearInterval(intervalId);
        if(intervalId === refMainClockIdInterval.intervalID) {
            refMainClockIdInterval.resetIntervalIDToZero();
        }
        resetClockElement(containerSelector);
        stopBtn.removeEventListener("click", stopStopwatch);
        stopBtn.remove();

        if (!containerElement) throw new Error(`Could not find ${containerSelector}`);
        containerElement.appendChild(startBtn);
        startBtn.addEventListener("click", startStopwatch);
    }
}

export default createStopwatch;