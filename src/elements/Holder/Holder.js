import React, { useState } from 'react';
import Draggable from 'react-draggable';

import style from './Holder.module.scss';

let allowToDrag = false;

 const Holder = ({ className, initialPos={ x:0, y:0}, width="250", height="250", minWidth="250", minHeight="250", resizable=true, children}) => {

    // const [currentWidth, setCurrentWidth] = useState(width); 
    // const [currentHeight, setCurrentHeight] = useState(height); 
    

    const spanStyles = {
        // width: currentWidth+'px',
        // height: currentHeight+'px',
        background: 'rgb(236 236 236)',
        resize: resizable ? 'both' : '',
        overflow:'auto',
        // minWidth: minWidth+'px',
        // minHeight: minHeight+'px',
    };
    
    const onMouseDown = (e) => {
        const pos  = e.target.getBoundingClientRect();
        const size = 10;
        if( ((e.clientX-pos.x) < (pos.width - size)) && ((e.clientY-pos.y) < (pos.height - size))) {
            allowToDrag = true;
        } else {
            allowToDrag = false;
        }
    }

    const onStart = (e) => {
        return allowToDrag;
    }

    return (
        <Draggable defaultPosition={initialPos} onMouseDown = { onMouseDown } onStart = { onStart }>
            <div style={spanStyles} className={`${style.holder} ${className ? className : ''}`}>
                {children}
            </div>
      </Draggable>
    )
}

export default Holder;