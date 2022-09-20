function getZero(num) {
    if (num >= 0 && num < 10) {
        return "0".concat(num);
    }
    else {
        return num;
    }
}
export default getZero;
