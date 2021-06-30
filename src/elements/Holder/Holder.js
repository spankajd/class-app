import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';

import Button from '../Button/Button';
import style from './Holder.module.scss';
import { Close } from '../Icon/Icon';

let allowToDrag = false;

const Holder = ({ onCompClick, onClose, className, width = "250", height = "250", minWidth = "250", minHeight = "250", resizable = true, children }) => {

    const [focused, setFocused] = useState(true);
    const holderNodeRef = useRef();

    const spanStyles = {
        resize: resizable ? 'both' : '',
        overflow: 'auto',
    };

    useEffect(() => {
        document.addEventListener('click', handleDocClick);
        return () => {
            document.removeEventListener('click', handleDocClick);
        };
    }, []);

    const handleDocClick = (e) => {
        setFocused(holderNodeRef.current.contains(e.target));
    }

    const onMouseDown = (e) => {
        const pos = e.target.getBoundingClientRect();
        const size = 15;
        if (((e.clientX - pos.x) < (pos.width - size)) && ((e.clientY - pos.y) < (pos.height - size))) {
            allowToDrag = true;
        } else {
            allowToDrag = false;
        }
        onCompClick && onCompClick();
        document.body.click(e);
        setFocused(true);
    }

    const onStart = (e) => {
        return allowToDrag;
    }

    const onCloseClick = (e) => {
        onClose && onClose(e);
    }

    return (
        <Draggable onMouseDown={onMouseDown} onStart={onStart} positionOffset={{ x: '-50%', y: '-50%' }} defaultClassNameDragging={style.dragging}>
            <div style={spanStyles} className={`${style.holder} ${className ? className : ''} ${focused ? style.active : ''}`} ref={holderNodeRef}>
                {children}
                <button className={style.closeButton} onClick={onCloseClick}>
                    <Close></Close>
                </button>
            </div>
        </Draggable>
    )
}

export default Holder;