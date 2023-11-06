export function getStyleTranslate(element: Element): { x: number, y: number } {
    const style = window.getComputedStyle(element);
    const matrix = new WebKitCSSMatrix(style.transform);
    return { x: matrix.m41, y: matrix.m42 };
}