
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

export const translate = (randomStudentList, t) => {
    var arr = [];
    for(var i = 0; i < randomStudentList.length; i++) {
        if(randomStudentList[i]) {
            arr.push(`${t('whoisnext.number')} ${randomStudentList[i].split(' ')[1]}`);
        } else {
            arr.push(randomStudentList[i]);
        }
        
    }
    return arr
}