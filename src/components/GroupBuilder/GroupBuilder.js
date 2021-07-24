
import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Button from '../../elements/Button/Button';
import Holder from '../../elements/Holder/Holder';

import _ from "lodash";

import style from './GroupBuilder.module.scss';
import RadioButton from '../../elements/RadioButton/RadioButton';
import * as Symbols from "../../assets/symbols"; 

// Steps 
// 1. choose format
// 5  Import override (Yes - 2 / Cancel - 1)
// 2. Number of group input (  create group - 3 / Reset - 4)
// 3. Group Created ( create group - 3 / Reset - 4)
// 4. reset ( Yes - 1 / Cancel - 3)

const GroupBuilder = ({ onCompClick, onCompClose }) => {

    const popUpSteps = [3, 4, 5];
    const [inputStage, setInputStage] = useState('');
    const [textAreaVal, setTextAreaVal] = useState('');
    const [numberOfStudent, setNumberOfStudent] = useState('');
    const [numberOfGroup, setNumberOfGroup] = useState('');
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
            print();
        }
    }, [currentStep]);
    
    useEffect(() => {
        setOutput('');
    }, [numberOfGroup]);

    const print = useReactToPrint({
        content: () => componentRef.current
    })

    const handlePrint = () => {
        setCurrentStep(6);
    };

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onSelectStage = e => {
        setInputStage(e);
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

    const onNumberOfGroupInput = e => {
        let val = e.target.value;
        const re = /^[0-9\b]+$/;
        val = re.test(val) || val === '' ? val : numberOfGroup;
        val = val ? Math.min(Math.max(val, 1), numberOfStudent) : '';
        setNumberOfGroup(val);
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
        if (output) {
            setCurrentStep(3);
        } else {
            getRandomFromList();
        }
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
        setOutput('');
        setTextAreaVal('');
        setNumberOfStudent('');
        setNumberOfGroup('');
        setPreviousStep(1);
        setBuffer('');
        setList([]);
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
            tempOutPut["Group " + String.fromCharCode(65 + i)] = [];
        }
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < numberOfGroup; j++) {
                tempOutPut["Group " + String.fromCharCode(65 + j)].push(
                    tempList.splice(Math.floor(Math.random() * tempList.length), 1)
                );
            }
        }
        setOutput(tempOutPut);
    }

    const generateRadomList = () => {
        if (inputStage == 'nickname') {
            let arr = textAreaVal.split("\n");
            _.without(arr, ['', ' '])
            setNumberOfStudent(arr.length);
            setList(arr);
        } else if (inputStage == 'number') {
            let tempArr = [];
            for (let i = 0; i < numberOfStudent; i++) {
                tempArr.push(`${inputStage} ${i + 1}`);
            }
            setList(tempArr);
        } else if (inputStage == 'symbols'){
            let tempArr = [];
            let keys = _.keys(Symbols);
            for (let i = 0; i < numberOfStudent; i++) {
                tempArr.push(keys[Math.floor(Math.random() * keys.length)] );
            }
            setList(tempArr);
        }
    }

    const renderGroup = () => {
        let arr = [];

        for (var key in output) {
            let counter = 0;
            arr.push(
                <div key={'1_1_'+counter} className={style.groupCol}>
                    <div key={'1_'+counter} className={style.groupTitle}>{key}</div>
                    <ul className={style.groupData}>{output[key].map(element => element != '' && element != undefined && element != '\n' ? (<li key={counter++} className={`${style.groupDataItem} ${style.symbols}`}>{
                        inputStage == 'symbols' ? React.createElement(Symbols[element]) : element
                        }</li>) : '')}</ul>
                </div>
            )
        }

        return arr;
    }

    return (
        <Holder className={`${style.groupbuilder} ${popUpSteps.includes(currentStep) ? style.popUpBox : ''} ${!inputStage ? style.firstStep : ''} ${currentStep == 2 ? style.groupOutPut : ''}`} onCompClick={onCompClick} onClose={onCloseClick}>
            {currentStep == 1 &&
                (<>
                    <div className={style.panel}>
                        <div className={style.step}>1</div>
                        <div className={style.title}>Choose format</div>
                        <div className={style.controls}>
                            <label>
                                <RadioButton name="group_step" id="nickname" value="nickname" onChange={onSelectStage} checked={inputStage == 'nickname'}></RadioButton>
                                <span className={style.label}>Nickname</span>
                            </label>

                            <label>
                                <RadioButton name="group_step" id="number" value="number" onChange={onSelectStage} checked={inputStage == 'number'}></RadioButton>
                                <span className={style.label}>Numbers</span>
                            </label>

                            <label>
                                <RadioButton name="group_step" id="symbols" value="symbols" onChange={onSelectStage} checked={inputStage == 'symbols'}></RadioButton>
                                <span className={style.label}>Symbols</span>
                            </label>
                        </div>
                    </div>
                    <div className={`${style.panel} ${style.inputPanel}`}>
                        {inputStage &&
                            (<>
                                <span className={style.step}>2</span>
                                <div className={style.title}>{inputStage == 'nickname' ? 'Enter or import data' : 'Enter data'}</div>

                                {inputStage == 'nickname' ? (
                                    <textarea className={style.textarea} onChange={e => onTextAreaChange(e)} value={textAreaVal}></textarea>) :
                                    (<>
                                        <label className={style.question}> How many students in your class? </label>
                                        <input type="text" className={style.input} onChange={onNumberInputChange} value={numberOfStudent}></input>
                                    </>)}
                                <div className={`${style.buttomWrapper}`}>
                                    {inputStage == 'nickname' && (<label className={style.importButton}><input type="file" onChange={e => onBrowse(e)} />Import</label>)}
                                    <Button primary label="Clear" onClick={onClearClick} disabled={(!textAreaVal && inputStage == 'nickname' ) || (!numberOfStudent && inputStage != 'nickname')}></Button>
                                    <Button primary label="Print" onClick={() => onPrintClick(1)} disabled={(!textAreaVal && inputStage == 'nickname' ) || (!numberOfStudent && inputStage != 'nickname')}></Button>
                                    <Button primary label="Submit" onClick={onSubmitClick} disabled={(!textAreaVal && inputStage == 'nickname' ) || (!numberOfStudent && inputStage != 'nickname')}></Button>
                                </div>
                            </>)}
                    </div>
                </>)}
            {
                currentStep == 2 && (
                    <>
                        <div className={style.numberOfGroupWrapper}>
                            <div className={style.numberOfGroup}><label>Number of Groups</label> <input type="text" className={style.input} onChange={onNumberOfGroupInput} value={numberOfGroup}></input></div>
                            <div className={`${style.actionWrapper} ${!numberOfGroup && style.disabled}`}>
                                <Button primary label="Reset" onClick={() => onReset(2)} disabled={!numberOfGroup}></Button>
                                <Button primary label="Print" onClick={() => onPrintClick(2)} disabled={!numberOfGroup}></Button>
                                <Button primary label={output ? "Shuffle group" : "Create groups"} onClick={onSubmitConfirm} disabled={!numberOfGroup}></Button>
                                {/* {output && <Button label="Print" onClick={handlePrint}></Button>} */}
                            </div>
                        </div>
                        {output && (<div className={style.outputWrapper}>
                            {renderGroup()}
                        </div>)}
                    </>
                )
            }
            {
                currentStep == 3 && output && (
                    <>
                        <div className={style.subtitle}>Do you want to re-shuffle the group?</div>
                        <div className={style.actionWrapper}>
                            <Button primary label="Yes" onClick={onConfirmShuffle}></Button>
                            <Button primary label="Cancel" onClick={() => onCancel(2)}></Button>
                        </div>
                    </>
                )
            }
            {
                currentStep == 4 && (
                    <>
                        <div className={style.subtitle}>Do you want to reset the information on your students you have entered?</div>
                        <div className={style.actionWrapper}>
                            <Button primary label="Yes" onClick={onResetConfirm}></Button>
                            <Button primary label="Cancel" onClick={onCancel}></Button>
                        </div>
                    </>
                )
            }
            {
                currentStep == 5 && (
                    <>
                        <div className={style.subtitle}>Do you want to override the nicknames you have entered?</div>
                        <div className={style.actionWrapper}>
                            <Button primary label="Yes" onClick={onOverride}></Button>
                            <Button primary label="Cancel" onClick={onCancel}></Button>
                        </div>
                    </>
                )
            }
            {
                currentStep == 6 && (
                    <div ref={componentRef}>
                        {Object.keys(output).map(key =>
                            <div key={key} >
                                <div style={{
                                    margin: "25px"
                                }}>{(new Date()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                <h3 style={{
                                    margin: "25px"
                                }}>{key}</h3>
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
                                        output[key].map((element, index) => element != '' && element != undefined && element != '\n' ? (
                                            <tr key={`${key}_${index}`}>
                                                <td style={{
                                                    border: "1px solid #aab0ba",
                                                    padding: "8px",
                                                    textAlign: "center"
                                                }}>{inputStage == 'symbols' ? React.createElement(Symbols[element]) : element}</td>
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
                )
            }
        </Holder>
    );
};

export default GroupBuilder;