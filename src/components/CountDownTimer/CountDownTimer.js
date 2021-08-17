import React, { useState, useEffect } from 'react';

import CommonTimer from '../CommonTimer/CommonTimer';
import { intervalForTimer } from '../HigherOrder/intervalForTimer';

import style from './CountDownTimer.module.scss';


const CountDownTimer = ({ intervalStarted, isStarted, currentSecond = 600, setParams, startInterval, stopInterval, onCountDownEnd }) => {

    const [currentTime , setCurrentTime] = useState(currentSecond);
    const [currentMode , setCurrentMode] = useState(true);


    useEffect( () => { 
        // console.log('currentSecond ' , currentSecond);
        setParams({
            factor: -1, 
            start: 600,
            stop: 0
        });
        // startInterval();
    }, []);
    
    const onTimeUpdate = (val) => {
        setParams({ 
            start: val
        });
    }

    useEffect( () => { 
        setCurrentTime(currentSecond);
        if(intervalStarted && currentSecond == 0) {
            if(onCountDownEnd)  onCountDownEnd();
        }
    },[currentSecond]);

    useEffect( () => { 
        setCurrentMode(!isStarted);
    },[isStarted]);

    useEffect( () => { 
        if(intervalStarted) {
            startInterval();
        } else {
            stopInterval();
        }
    },[intervalStarted]);


    return (
        <div className={`${style.countDownTimer}`}>
            <CommonTimer warningClass={((intervalStarted || isStarted) && 11 <= currentSecond && currentSecond <= 20) ?  style.orangeWarning : (intervalStarted && 0 <= currentSecond && currentSecond <= 10) ? style.redWarning :'' } editMode={currentMode} timeInSeconds={currentTime} onTimeUpdate={onTimeUpdate}/>
        </div>
    );
};

export default intervalForTimer(CountDownTimer);
