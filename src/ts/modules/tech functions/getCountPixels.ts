function getCountPixels(element: HTMLElement, property: any) {
    const valueStr = window.getComputedStyle(element)[property];
    
    return valueStr.match(/^[0-9]{1,}/)[0];
}

export default getCountPixels;