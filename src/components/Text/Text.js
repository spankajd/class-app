
import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";

import Holder from '../../elements/Holder/Holder';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import style from './Text.module.scss';



const Text = ({ onCompClick, onCompClose }) => {

    // const [editorState, setEditorState ] = useState('');

    const onCloseClick = e => {
        onCompClose(e);
    }

    // const onEditorStateChange = e => {

    // }
    //https://jpuri.github.io/react-draft-wysiwyg/#/docs
    return (
        <Holder className={style.text} onCompClick={onCompClick} onClose={onCloseClick}>
            <Editor
                toolbar={{options:[ 'fontFamily', 'fontSize', 'inline', 'colorPicker', 'remove', 'history'],
                inline:{options: ['bold', 'italic', 'underline']} 
                }}
                wrapperClassName={style.wrapper}
                toolbarClassName={style.toolbar}
                editorClassName={style.editor}
            />
        </Holder>
    );
};

export default Text;