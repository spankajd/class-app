
import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import QRCode from 'qrcode.react';

import Holder from '../../elements/Holder/Holder';

import style from './QRcode.module.scss';
import Button from '../../elements/Button/Button';


const QRcode = ({ onCompClick, onCompClose, count }) => {
    const placeHolder = "https://www.klett-sprachen.de/";
    const [inputVal, setInputVal] = useState("");
    const [qrInput, setQrInput] = useState(placeHolder);
    const componentRef = useRef();

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onInputChange = e => {
        const val = e.target.value;
        setInputVal(val);
        setQrInput(val ? val : placeHolder);
    }

    const print = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <Holder className={style.qrcode} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={style.title}>Title {count}</div>
            <div className={style.subtitle}>If you find a website of interest, please insert the URL here. QR code will be generated for your students to scan.</div>
            <input className={style.input} type="text" placeholder={placeHolder} value={inputVal} onChange={onInputChange}></input>
            <div className={style.qrContainer} ref={componentRef}>
                <QRCode value={qrInput} renderAs="svg"></QRCode>
            </div>
            <Button primary label="Print" onClick={print} />
        </Holder>
    );
};

export default QRcode;