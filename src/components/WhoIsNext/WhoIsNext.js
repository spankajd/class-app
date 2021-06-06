
import React, { useState } from 'react';
import Button from '../../elements/Button/Button';
import Holder from '../../elements/Holder/Holder';

import _ from "lodash";

import style from './WhoIsNext.module.scss';


const WhoIsNext = ({ onCompClick, onCompClose }) => {

    const [inputStage, setInputStage] = useState('');
    const [textAreaVal, setTextAreaVal] = useState('');
    const [numberOfStudent, setNumberOfStudent] = useState('');

    const [currentStep, setCurrentStep] = useState(1);
    const [output, setOutput] = useState('');

    const [list, setList] = useState([]);

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onSelectStage = e => {
        setInputStage(e.target.dataset.id);
    }

    const onBrowse = e => {
        var fr = new FileReader();
        fr.onload = function () {
            setTextAreaVal(fr.result);
        }
        fr.readAsText(e.target.files[0]);
    }

    const onTextAreaChange = e => {
        setTextAreaVal(e.target.value);
    }

    const onNumberInputChange = e => {
        setNumberOfStudent(e.target.value);
    }

    const onSubmitClick = e => {
        if (inputStage == 'nickname') {
            textAreaVal &&
                console.log('onSubmitClick ', textAreaVal.split("\n"));
            let arr = textAreaVal.split("\n");
            _.without(arr, ['', ' '])
            setList(arr);
        } else {
            generateRadomList();
        }

        setCurrentStep(2);
    }

    const onSubmitConfirm = e => {
        setCurrentStep(3);
        getRandomFromList();
    }

    const onCancel = e => {
        setCurrentStep(1);
    }

    const onChooseNext = e => {
        getRandomFromList();
    }

    const getRandomFromList = () => {
        const random = Math.floor(Math.random() * (list.length));
        setOutput(list.splice(random, 1));
        // console.log('list ', list, random);
    }

    const generateRadomList = () => {
        let tempArr = [];
        for (let i = 0; i < numberOfStudent; i++) {
            tempArr.push(`${inputStage} ${i + 1}`);
        }
        setList(tempArr);
    }

    return (
        <Holder className={`${style.whoIsNext}`} onCompClick={onCompClick} onClose={onCloseClick}>
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
                                        <Button label="Submit & Print"></Button>
                                    </div>
                                </div>
                            </>)}
                    </div>
                </>)}
            {
                currentStep == 2 && (
                    <>
                        <div>Do you want to reset the information on your students you have entered?</div>
                        <div>
                            <Button primary label="Yes" onClick={onSubmitConfirm}></Button>
                            <Button primary label="Cancel" onClick={onCancel}></Button>
                        </div>
                    </>
                )
            }
            {
                currentStep == 3 && output && (
                    <>
                        <div>{output}</div>
                        <div>
                            <Button primary label="Choose Next" onClick={onChooseNext}></Button>
                            <Button primary label="Reset Students" onClick={onCancel}></Button>
                        </div>
                    </>
                )
            }
        </Holder>
    );
};

export default WhoIsNext;