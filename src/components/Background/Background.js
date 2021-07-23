
import React from 'react';
import Holder from '../../elements/Holder/Holder';

import Reel from '../../elements/Reel/Reel';

import style from './Background.module.scss';
import ColorPicker from '../ColorPicker/ColorPicker';

const Background = ({ onCompClick, onCompClose, dataset, onChange }) => {

    const onCloseClick = e => {
        onCompClose(e);
    }

    return (
        <Holder className={`${style.background}`} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={`${style.panel} ${style.leftPanel}`}></div>
            <div className={`${style.panel} ${style.rightPanel}`}>
                <ColorPicker/>
            </div>
        </Holder>
    );
};

export default Background;