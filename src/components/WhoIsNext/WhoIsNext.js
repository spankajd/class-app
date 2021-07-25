import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import Button from '../../elements/Button/Button';
import Holder from '../../elements/Holder/Holder';

import _ from "lodash";

import style from './WhoIsNext.module.scss';
import RadioButton from '../../elements/RadioButton/RadioButton';
import * as Symbols from "../../assets/symbols"; 


// Steps 
// 1. choose format
// 5 Import override (Yes - 2 / Cancel - 1)
// 2. confirmation for random output ( Yes - 3 / Reset - 4)
// 3. next random ( Yes - 3 / Reset - 4)
// 4. reset ( Yes - 1 / Cancel - 4)

const NICKNAME = 'nickname';
const NUMBER = 'number';
const SYMBOLS = 'symbols';

const WhoIsNext = ({ onCompClick, onCompClose }) => {

    const { t, i18n } = useTranslation();
    const popUpSteps = [2, 3, 4, 5];
    const [inputStage, setInputStage] = useState('');
    const [textAreaVal, setTextAreaVal] = useState('');
    const [numberOfStudent, setNumberOfStudent] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [previousStep, setPreviousStep] = useState(1);
    const [output, setOutput] = useState('');
    const [buffer, setBuffer] = useState('');
    const [list, setList] = useState([]);
    const componentRef = useRef();

    useEffect(() => {
        if (currentStep === 6) {
            setTimeout( () => {
                setCurrentStep(previousStep);
            }, 500);
            handlePrint();
        }
    }, [currentStep])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onSelectStage = id => {
        setInputStage(id);
    }

    const onBrowse = e => {
        var fr = new FileReader();
        fr.onload = function () {
            if (textAreaVal) {
                setCurrentStep(5);
                setBuffer(fr.result);
            } else {
                setTextAreaVal(fr.result);
            }
        }
        fr.readAsText(e.target.files[0]);
    }

    const onTextAreaChange = e => {
        setTextAreaVal(e.target.value);
    }

    const onNumberInputChange = e => {
        let val = e.target.value;
        const re = /^[0-9\b]+$/;
        val = re.test(val) || val === '' ? val : numberOfStudent;
        val = val ? Math.min(Math.max(val, 1), 30) : '';
        setNumberOfStudent(val);
    }

    const onClearClick = e => {
        setTextAreaVal('');
        setNumberOfStudent('');
    }

    const onSubmitClick = e => {
        generateRadomList();
        setCurrentStep(2);
    }

    const onPrintClick = e => {
        if(e)  setPreviousStep(e);
        generateRadomList();
        setCurrentStep(6);
    }

    const onSubmitConfirm = e => {
        setCurrentStep(3);
        getRandomFromList();
    }

    const onCancel = (val) => {
        setCurrentStep(!isNaN(val) ? val : previousStep);
        setPreviousStep(1);
    }

    const onOverride = e => {
        setTextAreaVal(buffer);
        setCurrentStep(1);
    }



    const onReset = val => {
        setCurrentStep(4);
        setPreviousStep(val);
    }

    const onResetConfirm = () => {
        setNumberOfStudent('');
        setTextAreaVal('');
        setCurrentStep(1);
        setPreviousStep(1);
        setOutput('');
        setBuffer('');
        setList([]);
    }

    const onChooseNext = e => {
        getRandomFromList();
    }

    const getRandomFromList = () => {
        const random = Math.floor(Math.random() * (list.length));
        if( inputStage == SYMBOLS) 
            setOutput( React.createElement(Symbols[list.splice(random, 1)]) );
        else
            setOutput(list.splice(random, 1));
        if (list.length == 0) {
            generateRadomList();
        }
        // console.log('list ', list, random);
    }

    const generateRadomList = () => {

        if (inputStage == NICKNAME) {
            let arr = textAreaVal.split("\n");
            _.without(arr, ['', ' ']);
            setNumberOfStudent(arr.length);
            setList(arr);
        } else if (inputStage == NUMBER) {
            let tempArr = [];
            for (let i = 0; i < numberOfStudent; i++) {
                tempArr.push(`${inputStage} ${i + 1}`);
            }
            setList(tempArr);
        } else if (inputStage == SYMBOLS){
            let tempArr = [];
            let keys = _.keys(Symbols);
            for (let i = 0; i < numberOfStudent; i++) {
                tempArr.push(keys[Math.floor(Math.random() * keys.length)] );
            }
            setList(tempArr);
        }
    }

    return (
        <Holder className={`${style.whoIsNext} ${popUpSteps.includes(currentStep) ? style.popUpBox : ''}  ${!inputStage ? style.firstStep : ''} ${currentStep === 6 ? style.printPreview : ''}`} onCompClick={onCompClick} onClose={onCloseClick}>
            {currentStep == 1 &&
                (<>
                    <div className={style.panel}>
                        <div className={style.step}>1</div>
                        <div className={style.title}>{t('whoisnext.chooseformat')}</div>
                        <div className={style.controls}>
                            <label>
                                <RadioButton name="step" id={NICKNAME} value={NICKNAME} onChange={onSelectStage} checked={inputStage == NICKNAME}></RadioButton>
                                <span className={style.label}>{t('whoisnext.nicknames')}</span>
                            </label>

                            <label>
                                <RadioButton name="step" id={NUMBER} value={NUMBER} onChange={onSelectStage} checked={inputStage == NUMBER}></RadioButton>
                                <span className={style.label}>{t('whoisnext.numbers')}</span>
                            </label>

                            <label>
                                <RadioButton name="step" id={SYMBOLS} value={SYMBOLS} onChange={onSelectStage} checked={inputStage == SYMBOLS}></RadioButton>
                                <span className={style.label}>{t('whoisnext.symbols')}</span>
                            </label>
                        </div>
                    </div>
                    <div className={`${style.panel} ${style.inputPanel}`}>
                        {inputStage &&
                            (<>
                                <div className={style.step}>2</div>
                                <div className={style.title}>{inputStage == NICKNAME ? t('whoisnext.enterorimportdata') : 'Enter data'}</div>

                                {inputStage == NICKNAME ? (
                                    <textarea className={style.textarea} onChange={e => onTextAreaChange(e)} value={textAreaVal}></textarea>) :
                                    (<>
                                        <label className={style.question}>{t('whoisnext.howmanystudent')}</label>
                                        <input type="text" className={style.input} onChange={onNumberInputChange} value={numberOfStudent}></input>
                                    </>)}
                                <div className={`${style.buttomWrapper} `}  >
                                    {inputStage == NICKNAME && (<label className={`${style.importButton} `}><input type="file" onChange={e => onBrowse(e)} />{t('whoisnext.import')}</label>)}
                                    <Button primary label={t('whoisnext.clear')} onClick={onClearClick} disabled={(!textAreaVal && inputStage == NICKNAME ) || (!numberOfStudent && inputStage != NICKNAME)}></Button>
                                    <Button primary label={t('whoisnext.print')} onClick={() => onPrintClick(1)} disabled={(!textAreaVal && inputStage == NICKNAME ) || (!numberOfStudent && inputStage != NICKNAME)}></Button>
                                    <Button primary label={t('whoisnext.submit')} onClick={onSubmitClick} disabled={(!textAreaVal && inputStage == NICKNAME ) || (!numberOfStudent && inputStage != NICKNAME)}></Button>
                                </div>
                            </>)}
                    </div>
                </>)}
            {
                currentStep == 2 && (
                    <>
                        <div className={style.subtitle}>Do you want me to give you a random student who is next now?</div>
                        <div className={style.actionWrapper}>
                            <Button primary label={t('whoisnext.yes')} onClick={onSubmitConfirm}></Button>
                            <Button primary label={t('whoisnext.cancel')} onClick={() => onCancel(1)}></Button>
                            <Button primary label={t('whoisnext.reset')} onClick={() => onReset(2)}></Button>
                        </div>
                    </>
                )
            }
            {
                currentStep == 3 && output && (
                    <>
                        <div className={style.subtitle}>{output}</div>
                        <div className={style.actionWrapper}>
                            <Button primary label={t('whoisnext.reset')} onClick={() => onReset(3)}></Button>
                            <Button primary label={t('whoisnext.print')} onClick={() => onPrintClick(3)}></Button>
                            <Button primary label={t('whoisnext.choosenext')} onClick={onChooseNext}></Button>
                        </div>
                    </>
                )
            }
            {
                currentStep == 4 && (
                    <>
                        <div className={style.subtitle}>Do you want to reset the information on your students you have entered?</div>
                        <div className={style.actionWrapper}>
                            <Button primary label={t('whoisnext.cancel')} onClick={onCancel}></Button>
                            <Button primary label={t('whoisnext.yes')} onClick={onResetConfirm}></Button>
                        </div>
                    </>
                )
            }
            {
                currentStep == 5 && (
                    <>
                        <div className={style.subtitle}>Do you want to override the nicknames you have entered?</div>
                        <div className={style.actionWrapper}>
                            <Button primary label={t('whoisnext.cancel')} onClick={onCancel}></Button>
                            <Button primary label={t('whoisnext.yes')} onClick={onOverride}></Button>
                        </div>
                    </>
                )
            }
            {
                currentStep == 6 && (
                    <div ref={componentRef}>
                        <div style={{
                            margin: "25px"
                        }}>{(new Date()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        <table className={style.table} style={{
                            borderCollapse: "collapse",
                            width: "calc(100% - 50px)",
                            background: "#e2ebf8",
                            color: "#9ea5ad",
                            margin: "25px"
                        }}>
                            <tr>
                                <th style={{
                                    paddingTop: "12px",
                                    paddingBottom: "12px",
                                    backgroundColor: "#a1bce6",
                                    color: "#000",
                                    border: "1px solid #aab0ba",
                                    padding: "8px",
                                    textAlign: "center"
                                }}>{inputStage}</th>
                                <th style={{
                                    paddingTop: "12px",
                                    paddingBottom: "12px",
                                    backgroundColor: "#a1bce6",
                                    color: "#000",
                                    border: "1px solid #aab0ba",
                                    padding: "8px",
                                    textAlign: "center"
                                }}>Real Names</th>
                            </tr>
                            {
                                list.map((item, index) =>
                                    <tr key={index}>
                                        <td style={{
                                            border: "1px solid #aab0ba",
                                            padding: "8px",
                                            textAlign: "center"
                                        }}>{ inputStage === SYMBOLS ? React.createElement(Symbols[item]) : item}</td>
                                        <td style={{
                                            border: "1px solid #aab0ba",
                                            padding: "8px",
                                            textAlign: "center"
                                        }}></td>
                                    </tr>
                                )
                            }
                        </table>
                    </div>
                )
            }
        </Holder>
    );
};

export default WhoIsNext;