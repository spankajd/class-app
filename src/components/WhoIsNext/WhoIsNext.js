import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReactToPrint } from 'react-to-print';
import Button from '../../elements/Button/Button';
import Holder from '../../elements/Holder/Holder';
import { Scrollbars } from 'react-custom-scrollbars';

import _ from "lodash";

import style from './WhoIsNext.module.scss';
import RadioButton from '../../elements/RadioButton/RadioButton';
import Symbols from "../../assets/symbols";
import Alert from '../../elements/Alert/Alert';


// Steps 
// 1. choose format
// 5 Import override (Yes - 2 / Cancel - 1)
// 2. confirmation for random output ( Yes - 3 / Reset - 4)
// 3. next random ( Yes - 3 / Reset - 4)
// 4. reset ( Yes - 1 / Cancel - 4)

const NICKNAME = 'nickname';
const NUMBER = 'number';
const SYMBOLS = 'symbols';
const MAXLIMIT = 32;

const WhoIsNext = ({ onCompClick, onCompClose, onRandomStudentUpdate, sharedList, sharedInputStage }) => {

    const { t, i18n } = useTranslation();
    const popUpSteps = [2, 4, 5];
    const helpForSteps = [1];
    const [inputStage, setInputStage] = useState('');
    const [tooltip, setTooltip] = useState(null);
    const [textAreaVal, setTextAreaVal] = useState('');
    const [numberOfStudent, setNumberOfStudent] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [previousStep, setPreviousStep] = useState(1);
    const [output, setOutput] = useState('');
    const [buffer, setBuffer] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [list, setList] = useState([]);
    const componentRef = useRef();


    // useEffect(() => {
    //     Symbols = _.shuffle(Symbols);
    // }, [Symbols]);

    useEffect(() => {
        if (sharedList.length > 0) {
            setInputStage(sharedInputStage);
            setList(sharedList);
            setTextAreaVal(sharedList.join('\n'));
            setNumberOfStudent(sharedList.length);
            onSubmitClick();
        }
    }, [sharedList]);

    useEffect(() => {
        if(inputStage) {
            setTooltip(t('tooltip.whoisnext.step_2_' + inputStage));
        }
    },[inputStage])

    useEffect(() => {
        if (currentStep === 1) {
            setTooltip(t('tooltip.whoisnext.step_1'));
        } else {
            setTooltip(null);
        }
        if (currentStep === 3) {
            getRandomFromList();
        } else if (currentStep === 6) {
            // setTimeout(() => {
            //     setCurrentStep(previousStep);
            // }, 500);
            // handlePrint();
        }
    }, [currentStep]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onSelectStage = id => {
        setInputStage(id);
        onRandomStudentUpdate({
            type: 'inputStage',
            data: id
        });
    }

    const onBrowse = e => {
        var fr = new FileReader();
        fr.onload = function () {
            // if (textAreaVal) {
            //     setCurrentStep(5);
            //     setBuffer(fr.result);
            // } else {
            //     setTextAreaVal(fr.result);
            // }
            setTextAreaVal(fr.result);
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
        val = val ? Math.min(Math.max(val, 1), MAXLIMIT) : '';
        setNumberOfStudent(val);
    }

    const onClearClick = e => {
        setTextAreaVal('');
        setNumberOfStudent('');
    }

    const onSubmitClick = e => {
        generateRadomList();
        // setCurrentStep(2);
        onSubmitConfirm();
    }

    const onPrintClick = e => {
        // if (e) setPreviousStep(e);
        generateRadomList();
        // setCurrentStep(6);
        setTimeout(() => { handlePrint(); }, 100);
    }

    const onSubmitConfirm = e => {
        setCurrentStep(3);
        // getRandomFromList();
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
        // setCurrentStep(4);
        // setPreviousStep(val);
        // onResetConfirm();
        setAlertMsg(t('whoisnext.resetWarning'));
    }

    const onResetConfirm = () => {
        setNumberOfStudent('');
        setTextAreaVal('');
        setCurrentStep(1);
        setPreviousStep(1);
        setOutput('');
        setBuffer('');
        setAlertMsg('');
        setList([]);
    }

    const onChooseNext = e => {
        getRandomFromList();
    }

    const getRandomFromList = () => {
        const random = Math.floor(Math.random() * (list.length));
        if (inputStage == SYMBOLS)
            setOutput(<img src={Symbols[list.splice(random, 1)]} />);
        else
            setOutput(list.splice(random, 1));
        if (list.length == 0) {
            generateRadomList();
        }
    }

    const generateRadomList = () => {
        let tempArr = [];
        if (inputStage == NICKNAME) {
            tempArr = textAreaVal.split("\n");
            tempArr = tempArr.filter(i => i.trim() != '');
            _.without(tempArr, ['', ' ', '\n']);
            setNumberOfStudent(tempArr.length);
            setList(tempArr);
        } else if (inputStage == NUMBER) {
            for (let i = 0; i < numberOfStudent; i++) {
                tempArr.push(`${inputStage} ${i + 1}`);
            }
            setList(tempArr);
        } else if (inputStage == SYMBOLS) {

            // let keys = _.shuffle(_.keys(Symbols));
            let keys = _.keys(Symbols);
            for (let i = 0; i < numberOfStudent; i++) {
                tempArr.push(keys[i]);
            }
            setList(tempArr);
        }
        onRandomStudentUpdate({
            type: 'list',
            data: tempArr.slice(0)
        });
    }

    const onAlertClose = () => {
        setAlertMsg('');
    }

    return (
        <>
            <Holder help={helpForSteps.includes(currentStep) ? tooltip : false}
                className={`${style.whoIsNext}
                        ${popUpSteps.includes(currentStep) ? style.popUpBox : ''}
                        ${!inputStage ? style.firstStep : ''}
                        ${currentStep === 1 && inputStage ? style.secondStep : ''}
                        ${currentStep === 3 ? style.outputWrapper : ''}
                        ${currentStep === 6 ? style.printPreview : ''}`}
                onCompClick={onCompClick}
                onClose={onCloseClick}>

                {currentStep == 1 &&
                    (<>
                        <div className={`${style.panel} ${style.controlPanel}`}>
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
                                        // <Scrollbars style={{ width: 300, height: 176 }}>
                                        <textarea className={style.textarea} onChange={e => onTextAreaChange(e)} value={textAreaVal}></textarea>
                                        // </Scrollbars>
                                    ) :
                                        (<>
                                            <label className={style.question}>{t('whoisnext.howmanystudent')}</label>
                                            <input type="text" className={style.input} onChange={onNumberInputChange} value={numberOfStudent}></input>
                                        </>)}
                                    <div className={`${style.buttomWrapper} `}  >
                                        {inputStage == NICKNAME && (<label className={`${style.importButton} `}><input type="file" onChange={e => onBrowse(e)} />{t('whoisnext.import')}</label>)}
                                        {/* <Button primary label={t('whoisnext.clear')} onClick={onClearClick} disabled={(!textAreaVal && inputStage == NICKNAME ) || (!numberOfStudent && inputStage != NICKNAME)}></Button> */}
                                        <Button label={t('whoisnext.print')} onClick={() => onPrintClick(1)} disabled={(!textAreaVal && inputStage == NICKNAME) || (!numberOfStudent && inputStage != NICKNAME)}></Button>
                                        <Button primary label={t('whoisnext.submit')} onClick={onSubmitClick} disabled={(!textAreaVal && inputStage == NICKNAME) || (!numberOfStudent && inputStage != NICKNAME)}></Button>
                                    </div>
                                </>)}
                        </div>
                    </>)}
                {
                    currentStep == 2 && (
                        <>
                            <div className={style.alertText}>Do you want me to give you a random student who is next now?</div>
                            <div className={style.actionWrapper}>
                                <Button primary label={t('whoisnext.yes')} onClick={onSubmitConfirm}></Button>
                                <Button label={t('whoisnext.cancel')} onClick={() => onCancel(1)}></Button>
                                <Button label={t('whoisnext.reset')} onClick={() => onReset(2)}></Button>
                            </div>
                        </>
                    )
                }
                {
                    currentStep == 3 && output && (
                        <>
                            <div className={`${style.subtitle} ${style.output}`}>{output}</div>
                            <div className={style.actionWrapper}>
                                <Button label={t('whoisnext.reset')} onClick={() => onReset(3)}></Button>
                                <Button label={t('whoisnext.print')} onClick={() => onPrintClick(3)}></Button>
                                <Button primary label={t('whoisnext.choosenext')} onClick={onChooseNext}></Button>
                            </div>
                        </>
                    )
                }
                {
                    currentStep == 4 && (
                        <>
                            <div className={style.alertText}>{t('whoisnext.resetWarning')}</div>
                            <div className={style.actionWrapper}>
                                <Button label={t('whoisnext.cancel')} onClick={onCancel}></Button>
                                <Button primary label={t('whoisnext.yes')} onClick={onResetConfirm}></Button>
                            </div>
                        </>
                    )
                }
                {
                    currentStep == 5 && (
                        <>
                            <div className={style.alertText}>Do you want to override the nicknames you have entered?</div>
                            <div className={style.actionWrapper}>
                                <Button label={t('whoisnext.cancel')} onClick={onCancel}></Button>
                                <Button primary label={t('whoisnext.yes')} onClick={onOverride}></Button>
                            </div>
                        </>
                    )
                }

            </Holder>
            <Alert msg={alertMsg} confirmLabel={t('whoisnext.yes')} onConfirm={onResetConfirm} onClose={onAlertClose} />
            {
                // currentStep == 6 && (
                <div className={style.printWrapper}>
                    <div ref={componentRef} style={{
                        pageBreakInside: "auto",
                        margin: "25px"
                    }}>
                        <div style={{
                            pageBreakInside: "auto",
                            margin: "25px"
                        }}>{(new Date()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        <table style={{
                            borderCollapse: "collapse",
                            width: "calc(100% - 50px)",
                            background: "#e2ebf8",
                            color: "#9ea5ad",
                            margin: "25px",
                            pageBreakInside: "auto",
                        }}>

                            <thead style={{
                                display: "table-header-group"
                            }}>
                                <tr style={{
                                    pageBreakInside: "avoid",
                                    pageBreakAfter: "auto"
                                }}>
                                    <th style={{
                                        backgroundColor: "#a1bce6",
                                        color: "#000",
                                        border: "1px solid #aab0ba",
                                        padding: "12px 8px",
                                        textAlign: "center"
                                    }}>{t(`whoisnext.${inputStage}`)}</th>
                                    <th style={{
                                        backgroundColor: "#a1bce6",
                                        color: "#000",
                                        border: "1px solid #aab0ba",
                                        padding: "12px 8px",
                                        textAlign: "center"
                                    }}>{t('whoisnext.tableHeaderRealName')}</th>
                                </tr>
                            </thead>
                            <tbody style={{
                                pageBreakInside: "auto",
                                pageBreakAfter: "auto",
                            }}>
                                {
                                    list.map((item, index) =>
                                        <>
                                            {/* <tr className={'page-break'}></tr> */}
                                            <tr key={index}
                                                style={{
                                                    pageBreakInside: "avoid",
                                                    pageBreakAfter: "auto",
                                                    fontSize: '13px'
                                                }}
                                                className={index % 10 == 0 ? style.tableBreak : style.tableRow}
                                            >
                                                <td style={{
                                                    border: "1px solid #aab0ba",
                                                    padding: "8px",
                                                    textAlign: "center"
                                                }}>{inputStage === SYMBOLS ? <img src={Symbols[item]} /> : item}</td>
                                                <td style={{
                                                    border: "1px solid #aab0ba",
                                                    padding: "8px",
                                                    textAlign: "center"
                                                }}></td>
                                            </tr>
                                        </>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                // )
            }
        </>
    );
};

export default WhoIsNext;