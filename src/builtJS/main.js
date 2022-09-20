"use strict";
import menuTabs from "./modules/menuTabs/menuTabs";
window.addEventListener("DOMContentLoaded", function () {
    var activeTasksElement = document.querySelector(".active-tasks");
    if (!activeTasksElement) {
        throw new Error("There is no activeTasksElement at page.");
    }
    menuTabs("time");
    activeTasksElement.addEventListener("click", onClickTask);
    function onClickTask(event) {
        if (event.target instanceof HTMLElement) {
            if ((event.target.tagName === "LI" && event.target.querySelector("div.active-tasks__time"))
                || (event.target.tagName === "DIV" && event.target.classList.contains(".active-tasks__time"))) {
                var element = void 0;
                if (event.target.tagName === "LI")
                    element = event.target.querySelector(".active-tasks__time");
                else
                    element = event.target;
                var typeTask = element.getAttribute("data-type-task"), keyTask = element.getAttribute("data-interval-id");
                console.log(typeTask, keyTask);
            }
        }
    }
});
