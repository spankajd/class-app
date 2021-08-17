import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import TimeUnit from '../../elements/TimeUnit/TimeUnit';
import { calculateTime, validateNumnerInput } from '../../helper';

import style from './CommonTimer.module.scss';


const CommonTimer = ({ editMode, timeInSeconds = 0, onTimeUpdate, warningClass }) => {

    const { t, i18n } = useTranslation();
    const [hourStr, setHourStr] = useState('00');
    const [minuteStr, setMinuteStr] = useState('00');
    const [secondStr, setSecondStr] = useState('00');

    const [time, setTime] = useState({
        h: 0,
        m: 0,

        s: 0,
        total: timeInSeconds
    });

    // useEffect(() => {
    //     const { total } = time;
    //     update(total);
    // }, []);

    useEffect(() => {
        update(timeInSeconds);
    }, [timeInSeconds]);



    // const onChange = (factor) => {
    const onChange = e => {
        let val = validateNumnerInput(e.target.value);
        if (val != null) {
            switch (e.target.name) {
                case "hour": setHourStr(val === '' ? val : Math.min(val, 24));
                    break;
                case "minute": setMinuteStr(val === '' ? val : Math.min(val, 59));
                    break;
                case "second": setSecondStr(val === '' ? val : Math.min(val, 59));
                    break;
            }
        }
    }

    const onBlur = e => {
        if(!editMode) 
            return false;

        let { total } = time;
        let val = Number(e.target.value);
        let curVal;
        let newTotal = 0;
        switch (e.target.name) {
            case "hour":
                curVal = !isNaN(val) ? Math.min(Math.max(val, 0), 12) : Number(hourStr);
                setHourStr(updateTime(curVal));
                newTotal += curVal * 60 * 60;
                newTotal += Number(minuteStr) * 60;
                newTotal += Number(secondStr);
                break;
            case "minute":
                curVal = !isNaN(val) ? Math.min(Math.max(val, 0), 59) : Number(minuteStr);
                setMinuteStr(updateTime(curVal));
                newTotal += Number(hourStr) * 60 * 60;
                newTotal += curVal * 60;
                newTotal += Number(secondStr);
                break;
            case "second":
                curVal = !isNaN(val) ? Math.min(Math.max(val, 0), 59) : Number(secondStr);
                setSecondStr(updateTime(curVal));
                newTotal += Number(hourStr) * 60 * 60;
                newTotal += Number(minuteStr) * 60;
                newTotal += curVal;
                break;
        }
        total = Math.max(newTotal, 0);
        update(total);
        onTimeUpdate && onTimeUpdate(total);
    }

    const updateTime = k => {
        if (k < 10) {
            return "0" + k;
        }
        else {
            return k;
        }
    }

    const update = (total) => {
        const newTime = calculateTime(total);
        setHourStr(updateTime(newTime.h));
        setMinuteStr(updateTime(newTime.m));
        setSecondStr(updateTime(newTime.s));
        setTime({
            h: newTime.h,
            m: newTime.m,
            s: newTime.s,
            total: total
        });
    }

    const  onMouseDown = e => {
        e.stopPropagation();
    }

    return (
        <div className={`${style.commonTimer} ${warningClass}`}>
            <div className={`${style.group} ${style.hour}`}>
                <input type="text" name="hour" value={hourStr} onChange={onChange} onMouseDown={onMouseDown} onBlur={onBlur} readOnly={!editMode} />
                <label>{t('timer.hours')}</label>
            </div>
            <div className={style.separator}><span>:</span></div>
            <div className={`${style.group} ${style.minute}`}>
                <input type="text" name="minute" value={minuteStr} onChange={onChange} onMouseDown={onMouseDown} onBlur={onBlur} readOnly={!editMode} />
                <label>{t('timer.minutes')}</label>
            </div>
            <div className={style.separator}><span>:</span></div>
            <div className={`${style.group} ${style.second}`}>
                <input type="text" name="second" value={secondStr} onChange={onChange} onMouseDown={onMouseDown} onBlur={onBlur} readOnly={!editMode} />
                <label>{t('timer.seconds')}</label>
            </div>

        </div>
    );
};

export default CommonTimer;
