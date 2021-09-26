import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import Tooltip from "rc-tooltip";
import 'rc-tooltip/assets/bootstrap.css';

import Button from '../Button/Button';
import style from './Holder.module.scss';
import { Close, HelpIcon, ExpandIcon } from '../Icon/Icon';

let allowToDrag = false;
let allowToResize = false;

var initialSize = null;
var currentSize = null;

const Holder = ({

    onCompClick,
    onClose,
    children,
    className = '',
    activeClassName,
    resizable = true,
    resizeDirect = 'ltr',
    help,
    toolDirection = 'top',
    width = 250,
    height = 250,
    minWidth = "250",
    minHeight = "250",
    maintainAspectRatio = false,
    aspectWithRespectTo = null,
    nodesNotAllowToDrag = []  }) => {

    const [focused, setFocused] = useState(true);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [size, setSize] = useState(null);
    const [cancelElements, setCancelElements] = useState('');
    const holderNodeRef = useRef();
    const resizeHandleRef = useRef();

    const spanStyles = {
        resize: resizable ? 'both' : '',
        overflow: 'auto',
    };

    useEffect(() => {
        document.addEventListener('click', handleDocClick);
        
        generateCancelElements();
        
        return () => {
            document.removeEventListener('click', handleDocClick);
        };
    }, []);

    useEffect(() => {
        generateCancelElements();
    },[nodesNotAllowToDrag]);

    useEffect(() => {
        console.log('focused >>>> ' , focused);
    },[focused]);

    const generateCancelElements = () => {
        let temp = '.'+style.resizeHandle;
        
        if(nodesNotAllowToDrag) {
            for(let i = 0; i < nodesNotAllowToDrag.length; i++) {
                temp += ', .'+nodesNotAllowToDrag[i];
            }
        }
        setCancelElements(temp);
    }

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
        onCompClick && onCompClick(e);
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
        if (e.target == resizeHandleRef.current ||
            (nodesNotAllowToDrag.length > 0 && checkParent(nodesNotAllowToDrag[0], e.target )) ||
            (e.target.classList.contains('rc-tooltip-inner')) )
            return false;

        return true;// allowToDrag;
    }

    const checkParent = (parent, child) => {
        if (child == parent) {
            return true
        }
        let node = child.parentNode;
        // keep iterating unless null
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    const onCloseClick = (e) => {
        onClose && onClose(e);
    }

    const onResizeHandleMouseDown = e => {
        let pageX = e.pageX;
        let pageY = e.pageY;
        if (e.type == 'touchstart') {
            pageX = e.touches[0].pageX;
            pageY = e.touches[0].pageY;
        }
        const node = holderNodeRef.current;
        const offsetWidth = aspectWithRespectTo ? (node.offsetWidth - aspectWithRespectTo.current.offsetWidth) : 0;
        initialSize = {
            w: node.offsetWidth,
            h: node.offsetHeight,
            x: pageX,
            y: pageY,
            aRatio: node.offsetHeight / (node.offsetWidth - offsetWidth),
            offsetWidth: offsetWidth
        }
        allowToResize = true;

        document.addEventListener('mousemove', onDocumentMouseMove);
        document.addEventListener('touchmove', onDocumentMouseMove);
        document.addEventListener('mouseup', onDocumentMouseUp);
        document.addEventListener('touchend', onDocumentMouseUp);
    }

    const onDocumentMouseMove = e => {
        let pageX = e.pageX;
        let pageY = e.pageY;
        if (e.type == 'touchmove') {
            pageX = e.touches[0].pageX;
            pageY = e.touches[0].pageY;
        }
        const node = holderNodeRef.current;
        const tempSize = {
            width: resizeDirect == 'ltr' ? (initialSize.w + (pageX - initialSize.x)) : (initialSize.w - (pageX - initialSize.x)),
            height: (initialSize.h + (pageY - initialSize.y))
        }
        if (maintainAspectRatio) {
            if (aspectWithRespectTo)
                tempSize.height = ((tempSize.width - initialSize.offsetWidth) * initialSize.aRatio);
            else
                tempSize.height = (tempSize.width * initialSize.aRatio);
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
        <Draggable cancel={cancelElements} onTouchStart={onMouseDown} onMouseDown={onMouseDown} onStart={onStart} defaultClassNameDragging={style.dragging}>
            <div style={size} className={`${style.holder} ${className ? className : ''} ${focused ? style.active : ''} ${focused && activeClassName ? activeClassName : ''}`} ref={holderNodeRef}>
                {children}
                {help && (
                    <Tooltip placement={toolDirection} trigger={['click']} overlay={help}>
                        <button
                            data-for="helper"
                            data-tip={help}
                            className={`${style.button} ${style.helpButton}`}>
                            <HelpIcon />
                        </button>
                    </Tooltip>
                )}
                <button className={`${style.button} ${style.closeButton}`} onClick={onCloseClick}>
                    <Close></Close>
                </button>
                {resizable && (
                    <div className={`${style.resizeHandle} ${resizeDirect == 'rtl' ? style.leftSide : ''}`} onMouseDown={onResizeHandleMouseDown} onTouchStart={onResizeHandleMouseDown} ref={resizeHandleRef}>
                        <ExpandIcon />
                    </div>)}
            </div>
        </Draggable>
    )
}

export default Holder;