
import React, { useState } from 'react';
import { BigDice } from '../../elements/Icon/Icon';
import Button from '../../elements/Button/Button';

import style from './Dice.module.scss';
import { generateRandomNumber } from '../HigherOrder/generateRandomNumber';


const Dice = ({ output, setNumberOfDigits, generateNumber }) => {

    const [curVal, setCurrentVal] = useState(1);

    const onInputChange = (e) => {
        const val = e.target.value;
        let curVal = val ? Math.min(Math.max(val, 1), 5) : '';
        setNumberOfDigits && setNumberOfDigits(curVal);
        setCurrentVal(curVal);
    }

    const onGenerateClick = () => {
        generateNumber && generateNumber(true);
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
            {output && (<div className={`${style.row} ${style.diceOutput}`}>
                {output}
                {/* <div className={style.dice}>
                    <ol class={`${style['die-list']} ${style['even-roll']}`} dataRoll="1" id="die-1">
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
                </div> */}
            </div>)}
        </div>
    );
};

export default generateRandomNumber(Dice);