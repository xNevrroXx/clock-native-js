"use strict";

import getZero from "../tech functions/getZero";

function setTimeAtPage(containerElement: HTMLElement, timeMs: number, isMsElement = false, intervalId?: number) {
    if(intervalId) {
        containerElement.dataset.id = intervalId.toString();
    }

    const hoursElement = containerElement.querySelector(".hours > span");
    const minutesElement = containerElement.querySelector(".minutes > span");
    const secondsElement = containerElement.querySelector(".seconds > span");
    
    const hours = getZero(Math.floor(timeMs / (1000 * 60 * 60) % 24));
    const minutes = getZero(Math.floor(timeMs / (1000 * 60) % 60));
    const seconds = getZero(Math.floor(timeMs / 1000 % 60));
    
    hoursElement.textContent = hours.toString();
    minutesElement.textContent = minutes.toString();
    secondsElement.textContent = seconds.toString();

    if(isMsElement) {
        const millisecondsElement = containerElement.querySelector(".milliseconds > span");
        const milliseconds = getZero(Math.floor((timeMs % 1000) / 10));
        
        millisecondsElement.textContent = milliseconds.toString();
    }
}

export default setTimeAtPage;
