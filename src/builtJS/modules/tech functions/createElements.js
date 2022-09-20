function createButton(internalText, classText) {
    if (classText === void 0) { classText = "start-button"; }
    var startButton = document.createElement("button");
    startButton.className = classText;
    startButton.textContent = internalText;
    return startButton;
}
function createSpans(clockElement) {
    clockElement.querySelectorAll("div").forEach(function (element) {
        element.innerHTML = "<span>00</span>";
    });
}
function createMsElement(containerElement) {
    var msElement = document.createElement("div");
    msElement.className = "milliseconds";
    containerElement.append(document.createTextNode(":"));
    containerElement.append(msElement);
    // containerElement.append(msElement);
}
function resetClockElement(clockSelectorOrElement, isMsElement) {
    if (isMsElement === void 0) { isMsElement = false; }
    var clockElement;
    if (typeof clockSelectorOrElement === "string") {
        clockElement = document.querySelector(clockSelectorOrElement);
    }
    else {
        clockElement = clockSelectorOrElement;
    }
    clockElement.innerHTML = "<div class=\"hours\"></div>:<div class=\"minutes\"></div>:<div class=\"seconds\"></div>";
    if (isMsElement) {
        createMsElement(clockElement);
    }
    createSpans(clockElement);
}
function createClockListElement(containerSelector) {
    var containerElement = document.querySelector(containerSelector);
    var listElement = document.createElement("li");
    containerElement.insertAdjacentElement("beforeend", listElement);
    return listElement;
}
export { createButton, createSpans, createMsElement, resetClockElement, createClockListElement };
