
import React from 'react';

import Button from '../../elements/Button/Button';
import Holder from '../../elements/Holder/Holder';
import Tile from '../../elements/Tile/Tile';

import style from './Symbols.module.scss';

/**
 * Primary UI component for user interaction
 */
const Symbols = ({ }) => {


    const onCloseClick = (e) => {
        console.log('onCloseClick ' , e);
    }

    return (
        <Holder className={style.symbols}>
            <Button className={style.closeButton} label="X" icon="close" onClick={onCloseClick}></Button>
            <div className={style.symbolsRow}>
                <Tile label="Individual Work"></Tile>
                <Tile label="Silence"></Tile>
                <Tile label="Teacher up front"></Tile>
            </div>
            <div  className={style.symbolsRow}>
                <Tile label="Entire class moving"></Tile>
                <Tile label="Partner work"></Tile>
                <Tile label="Work in groups"></Tile>
            </div>
        </Holder>
    );
};

export default Symbols;