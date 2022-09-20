// own modules
import initSlider from "../slider for time/initSlider";
import createClock from "../createClock/createClock";
import createStopwatch from "../stopwatch/stopwatch";
import createTimer from "../timer/timer";
import createAlarmClock from "../alarmClock/alarmClock";
import {resetClockElement} from "../tech functions/createElements";
// types
import {TClockTasks, TMainClockIdInterval} from "../../types";

function menuTabs(currentTab: TClockTasks/*todo some function that creates one of the clock types*/) {
    let activeTab = currentTab;
    const tabsElement = document.querySelector("header");
    let mainClockIdInterval: TMainClockIdInterval = {
        intervalID: null,
        timeMs: null,
        resetIntervalIDToZero: function() {
            this.intervalID = null;
        }
    };

    doTask(activeTab);
    tabsElement.addEventListener("click", handler);

    function handler(event: Event) {
        if(event.target instanceof HTMLElement) {
            if(event.target.tagName == "DIV" && event.target.textContent.toLowerCase() !== activeTab) {
                const tabValue = event.target.textContent.toLowerCase() as TClockTasks;
                activeTab = tabValue;
                resetClockElement("#clock");
                mainClockIdInterval.resetIntervalIDToZero();
                doTask(tabValue);
            }
        }
    }

    function doTask(typeTask: TClockTasks) {
        switch (typeTask) {
            case "time":
                createClock(mainClockIdInterval);
                break;
            case "alarm clock":
                createAlarmClock(mainClockIdInterval)
                break;
            case "stopwatch":
                createStopwatch(mainClockIdInterval)
                break;
            case "timer":
                createTimer(mainClockIdInterval)
                break;
        }
    }
}

export default menuTabs;