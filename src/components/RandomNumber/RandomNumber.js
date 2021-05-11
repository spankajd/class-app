
import React, { useState } from 'react';
import Button from '../../elements/Button/Button';

import style from './RandomNumber.module.scss';
import NumberBox from '../../elements/NumberBox/NumberBox';
import { generateRandomNumber } from '../HigherOrder/generateRandomNumber';


const RandomNumber = ({ output, setNumberOfDigits, generateNumber }) => {
    const numArr = [0,1,2,3,4,5,6,7,8,9];

    const [curVal, setCurrentVal] = useState(1);

    const onInputChange = (e) => {
        const val = e.target.value;
        let curVal = val ? Math.min(Math.max(val, 1),10) : '';
        setNumberOfDigits && setNumberOfDigits(curVal);
        setCurrentVal(curVal);
    } 

    const onGenerateClick = () => {
        generateNumber && generateNumber();
    }

    return (
        <div className={`${style.randomNumber}`}>
            <div className={`${style.row} ${style.numberSymbol}`}>
                { numArr.map( i =>  <NumberBox num={i}></NumberBox>)}
            </div>
            <div className={`${style.row} ${style.numberInput}`}>
                <label>Number of digits</label>
                <input type="text" onChange={onInputChange} maxLength="2" value={curVal}/>
            </div>
            <div className={`${style.row} ${style.numberTrigger}`}>
                <Button label="Generate" primary={true} onClick={onGenerateClick} disabled={curVal === ''}></Button>
            </div>
            {output && (<div className={`${style.row} ${style.numberOutput}`}>{output}</div>)}
        </div>
    );
};

export default generateRandomNumber(RandomNumber);