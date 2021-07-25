import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DigitRoll from 'digit-roll-react';

import Button from '../../elements/Button/Button';
import NumberBox from '../../elements/NumberBox/NumberBox';
import { generateRandomNumber } from '../HigherOrder/generateRandomNumber';

import style from './RandomNumber.module.scss';

const RandomNumber = ({ output, setNumberOfDigits, generateNumber }) => {
    const { t, i18n } = useTranslation();
    const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const [curVal, setCurrentVal] = useState(1);

    const onInputChange = (e) => {
        const val = e.target.value;
        let curVal = val ? Math.min(Math.max(val, 1), 10) : '';
        setNumberOfDigits && setNumberOfDigits(curVal);
        setCurrentVal(curVal);
    }

    const onGenerateClick = () => {
        generateNumber && generateNumber();
    }

    const renderOutput = () => {
        let arr = [];
        let str = '';
        if (!output) {
            for (let i = 0; i < curVal; i++)
                str += '-';
        }

        for (let i = 0; i < str.length; i++) {
            arr.push(
                <NumberBox num={str[i]} key={i}></NumberBox>
            )
        }
        if (output) {
            return (<DigitRoll num={output} length={curVal} className={style.numberBox} divider="" delay="1" />)
        }
        return arr;
    }

    return (
        <div className={`${style.randomNumber}`}>
            <div className={`${style.row} ${style.numberOutput}`}>{renderOutput()}</div>
            <div className={`${style.row}`}>
                <div className={`${style.col} ${style.numberInput}`}>
                    <label>{t('number.numberOfDigit')}</label>
                    <input type="text" onChange={onInputChange} maxLength="2" value={curVal} />
                </div>
                <div className={`${style.col} ${style.numberTrigger}`}>
                    <Button label={t('number.generate')} primary={true} onClick={onGenerateClick} disabled={curVal === ''}></Button>
                </div>
            </div>
        </div>
    );
};

export default generateRandomNumber(RandomNumber);