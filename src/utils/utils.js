export const calculateBoxToBuy = (tile, tilePerformance) => {
    return Math.ceil(Math.round(((tile / tilePerformance) + Number.EPSILON) * 100) / 100);
}

export const calculateArea = (kind, width, height) => {
    let area;
    switch (kind) {
        case 'square':
            area = width * height;
            break;
        case 'triangle':
            area = (width * height) / 2
            break;
        default:
            break;
    }
    area = Math.round((area + Number.EPSILON) * 100) / 100;
    return area;
}

export const calculateTileNeeded = (area) => {
    return Math.round(((area * 1.05) + Number.EPSILON) * 100) / 100;
}