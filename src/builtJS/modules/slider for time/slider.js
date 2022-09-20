import getCountPixels from "../tech functions/getCountPixels";
import getZero from "../tech functions/getZero";
function createSlider(containerElement, maxValue, defaultActiveNumber) {
    if (defaultActiveNumber === void 0) { defaultActiveNumber = 0; }
    containerElement.innerHTML = "<div class='clock__wrapper-slider'></div>";
    var wrapperSlides = containerElement.querySelector(".clock__wrapper-slider");
    var activeNumber = defaultActiveNumber;
    var activeIndexNumber = defaultActiveNumber;
    for (var i = -maxValue + 1; i <= maxValue; i++) {
        var value = void 0;
        if (i < 0)
            value = maxValue - -i;
        else if (i == maxValue)
            value = 0;
        else
            value = i;
        wrapperSlides.insertAdjacentHTML("beforeend", "   <span\n                    data-index=".concat(i, "\n                    class=").concat(i == 0 ? "active" : "", "\n                >").concat(getZero(value), "</span>\n            "));
    }
    var activeElement = wrapperSlides.querySelector('span.active');
    activeElement.scrollIntoView(true);
    activeElement.scrollBy(0, -getCountPixels(activeElement, "height"));
    wrapperSlides.addEventListener('click', changeSlide);
    function changeSlide(event) {
        /*
            Для бесконечной прокрутки надо:

            1)N - количество пролистываемых позиций(возможно пролистнуть сразу на 2 слайда и более);
            2)удалить N число слайдов в начале или в конце списка и поместить их содержимое(развернутое), соответственно в конец или начало
        */
        // реализация бесконечной прокрутки
        if (event.target instanceof HTMLElement) {
            if (event && event.target && event.target.tagName == "SPAN") {
                var target = event.target;
                var countScrollable = +target.getAttribute("data-index") - activeIndexNumber;
                activeIndexNumber += countScrollable;
                var listSpans = Array.from(this.querySelectorAll("span"));
                var listMovedElems = [];
                if (countScrollable < 0) {
                    for (var i_1 = listSpans.length - 1; i_1 > listSpans.length - 1 + countScrollable; i_1--) {
                        var element = listSpans[i_1];
                        element.remove();
                        listMovedElems.push(element);
                        this.prepend(element);
                    }
                }
                else {
                    for (var i_2 = 0; i_2 < countScrollable; i_2++) {
                        var element = listSpans[i_2];
                        element.remove();
                        listMovedElems.push(element);
                        this.append(element);
                    }
                }
                activeNumber = +target.textContent;
                wrapperSlides.querySelectorAll("span").forEach(function (element) {
                    element.classList.remove("active");
                });
                target.classList.add("active");
                wrapperSlides.querySelector("span[data-index=\"".concat(activeIndexNumber === 0 ? (maxValue - 1) : activeIndexNumber - 1, "\"]")).scrollIntoView(true);
            }
        }
    }
}
function createHoursSlider(containerHoursElement) {
    createSlider(containerHoursElement, 24);
}
function createMinutesSlider(containerMinutesElement) {
    createSlider(containerMinutesElement, 60);
}
function createSecondsSlider(containerSecondsElement) {
    createSlider(containerSecondsElement, 60);
}
export default createSlider;
export { createHoursSlider, createMinutesSlider, createSecondsSlider };
