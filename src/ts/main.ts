"use strict";
import menuTabs from "./modules/menuTabs/menuTabs";

window.addEventListener("DOMContentLoaded", function () {
    const activeTasksElement: HTMLElement = document.querySelector(".active-tasks");
    if (!activeTasksElement) {
        throw new Error("There is no activeTasksElement at page.");
    }

    menuTabs("time");

    activeTasksElement.addEventListener("click", onClickTask);

    function onClickTask(event: Event) {
        if (event.target instanceof HTMLElement) {
            if(     (event.target.tagName === "LI" && event.target.querySelector("div.active-tasks__time"))
                ||  (event.target.tagName === "DIV" && event.target.classList.contains(".active-tasks__time"))
            ) {
                let element;
                if(event.target.tagName === "LI") element = event.target.querySelector(".active-tasks__time");
                else element = event.target;

                const typeTask = element.getAttribute("data-type-task"),
                  keyTask = element.getAttribute("data-interval-id");

                console.log(typeTask, keyTask)
            }
        }
    }
});