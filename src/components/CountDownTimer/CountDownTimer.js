import React, { useState, useEffect } from 'react';

import CommonTimer from '../CommonTimer/CommonTimer';
import { intervalForTimer } from '../HigherOrder/intervalForTimer';

import style from './CountDownTimer.module.scss';


const CountDownTimer = ({ editMode= true, intervalStarted, currentSecond = 600, setParams, startInterval, stopInterval }) => {

    const [currentTime , setCurrentTime] = useState(currentSecond);
    const [currentMode , setCurrentMode] = useState(editMode);


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
    },[currentSecond]);

    useEffect( () => { 
        if(!intervalStarted) {
            setCurrentMode(editMode);
        }
    },[intervalStarted, editMode]);

    useEffect( () => { 
        if(intervalStarted) {
            setCurrentMode(false);
            startInterval();
        } else {
            stopInterval();
        }
    },[intervalStarted]);


    return (
        <div className={`${style.countDownTimer}`}>
            <CommonTimer editMode={currentMode} timeInSeconds={currentTime} onTimeUpdate={onTimeUpdate}/>
        </div>
    );
};

export default intervalForTimer(CountDownTimer);
