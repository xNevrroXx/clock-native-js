function getCountPixels(element, property) {
    var valueStr = window.getComputedStyle(element)[property];
    return valueStr.match(/^[0-9]{1,}/)[0];
}
export default getCountPixels;
