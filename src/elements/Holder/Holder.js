import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import ReactTooltip from "react-tooltip";

import Button from '../Button/Button';
import style from './Holder.module.scss';
import { Close, HelpIcon, ExpandIcon } from '../Icon/Icon';

let allowToDrag = false;
let allowToResize = false;

var initialSize = null;
var currentSize = null;

const Holder = ({ help, onCompClick, onClose, className = '', activeClassName, width = 250, height = 250, minWidth = "250", minHeight = "250", resizable = true, children }) => {

    const [focused, setFocused] = useState(true);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [size, setSize] = useState(null);
    const holderNodeRef = useRef();
    const resizeHandleRef = useRef();

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
        if (holderNodeRef && holderNodeRef.current) {
            setFocused(holderNodeRef.current.contains(e.target));
        }
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
        try {
            if (e.type == 'touchstart' || e.type == 'tap') {
                e.srcElement.click(e);
                e.srcElement.focus();
            } else {
                // document.body.click(e);
            }
        } catch (e) {
            // console.log('eerrrrr',e);
        }
        setFocused(true);
    }

    const onStart = (e) => {
        if (e.target == resizeHandleRef.current)
            return false;

        return true;// allowToDrag;
    }

    const onCloseClick = (e) => {
        onClose && onClose(e);
    }

    const onResizeHandleMouseDown = e => {
        if (e.type == 'touchstart') {
            e.pageX = e.touches[0].pageX;
            e.pageY = e.touches[0].pageY;
        }
        const node = holderNodeRef.current;
        initialSize = {
            w: node.offsetWidth,
            h: node.offsetHeight,
            x: e.pageX,
            y: e.pageY
        }
        allowToResize = true;

        document.addEventListener('mousemove', onDocumentMouseMove);
        document.addEventListener('touchmove', onDocumentMouseMove);
        document.addEventListener('mouseup', onDocumentMouseUp);
        document.addEventListener('touchend', onDocumentMouseUp);
    }

    const onDocumentMouseMove = e => {
        if (e.type == 'touchmove') {
            e.pageX = e.touches[0].pageX;
            e.pageY = e.touches[0].pageY;
        }
        const node = holderNodeRef.current;
        const tempSize = {
            width: (initialSize.w + (e.pageX - initialSize.x)),
            height: (initialSize.h + (e.pageY - initialSize.y))
        }
        setSize(tempSize);
        e.preventDefault();
        e.stopPropagation();
    }

    const onDocumentMouseUp = e => {
        initialSize = null;
        allowToResize = false;
        document.removeEventListener('mousemove', onDocumentMouseMove);
        document.removeEventListener('touchmove', onDocumentMouseMove);
        document.removeEventListener('mouseup', onDocumentMouseUp);
        document.removeEventListener('touchend', onDocumentMouseUp);
        // e.preventDefault();
        // e.stopPropagation();
    }

    return (
        <Draggable calcel={style.resizeHandle} onTouchStart={onMouseDown} onMouseDown={onMouseDown} onStart={onStart} defaultClassNameDragging={style.dragging}>
            <div style={size} className={`${style.holder} ${className ? className : ''} ${focused ? style.active : ''} ${focused && activeClassName ? activeClassName : ''}`} ref={holderNodeRef}>
                {children}
                {help && (
                    <>
                        <div
                            data-for="helper"
                            data-tip={help}
                            className={`${style.button} ${style.helpButton}`}>
                            <HelpIcon />
                        </div>
                        <ReactTooltip
                            id="helper"
                            className="extraClass"
                            delayHide={1000}
                            effect="solid"
                        />
                    </>
                )}
                <button className={`${style.button} ${style.closeButton}`} onClick={onCloseClick}>
                    <Close></Close>
                </button>
                {resizable && (
                    <div className={style.resizeHandle} onMouseDown={onResizeHandleMouseDown} onTouchStart={onResizeHandleMouseDown} ref={resizeHandleRef}>
                        <ExpandIcon />
                    </div>)}
            </div>
        </Draggable>
    )
}

export default Holder;