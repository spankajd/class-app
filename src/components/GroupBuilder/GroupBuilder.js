
import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Button from '../../elements/Button/Button';
import Holder from '../../elements/Holder/Holder';

import _ from "lodash";

import style from './GroupBuilder.module.scss';


// Steps 
// 1. choose format
// 5  Import override (Yes - 2 / Cancel - 1)
// 2. Number of group input (  create group - 3 / Reset - 4)
// 3. Group Created ( create group - 3 / Reset - 4)
// 4. reset ( Yes - 1 / Cancel - 3)

const GroupBuilder = ({ onCompClick, onCompClose }) => {

    const popUpSteps = [2, 3, 4, 5];
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
        setInputStage(e.target.dataset.id);
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
        val = val ? Math.min(Math.max(val, 1), 5) : '';
        setNumberOfGroup(val);
    }

    const onSubmitClick = e => {
        generateRadomList();
        setCurrentStep(2);
    }

    const onPrintClick = e => {
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
        console.log('size ', size);
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
            setList(arr);
        } else {
            let tempArr = [];
            for (let i = 0; i < numberOfStudent; i++) {
                tempArr.push(`${inputStage} ${i + 1}`);
            }
            setList(tempArr);
        }
    }

    const renderGroup = () => {
        let arr = [];

        for (var key in output) {
            arr.push(
                <div className={style.groupCol}>
                    <div className={style.groupTitle}>{key}</div>
                    <ol className={style.groupData}>{output[key].map(element => element != '' && element != undefined && element != '\n' ? (<li className={style.groupDataItem}>{element}</li>) : '')}</ol>
                </div>
            )
        }

        return arr;
    }

    return (
        <Holder className={`${style.groupbuilder} ${popUpSteps.includes(currentStep) ? style.popUpBox : ''}`} onCompClick={onCompClick} onClose={onCloseClick}>
            {currentStep == 1 &&
                (<>
                    <div className={style.panel}>
                        <span className={style.step}>1</span>
                        <div className={style.title}>Choose format</div>
                        <div className={style.controls}>
                            <Button primary={true} onClick={onSelectStage} className={`${style.stageButton} ${!inputStage || inputStage == 'nickname' ? style.selected : ''}`} label="Nickname" data-id="nickname"></Button>
                            <Button primary={true} onClick={onSelectStage} className={`${style.stageButton} ${!inputStage || inputStage == 'number' ? style.selected : ''}`} label="Number" data-id="number"></Button>
                            <Button primary={true} onClick={onSelectStage} className={`${style.stageButton} ${!inputStage || inputStage == 'symbols' ? style.selected : ''}`} label="Symbols" data-id="symbols"></Button>
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
                                        <label> How many students in your class? </label>
                                        <input type="text" className={style.input} onChange={onNumberInputChange} value={numberOfStudent}></input>
                                    </>)}
                                <div className={style.buttomWrapper}>
                                    {inputStage == 'nickname' && (<label className={style.importButton}><input type="file" onChange={e => onBrowse(e)} />Import</label>)}
                                    <div className={style.submitWrapper}>
                                        <Button label="Submit" onClick={onSubmitClick}></Button>
                                    </div>
                                </div>
                            </>)}
                    </div>
                </>)}
            {
                currentStep == 2 && (
                    <>
                        <div><label>Number of Groups</label> <input type="text" className={style.input} onChange={onNumberOfGroupInput} value={numberOfGroup}></input></div>
                        <div className={`${style.actionWrapper} ${!numberOfGroup && style.disabled}`}>
                            <Button primary label="Create Groups" onClick={onSubmitConfirm}></Button>
                            <Button primary label="Cancel" onClick={() => onCancel(1)}></Button>
                            <Button primary label="Reset students" onClick={() => onReset(2)}></Button>
                            {output && <Button label="Print" onClick={handlePrint}></Button>}
                        </div>
                        <div className={style.outputWrapper}>
                            {output && renderGroup()}
                        </div>
                    </>
                )
            }
            {
                currentStep == 3 && output && (
                    <>
                        <div>Do you want to re-shuffle the group?</div>
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
                        <div>Do you want to reset the information on your students you have entered?</div>
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
                        <div>Do you want to override the nicknames you have entered?</div>
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
                                                }}>{element}</td>
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