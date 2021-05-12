
import React, { useState } from 'react';
import QRCode from 'qrcode.react';

import Holder from '../../elements/Holder/Holder';

import style from './QRcode.module.scss';
import Button from '../../elements/Button/Button';


const QRcode = ({ onCompClick, onCompClose }) => {
    const placeHolder = "https://yoursite.com";
    const [inputVal, setInputVal] = useState("");
    const [qrInput, setQrInput] = useState(placeHolder);

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onInputChange = e => {
        const val = e.target.value;
        setInputVal(val);
        setQrInput(val ? val : placeHolder);
    }

    return (
        <Holder className={style.qrcode} onCompClick={onCompClick} onClose={onCloseClick}>

            <div className={style.title}>If you find a website of interest, please insert the URL here. QR code will be generated for your students to scan.</div>
            <input className={style.input} type="text" placeholder={placeHolder} value={inputVal} onChange={onInputChange}></input>
            <QRCode value={qrInput} renderAs="svg"></QRCode>
        </Holder>
    );
};

export default QRcode;