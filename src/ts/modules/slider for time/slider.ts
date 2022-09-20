import getCountPixels from "../tech functions/getCountPixels";
import getZero from "../tech functions/getZero";

function createSlider(containerElement: HTMLElement, maxValue: number, defaultActiveNumber = 0) {
    containerElement.innerHTML = "<div class='clock__wrapper-slider'></div>";
    const wrapperSlides = containerElement.querySelector(".clock__wrapper-slider");
    let activeNumber = defaultActiveNumber;
    let activeIndexNumber = defaultActiveNumber;

    for (var i = -maxValue + 1; i <= maxValue; i++) {
        let value;
        if(i < 0) value = maxValue - -i;
        else if (i == maxValue) value = 0;
        else value = i;

        wrapperSlides.insertAdjacentHTML("beforeend",
            `   <span
                    data-index=${i}
                    class=${i == 0 ? "active" : ""}
                >${getZero(value)}</span>
            `
        );
    }

    const activeElement: HTMLElement = wrapperSlides.querySelector('span.active');
    activeElement.scrollIntoView(true);
    activeElement.scrollBy(0, -getCountPixels(activeElement, "height") );

    wrapperSlides.addEventListener('click', changeSlide);
    function changeSlide(event: Event) {
        /*
            Для бесконечной прокрутки надо:

            1)N - количество пролистываемых позиций(возможно пролистнуть сразу на 2 слайда и более);
            2)удалить N число слайдов в начале или в конце списка и поместить их содержимое(развернутое), соответственно в конец или начало
        */

        // реализация бесконечной прокрутки
        if(event.target instanceof HTMLElement) {
            if(event && event.target && event.target.tagName == "SPAN") {
                const target = event.target;

                let countScrollable = +target.getAttribute("data-index")-activeIndexNumber;
                activeIndexNumber += countScrollable;
                const listSpans: Array<HTMLElement> | null = Array.from( this.querySelectorAll("span") );
                const listMovedElems = [];

                if(countScrollable < 0) {
                    for (let i = listSpans.length - 1; i > listSpans.length - 1 + countScrollable; i--) {
                        const element = listSpans[i];

                        element.remove();
                        listMovedElems.push(element);

                        this.prepend(element);
                    }
                }
                else {
                    for (let i = 0; i < countScrollable; i++) {
                        const element = listSpans[i];

                        element.remove();
                        listMovedElems.push(element);

                        this.append(element);
                    }
                }

                activeNumber = +target.textContent;
                wrapperSlides.querySelectorAll("span").forEach((element: HTMLElement) => {
                    element.classList.remove("active");
                });

                target.classList.add("active");
                wrapperSlides.querySelector(`span[data-index="${activeIndexNumber === 0 ? (maxValue - 1) : activeIndexNumber - 1}"]`).scrollIntoView(true);
            }
        }
    }
}

function createHoursSlider(containerHoursElement: HTMLElement) {
    createSlider(containerHoursElement, 24);
}
function createMinutesSlider(containerMinutesElement: HTMLElement) {
    createSlider(containerMinutesElement, 60);
}
function createSecondsSlider(containerSecondsElement: HTMLElement) {
    createSlider(containerSecondsElement, 60);
}

export default createSlider;
export {createHoursSlider, createMinutesSlider, createSecondsSlider};