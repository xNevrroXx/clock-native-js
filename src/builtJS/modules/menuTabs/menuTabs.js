import createClock from "../createClock/createClock";
import createStopwatch from "../stopwatch/stopwatch";
import createTimer from "../timer/timer";
import createAlarmClock from "../alarmClock/alarmClock";
import { resetClockElement } from "../tech functions/createElements";
function menuTabs(currentTab /*todo some function that creates one of the clock types*/) {
    var activeTab = currentTab;
    var tabsElement = document.querySelector("header");
    var mainClockIdInterval = {
        intervalID: null,
        timeMs: null,
        resetIntervalIDToZero: function () {
            this.intervalID = null;
        }
    };
    doTask(activeTab);
    tabsElement.addEventListener("click", handler);
    function handler(event) {
        if (event.target instanceof HTMLElement) {
            if (event.target.tagName == "DIV" && event.target.textContent.toLowerCase() !== activeTab) {
                var tabValue = event.target.textContent.toLowerCase();
                activeTab = tabValue;
                resetClockElement("#clock");
                mainClockIdInterval.resetIntervalIDToZero();
                doTask(tabValue);
            }
        }
    }
    function doTask(typeTask) {
        switch (typeTask) {
            case "time":
                createClock(mainClockIdInterval);
                break;
            case "alarm clock":
                createAlarmClock(mainClockIdInterval);
                break;
            case "stopwatch":
                createStopwatch(mainClockIdInterval);
                break;
            case "timer":
                createTimer(mainClockIdInterval);
                break;
        }
    }
}
export default menuTabs;
