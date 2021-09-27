
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useReactToPrint } from 'react-to-print';
import Button from '../../elements/Button/Button';
import Holder from '../../elements/Holder/Holder';
import { Scrollbars } from 'react-custom-scrollbars';

import _ from "lodash";

import style from './GroupBuilder.module.scss';
import RadioButton from '../../elements/RadioButton/RadioButton';
import Symbols from "../../assets/symbols";
import Alert from '../../elements/Alert/Alert';
import { translate } from '../../helper';

// Steps 
// 1. choose format
// 5  Import override (Yes - 2 / Cancel - 1)
// 2. Number of group input (  create group - 3 / Reset - 4)
// 3. Group Created ( create group - 3 / Reset - 4)
// 4. reset ( Yes - 1 / Cancel - 3)

const NICKNAME = 'nickname';
const NUMBER = 'number';
const SYMBOLS = 'symbols';

const GroupBuilder = ({ lang, onCompClick, onCompClose}) => {
    const { t, i18n } = useTranslation();

    const popUpSteps = [2, 3, 4, 5];
    const helpForSteps = [1];
    const [inputStage, setInputStage] = useState('');
    const [tooltip, setTooltip] = useState(null);
    const [textAreaVal, setTextAreaVal] = useState('');
    const [numberOfStudent, setNumberOfStudent] = useState('');
    const [numberOfGroup, setNumberOfGroup] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [previousStep, setPreviousStep] = useState(1);
    const [output, setOutput] = useState('');
    const [buffer, setBuffer] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [list, setList] = useState([]);
    const [dragRestrictedArr, setDragRestrictedArr] = useState([]);
    const componentRef = useRef();
    const textAreaRef = useRef();

    useEffect(() => {
        const storedInputStage = localStorage.getItem('inputStage');
        const storedList = localStorage.getItem('list');
        const storedGroup = localStorage.getItem('group');
        const storedTextareaVal = localStorage.getItem('textarea');
        
        if(storedInputStage) {
            setInputStage(storedInputStage);
        }
        if(storedTextareaVal) {
            setTextAreaVal(storedTextareaVal);
        }
        if(storedList) {
            const tempArr = JSON.parse(storedList);
            setNumberOfStudent(tempArr.length);
            setList(tempArr);
            setCurrentStep(2);
        }
        if(storedGroup) {
            const tempArr = JSON.parse(storedGroup);
            setNumberOfGroup(Object.keys(tempArr).length);
            setTimeout(() => {
                setOutput({...tempArr});
            },10);
            
        }
    },[]);


    useEffect(() => {
        if (inputStage) {
            setTooltip(t('tooltip.whoisnext.step_2_' + inputStage));
        }
    }, [inputStage])

    useEffect(() => {
        if (currentStep === 1) {
            setTooltip(t('tooltip.whoisnext.step_1'));
            // setDragRestrictedArr([textAreaRef.current]);
            setDragRestrictedArr([style.textarea, style.input]);
        } else {
            setTooltip(null);
        }
    }, [currentStep]);

    useEffect(() => {
        if (output) {
            let tempOutPut = _.map(output, (item) => {
                return inputStage === NUMBER ? translate(item, t) : item;
            })
            let _counter = 0;
            tempOutPut = _.keyBy(tempOutPut, function (o) {
                return t("groupbuilder.group") + ' ' + String.fromCharCode(65 + (_counter++));
            });
            if (inputStage === NUMBER) {
                const tempList = translate(list, t);
                setList(tempList);
                localStorage.setItem('list',JSON.stringify(tempList));
            }
            setOutput(tempOutPut);
            localStorage.setItem('group', JSON.stringify(tempOutPut));
        }

    }, [lang]);

    useEffect(() => {
        if (output && currentStep == 2) {
            const classArr = [];
            // const matches = document.getElementsByClassName(style.groupCol)
            // for (var i = 0; i < matches.length; i++) {
            //     tempArr.push(matches[i]);
            // }
            classArr.push(document.getElementsByClassName(style.outputWrapper)[0])
            // setDragRestrictedArr(classArr);
            setDragRestrictedArr([style.outputWrapper, style.input]);

        }
    }, [output, currentStep]);

    useEffect(() => {
        setOutput('');
    }, [numberOfGroup]);

    useEffect(() => {
    }, [list]);

    const print = useReactToPrint({
        content: () => componentRef.current
    })

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onSelectStage = e => {
        setInputStage(e);
        setNumberOfStudent('');
        localStorage.setItem('inputStage',e);
    }

    const onBrowse = e => {
        var fr = new FileReader();
        fr.onload = function () {
            if (textAreaVal) {
                setCurrentStep(5);
                setBuffer(fr.result);
            } else {
                setTextAreaVal(fr.result);
                localStorage.setItem('textarea',fr.result);
            }
        }
        fr.readAsText(e.target.files[0]);
    }

    const onTextAreaChange = e => {
        setTextAreaVal(e.target.value);
        localStorage.setItem('textarea',e.target.value);
    }

    const onNumberInputChange = e => {
        let val = e.target.value;
        const re = /^[0-9\b]+$/;
        val = re.test(val) || val === '' ? val : numberOfStudent;
        val = val ? Math.min(Math.max(val, 1), 32) : '';
        setNumberOfStudent(val);
    }

    const onNumberOfGroupInput = e => {
        let val = e.target.value;
        const re = /^[0-9\b]+$/;
        val = re.test(val) || val === '' ? val : numberOfGroup;
        val = val ? Math.min(Math.max(val, 1), Math.floor(numberOfStudent / 2)) : '';
        setNumberOfGroup(val);
    }
    const onClearClick = e => {
        setTextAreaVal('');
        setNumberOfStudent('');
        localStorage.removeItem('textarea');
    }
    const onSubmitClick = e => {
        generateRadomList();
        setCurrentStep(2);
    }

    const onPrintClick = e => {
        // if (e) setPreviousStep(e);
        generateRadomList();
        // setCurrentStep(6);
        setTimeout(() => { print(); }, 100);
    }

    const onSubmitConfirm = e => {
        // if (output) {
        //     setCurrentStep(3);
        // } else {
        //     getRandomFromList();
        // }
        getRandomFromList();
    }

    const onCancel = (val) => {
        setCurrentStep(!isNaN(val) ? val : previousStep);
        setPreviousStep(1);
    }

    const onOverride = e => {
        setTextAreaVal(buffer);
        setCurrentStep(1);
        localStorage.setItem('textarea',buffer);
    }



    const onReset = val => {
        // setCurrentStep(4);
        // setPreviousStep(val);
        setAlertMsg(t('whoisnext.resetWarning'));
    }

    const onResetConfirm = () => {
        setNumberOfStudent('');
        setTextAreaVal('');
        setCurrentStep(1);
        setOutput('');
        setNumberOfGroup('');
        setPreviousStep(1);
        setBuffer('');
        setAlertMsg('');
        setList([]);
        localStorage.removeItem('group');
        localStorage.removeItem('list');
        localStorage.removeItem('inputStage');
        localStorage.removeItem('textarea');
    }

    const onConfirmShuffle = e => {
        getRandomFromList();
        setCurrentStep(2);
    }

    const getRandomFromList = () => {
        const random = Math.floor(Math.random() * (list.length));
        var size = Math.ceil(list.length / numberOfGroup);
        var tempOutPut = {};
        var tempList = list.slice(0);
        for (let i = 0; i < numberOfGroup; i++) {
            tempOutPut[t("groupbuilder.group") + ' ' + String.fromCharCode(65 + i)] = [];
        }
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < numberOfGroup; j++) {
                tempOutPut[t("groupbuilder.group") + ' ' + String.fromCharCode(65 + j)].push(
                    tempList.splice(Math.floor(Math.random() * tempList.length), 1)[0]
                );
            }
        }
        setOutput(tempOutPut);
        localStorage.setItem('group', JSON.stringify(tempOutPut));
    }

    const generateRadomList = () => {
        let tempArr = [];
        if (inputStage == NICKNAME) {
            tempArr = textAreaVal.split("\n");
            tempArr = tempArr.filter(i => i.trim() != '');
            _.without(tempArr, ['', ' ', '\n']);
            setNumberOfStudent(tempArr.length);
        } else if (inputStage == NUMBER) {
            for (let i = 0; i < numberOfStudent; i++) {
                tempArr.push(`${t('whoisnext.number')} ${i + 1}`);
            }
        } else if (inputStage == SYMBOLS) {
            // let keys = _.shuffle(_.keys(Symbols));
            let keys = _.keys(Symbols);
            for (let i = 0; i < numberOfStudent; i++) {
                tempArr.push(keys[i]);
            }
        }
        setList(tempArr);
        localStorage.setItem('list',JSON.stringify(tempArr));
    }

    const onScrollStartWrapper = (a, b, c, d) => {

        // a.stopPropagation()
    }

    const renderGroup = () => {
        let arr = [];
        for (var key in output) {
            let counter = 0;
            let keyFactor = counter + Math.random();
            arr.push(
                <div key={'1_1_' + keyFactor} className={style.groupCol}>
                    <div key={'1_' + keyFactor} className={style.groupTitle}>{key}</div>
                    {/* <Scrollbars
                        autoHeight
                        autoHide
                        autoHeightMin={100}
                        autoHeightMax={200}
                    > */}

                        <ul className={style.groupData}>{output[key].map(element => element != '' && element != undefined && element != '\n' ? (<li key={counter++} className={`${style.groupDataItem} ${style.symbols}`}>{
                            inputStage == SYMBOLS ? <img src={Symbols[element]} /> : element
                        }</li>) : '')}</ul>

                    {/* </Scrollbars> */}
                </div>
            )
        }

        return arr;
    }

    const onAlertClose = () => {
        setAlertMsg('');
    }

    return (
        <>
            <Holder
                help={helpForSteps.includes(currentStep) ? tooltip : false}
                resizable={!popUpSteps.includes(currentStep)}
                className={`${style.groupbuilder}
                        ${popUpSteps.includes(currentStep) ? style.popUpBox : ''}
                        ${!inputStage ? style.firstStep : ''}
                        ${currentStep === 1 && inputStage ? style.secondStep : ''}
                        ${currentStep === 3 ? style.outputWrapper : ''}
                        ${currentStep == 2 ? style.groupOutPut : ''}`}
                onCompClick={onCompClick}
                onClose={onCloseClick}
                nodesNotAllowToDrag={dragRestrictedArr}>

                {currentStep == 1 &&
                    (<>
                        <div className={`${style.panel} ${style.controlPanel}`}>
                            <div className={style.step}>1</div>
                            <div className={style.title}>{t('whoisnext.chooseformat')}</div>
                            <div className={style.controls}>
                                <label>
                                    <RadioButton name="group_step" id={NICKNAME} value={NICKNAME} onChange={onSelectStage} checked={inputStage == NICKNAME}></RadioButton>
                                    <span className={style.label}>{t('whoisnext.nickname')}</span>
                                </label>

                                <label>
                                    <RadioButton name="group_step" id={NUMBER} value={NUMBER} onChange={onSelectStage} checked={inputStage == NUMBER}></RadioButton>
                                    <span className={style.label}>{t('whoisnext.numbers')}</span>
                                </label>

                                <label>
                                    <RadioButton name="group_step" id={SYMBOLS} value={SYMBOLS} onChange={onSelectStage} checked={inputStage == SYMBOLS}></RadioButton>
                                    <span className={style.label}>{t('whoisnext.symbols')}</span>
                                </label>
                            </div>
                        </div>
                        <div className={`${style.panel} ${style.inputPanel}`}>
                            {inputStage &&
                                (<>
                                    <span className={style.step}>2</span>
                                    <div className={style.title}>{inputStage == NICKNAME ? t('whoisnext.enterorimportdata') : t('whoisnext.enterdata')}</div>

                                    {inputStage == NICKNAME ? (
                                        <textarea className={style.textarea} onChange={e => onTextAreaChange(e)} value={textAreaVal} ref={textAreaRef}></textarea>) :
                                        (<>
                                            <label className={style.question}>{t('whoisnext.howmanystudent')}</label>
                                            <input type="text" className={style.input} onChange={onNumberInputChange} value={numberOfStudent}></input>
                                        </>)}
                                    <div className={`${style.buttomWrapper}`}>
                                        {inputStage == NICKNAME && (<label className={style.importButton}><input type="file" onChange={e => onBrowse(e)} />{t('whoisnext.import')}</label>)}
                                        {/* <Button primary label={t('whoisnext.clear')} onClick={onClearClick} disabled={(!textAreaVal && inputStage == NICKNAME ) || (!numberOfStudent && inputStage != NICKNAME)}></Button> */}
                                        {/* <Button label={t('whoisnext.print')} onClick={() => onPrintClick(1)} disabled={(!textAreaVal.trim() && inputStage == NICKNAME) || (!numberOfStudent && inputStage != NICKNAME)}></Button> */}
                                        <Button primary label={t('whoisnext.submit')} onClick={onSubmitClick} disabled={(!textAreaVal.trim() && inputStage == NICKNAME) || (!numberOfStudent && inputStage != NICKNAME)}></Button>
                                    </div>
                                </>)}
                        </div>
                    </>)}
                {
                    currentStep == 2 && (
                        <>
                            <div className={style.numberOfGroupWrapper}>
                                <div className={style.numberOfGroup}><label>{t('groupbuilder.numberofgroups')}</label> <input type="text" className={style.input} onChange={onNumberOfGroupInput} value={numberOfGroup}></input></div>
                                <div className={`${style.actionWrapper} ${!numberOfGroup && style.disabled}`}>
                                    <Button label={t('whoisnext.reset')} onClick={() => onReset(2)} disabled={!numberOfGroup}></Button>
                                    {output && <Button label={t('whoisnext.print')} onClick={() => onPrintClick(2)} disabled={!numberOfGroup}></Button>}
                                    <Button primary label={output ? t('groupbuilder.shufflegroups') : t('groupbuilder.creategroups')} onClick={onSubmitConfirm} disabled={!numberOfGroup}></Button>
                                </div>
                            </div>
                            {output && (
                                <Scrollbars
                                    autoHeight
                                    autoHide
                                    autoHeightMin={100}
                                    autoHeightMax={450}
                                    onMouseDown={onScrollStartWrapper}
                                    onTouchStart={onScrollStartWrapper}
                                ><div className={`${style.outputWrapper} ${numberOfGroup > 1 ? style.multipleGroups : ''}`}>
                                        {renderGroup()}
                                    </div>
                                </Scrollbars>)}
                        </>
                    )
                }
                {
                    currentStep == 3 && output && (
                        <>
                            <div className={style.alertText}>{t('groupbuilder.shufflegroupsWarning')}</div>
                            <div className={style.actionWrapper}>
                                <Button label={t('whoisnext.cancel')} onClick={() => onCancel(2)}></Button>
                                <Button primary label={t('whoisnext.yes')} onClick={onConfirmShuffle}></Button>
                            </div>
                        </>
                    )
                }
                {
                    currentStep == 4 && (
                        <>
                            <div className={style.alertText}>{t('whoisnext.resetWarning')}</div>
                            <div className={style.actionWrapper}>
                                <Button primary label={t('whoisnext.yes')} onClick={onResetConfirm}></Button>
                                <Button label={t('whoisnext.cancel')} onClick={onCancel}></Button>
                            </div>
                        </>
                    )
                }
                {
                    currentStep == 5 && (
                        <>
                            <div className={style.alertText}>Do you want to override the nicknames you have entered?</div>
                            <div className={style.actionWrapper}>
                                <Button primary label={t('whoisnext.yes')} onClick={onOverride}></Button>
                                <Button label={t('whoisnext.cancel')} onClick={onCancel}></Button>
                            </div>
                        </>
                    )
                }
                {
                    // currentStep == 6 && (
                    <div className={style.printWrapper}>
                        <div ref={componentRef}>
                            <div style={{
                                margin: "25px"
                            }}>{(new Date()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>

                            {Object.keys(output).map(key =>
                                <div key={key} style={{

                                    pageBreakInside: "avoid",
                                    pageBreakAfter: "auto"
                                }}>
                                    <h3 style={{
                                        margin: "25px"
                                    }}>{key}</h3>
                                    <table className={style.table} style={{
                                        borderCollapse: "collapse",
                                        width: "calc(100% - 50px)",
                                        background: "#e2ebf8",
                                        color: "#9ea5ad",
                                        margin: "25px",
                                        pageBreakInside: "avoid",
                                        pageBreakAfter: "auto"
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
                                            }}>{t(`whoisnext.${inputStage}`)}</th>
                                            <th style={{
                                                paddingTop: "12px",
                                                paddingBottom: "12px",
                                                backgroundColor: "#a1bce6",
                                                color: "#000",
                                                border: "1px solid #aab0ba",
                                                padding: "8px",
                                                textAlign: "center"
                                            }}>{t('whoisnext.tableHeaderRealName')}</th>
                                        </tr>
                                        {
                                            output[key].map((element, index) => element != '' && element != undefined && element != '\n' ? (
                                                <tr key={`${key}_${index}`}>
                                                    <td style={{
                                                        border: "1px solid #aab0ba",
                                                        padding: "8px",
                                                        textAlign: "center"
                                                    }}>{inputStage == SYMBOLS ? <img src={Symbols[element]} /> : element}</td>
                                                    <td style={{
                                                        border: "1px solid #aab0ba",
                                                        padding: "8px",
                                                        textAlign: "center"
                                                    }}></td>
                                                </tr>
                                            ) : ''
                                            )
                                        }
                                    </table>
                                </div>
                            )
                            }
                        </div>
                    </div>
                    // )
                }
            </Holder>
            <Alert msg={alertMsg} confirmLabel={t('whoisnext.yes')} onConfirm={onResetConfirm} onClose={onAlertClose} />
        </>
    );
};

const s2p = state => ({
    lang: state.lang
});
export default connect(s2p, null)(GroupBuilder);