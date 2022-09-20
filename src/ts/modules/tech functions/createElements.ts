function createButton(internalText: string, classText = "start-button") {
  const startButton = document.createElement("button");
  startButton.className = classText;
  startButton.textContent = internalText;

  return startButton;
}

function createSpans(clockElement: HTMLElement) {
  clockElement.querySelectorAll("div").forEach((element: HTMLElement) => {
    element.innerHTML = "<span>00</span>";
  });
}

function createMsElement(containerElement: HTMLElement) {
  const msElement = document.createElement("div");
  msElement.className = "milliseconds";

  containerElement.append(document.createTextNode(":"));
  containerElement.append(msElement);
  // containerElement.append(msElement);
}

function resetClockElement(clockSelectorOrElement: string | HTMLElement, isMsElement: boolean = false) {
  let clockElement: HTMLElement;
  if(typeof clockSelectorOrElement === "string") {
    clockElement = document.querySelector(clockSelectorOrElement);
  } else {
    clockElement = clockSelectorOrElement as HTMLElement;
  }
  clockElement.innerHTML = `<div class="hours"></div>:<div class="minutes"></div>:<div class="seconds"></div>`;

  if(isMsElement) {
    createMsElement(clockElement);
  }
  createSpans(clockElement);
}

function createClockListElement(containerSelector: string) {
  const containerElement = document.querySelector(containerSelector);

  const listElement = document.createElement("li");
  containerElement.insertAdjacentElement("beforeend", listElement);

  return listElement;
}

export {createButton, createSpans, createMsElement, resetClockElement, createClockListElement};