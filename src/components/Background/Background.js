
import React from 'react';
import Holder from '../../elements/Holder/Holder';

import Reel from '../../elements/Reel/Reel';

import style from './Background.module.scss';
import ColorPicker from '../ColorPicker/ColorPicker';
import ImageGallary from '../ImageGallary/ImageGallary';

const Background = ({ onCompClick, onCompClose, dataset, onChange }) => {

    const onCloseClick = e => {
        onCompClose(e);
    }

    const onColorChoose = color => {
        onChange({
            type: 'color',
            data: color
        });
    }

    const onImageChoose = data => {
        onChange(data);
    }

    return (
        <Holder className={`${style.background}`} activeClassName={style.active} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={`${style.panel} ${style.leftPanel}`}>
                <ImageGallary dataset={dataset} onSelect={onImageChoose} />
            </div>
            <div className={`${style.panel} ${style.rightPanel}`}>
                <ColorPicker onChange={onColorChoose} />
            </div>
        </Holder>
    );
};

export default Background;