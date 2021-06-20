
import React, { useState, useRef, useEffect } from 'react';
import { BigDice } from '../../elements/Icon/Icon';
import Button from '../../elements/Button/Button';

import style from './Dice.module.scss';
import { generateRandomNumber } from '../HigherOrder/generateRandomNumber';


const Dice = ({ output, setNumberOfDigits, generateNumber }) => {

    const dice_1 = useRef();
    const dice_2 = useRef();
    const dice_3 = useRef();
    const dice_4 = useRef();
    const dice_5 = useRef();

    useEffect(() => {
        if (output) {
            let str = '' + output;
            if (dice_1 && dice_1.current) dice_1.current.dataset.roll = str.charAt(0);
            if (dice_2 && dice_2.current) dice_2.current.dataset.roll = str.charAt(1);
            if (dice_3 && dice_3.current) dice_3.current.dataset.roll = str.charAt(2);
            if (dice_4 && dice_4.current) dice_4.current.dataset.roll = str.charAt(3);
            if (dice_5 && dice_5.current) dice_5.current.dataset.roll = str.charAt(4);
        }
    }, [output]);

    const [curVal, setCurrentVal] = useState(1);
    const [flag, setFlag] = useState(true);

    const onInputChange = (e) => {
        const val = e.target.value;
        let curVal = val ? Math.min(Math.max(val, 1), 5) : '';
        setNumberOfDigits && setNumberOfDigits(curVal);
        setCurrentVal(curVal);
    }

    const onGenerateClick = () => {
        setFlag(!flag);
        generateNumber && generateNumber(true);
    }

    const renderDice = () => {
        let arr = [];
        const refArr = [dice_1, dice_2, dice_3, dice_4, dice_5];
        for (let i = 1; i <= curVal; i++) {
            arr.push(
                <div className={style.dice}>
                    <ol className={`${style['die-list']} ${style[flag ? 'even-roll' : 'odd-roll']}`} dataRoll="1" ref={refArr[i - 1]}>
                        <li className={style['die-item']} data-side="1">
                            <span className={style['dot']}></span>
                        </li>
                        <li className={style['die-item']} data-side="2">
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                        </li>
                        <li className={style['die-item']} data-side="3">
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                        </li>
                        <li className={style['die-item']} data-side="4">
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                        </li>
                        <li className={style['die-item']} data-side="5">
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                        </li>
                        <li className={style['die-item']} data-side="6">
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                            <span className={style['dot']}></span>
                        </li>
                    </ol>
                </div>
            )
        }
        return arr;
    }

    return (
        <div className={`${style.diceWrapper}`}>
            <div className={`${style.row} ${style.diceImg}`}>
                <BigDice></BigDice>
            </div>
            <div className={`${style.row} ${style.diceInput}`}>
                <label>Number of dice</label>
                <input type="text" onChange={onInputChange} maxLength="1" value={curVal} />
            </div>
            <div className={`${style.row} ${style.diceTrigger}`}>
                <Button label="Roll" primary={true} onClick={onGenerateClick} disabled={curVal === ''}></Button>
            </div>
            {(<div className={`${style.row} ${style.diceOutput}`}>
                {renderDice()}
            </div>)}
        </div>
    );
};

export default generateRandomNumber(Dice);