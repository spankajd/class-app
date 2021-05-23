
import React, { useEffect, useState } from 'react';

import CommonTimer from '../CommonTimer/CommonTimer';
import { intervalForTimer } from '../HigherOrder/intervalForTimer';

import style from './StandardTimer.module.scss';


const StandardTimer = ({ intervalStarted, currentSecond = 0, setParams, startInterval, stopInterval }) => {

    const [currentTime , setCurrentTime] = useState(currentSecond);

    useEffect( () => { 
        setParams({
            factor: 1, 
            start: 0,
            stop: null
        });
        // startInterval();
    }, []);

    useEffect( () => { 
        setCurrentTime(currentSecond);
    },[currentSecond]);

    useEffect( () => { 
        if(intervalStarted) {
            startInterval();
        } else {
            stopInterval();
        }
    },[intervalStarted]);

    return (
        <div className={`${style.standardTimer}`}>
            <CommonTimer editMode={false} timeInSeconds={currentTime} />
        </div>
    );
};

export default intervalForTimer(StandardTimer);
