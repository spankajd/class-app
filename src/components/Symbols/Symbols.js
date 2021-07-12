
import React, { useState, useEffect } from 'react';

import Holder from '../../elements/Holder/Holder';
import Tile from '../../elements/Tile/Tile';

import { IndividualWork, EntireClass, PartnerWork, TeacherUpFront, Silence, WorkInGroup } from '../../elements/Icon/Icon';

import style from './Symbols.module.scss';

/**
 * Primary UI component for user interaction
 */
const Symbols = ({ onCompClick, onCompClose }) => {

    const [selectedItem, setSelectedItem] = useState([]);
    const itemCombination = [1, 2, 3, 4];

    const onCloseClick = (e) => {
        onCompClose(e);
    }
    
    const onTileClick = id => {
        let tempArr = [...selectedItem];
        if (tempArr.includes(id)) {
            tempArr.splice(tempArr.indexOf(id), 1);
        } else {
            tempArr.push(id);
        }
        setSelectedItem(tempArr);
    }

    const validate = id => {
        for(let i in itemCombination) {
            if(itemCombination[i] != id && selectedItem.includes(itemCombination[i])) {
                return true;
            }
        }
        return false;
    }

    return (
        <Holder className={style.symbols} onCompClick={onCompClick} onClose={onCloseClick}>
            <div className={style.symbolsRow}>
                <Tile disabled={validate(1)} label="Individual Work" onClick={onTileClick} id={1}>
                    <IndividualWork />
                </Tile>
                <Tile disabled={validate(2)} label="Partner work" onClick={onTileClick} id={2}>
                    <PartnerWork />
                </Tile>
                <Tile disabled={validate(3)} label="Work in groups" onClick={onTileClick} id={3}>
                    <WorkInGroup />
                </Tile>
            </div>
            <div className={style.symbolsRow}>
                <Tile disabled={validate(4)} label="Entire class moving" onClick={onTileClick} id={4}>
                    <EntireClass />
                </Tile>
                <Tile label="Teacher up front" onClick={onTileClick} id={5}>
                    <TeacherUpFront />
                </Tile>
                <Tile label="Silence" onClick={onTileClick} id={6}>
                    <Silence />
                </Tile>
            </div>
        </Holder>
    );
};

export default Symbols;