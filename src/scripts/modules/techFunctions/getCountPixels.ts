function getCountPixels(element: HTMLElement, property: any) {
    const valueStr: string | null = window.getComputedStyle(element)[property];
    if (!valueStr) throw new Error(`Could not get property ${property}`);

    return valueStr.match(/^[0-9]+/)![0];
}

export default getCountPixels;