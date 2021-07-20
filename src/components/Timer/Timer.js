
import React, { useRef, useState, useEffect } from 'react';
import Button from '../../elements/Button/Button';
import Holder from '../../elements/Holder/Holder';
import RadioButton from '../../elements/RadioButton/RadioButton';
import CountDownTimer from '../CountDownTimer/CountDownTimer';
import StandardTimer from '../StandardTimer/StandardTimer';

import style from './Timer.module.scss';


const Timer = ({ onCompClick, onCompClose }) => {

    const [intervalStarted, setIntervalStarted] = useState(false);
    const [resetFlag, setResetFlag] = useState(false);
    const [pauseFlag, setPauseFlag] = useState(false);
    const [selectedTimer, setSelectedTimer] = useState('');
    const standardRef = useRef();
    const countDownRef = useRef();

    useEffect(() => {
        if (!intervalStarted && !resetFlag) {
            standardRef.current.state.currentTime = 0;
            countDownRef.current.state.currentTime = countDownRef.current.state.startSec;
            countDownRef.current.state.editMode = true;
        }
    }, [intervalStarted, resetFlag]);

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onStartClick = () => {
        setIntervalStarted(true);
        setResetFlag(true);
    }

    const onPauseClick = () => {
        setIntervalStarted(false);
        setPauseFlag(true);
    }

    const onResumeClick = () => {
        setIntervalStarted(true);
        setPauseFlag(false);
    }

    const onResetClick = () => {
        setIntervalStarted(false);
        setResetFlag(false);
        setPauseFlag(false);
        standardRef.current.state.currentTime = 0;
        countDownRef.current.state.currentTime = countDownRef.current.state.startSec;
    }

    const onRadioChange = (id) => {
        setSelectedTimer(id);
    }

    return (
        <Holder className={`${style.timer}`} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={style.row}>
                <label className={style.label} for="standard">Standard timer</label>
                <RadioButton name="timer" id="standard" value="standard" disabled={intervalStarted || pauseFlag} onChange={onRadioChange}></RadioButton>
                {/* <StandardTimer ref={standardTimer} ></StandardTimer> */}
                <StandardTimer ref={standardRef} intervalStarted={intervalStarted && selectedTimer === 'standard'}></StandardTimer>
            </div>
            <div className={style.row}>
                <label className={style.label} for="countdown">Countdown timer</label>
                <RadioButton name="timer" id="countdown" value="countdown" disabled={intervalStarted || pauseFlag} onChange={onRadioChange}></RadioButton>
                {/* <CountDownTimer ref={countDownTimer} ></CountDownTimer> */}
                <CountDownTimer ref={countDownRef} editMode={selectedTimer === 'countdown'} intervalStarted={intervalStarted && selectedTimer === 'countdown'} ></CountDownTimer>
            </div>
            <div className={style.controlPanel}>
                {intervalStarted || resetFlag ? (<>
                    {pauseFlag ? (<Button primary label="Resume" onClick={onResumeClick}></Button>) :
                        (<Button primary label="Pause" onClick={onPauseClick}></Button>)}
                    <Button primary label="Reset" onClick={onResetClick}></Button>
                </>) :
                    (<Button primary label="Start" onClick={onStartClick}></Button>)}
            </div>
        </Holder >
    );
};

export default Timer;