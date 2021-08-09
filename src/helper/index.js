
export const calculateTime = total => {

    let totalSeconds = total;

    const h = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;

    return { h, m, s }
}

export const validateNumnerInput = val => {
    const regexp = /^[0-9\b]+$/;
    if (val === '' || regexp.test(val)) {
        return val
    }
    return null
}