
import React from 'react';
import Holder from '../../elements/Holder/Holder';

import Reel from '../../elements/Reel/Reel';

import style from './Background.module.scss';


const Background = ({ onCompClick, onCompClose }) => {
    
    const onCloseClick = e => {
        onCompClose(e);
    }

    return (
        <Holder className={`${style.background}`} onCompClick={onCompClick} onClose={onCloseClick}>
            <Reel label="Seasonal images"/>
            <Reel label="Topics of interest"/>
            <Reel label="Nice things"/>
        </Holder>
    );
};

export default Background;