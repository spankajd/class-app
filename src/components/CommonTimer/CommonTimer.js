
import React, { useEffect, useState } from 'react';
import TimeUnit from '../../elements/TimeUnit/TimeUnit';
import { calculateTime } from '../../helper';

import style from './CommonTimer.module.scss';


const CommonTimer = ({ editMode, timeInSeconds = 0, onTimeUpdate }) => {

    const [time, setTime] = useState({
        h:0,
        m:0,
        
        s:0,
        total: timeInSeconds
    });

    useEffect( () => {
        const {total} = time;
        update(total);
    }, []);

    useEffect( () => {
        update(timeInSeconds);
    }, [timeInSeconds]);

    

    const onChange = (factor) => {
        let {total} = time;
        total += factor;
        update(total);
        onTimeUpdate && onTimeUpdate(newTime);
    }

    const update = (total) => {
        const newTime = calculateTime(total);
        setTime({
            h:newTime.h,
            m:newTime.m,
            s:newTime.s,
            total:total
        });
    } 

    return (
        <div className={`${style.commonTimer}`}>
            <div className={`${style.group} ${style.hour}`}>
                <TimeUnit editMode={editMode} onChange={onChange} num={Math.floor ( time.h / 10)} factorSec={36000}></TimeUnit>
                <TimeUnit editMode={editMode} onChange={onChange} num={( time.h % 10)} factorSec={3600}></TimeUnit>
                <label>hours</label>
            </div>
            <div className={style.separator}>:</div>
            <div className={`${style.group} ${style.minute}`}>
                <TimeUnit editMode={editMode} onChange={onChange} num={Math.floor ( time.m / 10)} factorSec={600}></TimeUnit>
                <TimeUnit editMode={editMode} onChange={onChange} num={( time.m % 10)} factorSec={60}></TimeUnit>
                <label>minutes</label>
            </div>
            <div className={style.separator}>:</div>
            <div className={`${style.group} ${style.second}`}>
                <TimeUnit editMode={editMode} onChange={onChange} num={Math.floor ( time.s / 10)} factorSec={10}></TimeUnit>
                <TimeUnit editMode={editMode} onChange={onChange} num={( time.s % 10)} factorSec={1}></TimeUnit>
                <label>seconds</label>
            </div>

        </div>
    );
};

export default CommonTimer;
