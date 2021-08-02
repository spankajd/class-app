
import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";

import Holder from '../../elements/Holder/Holder';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TitleInput from '../../elements/TitleInput/TitleInput';
import style from './Text.module.scss';



const Text = ({ count = 1, onCompClick, onCompClose }) => {

    // const [editorState, setEditorState ] = useState('');

    const onCloseClick = e => {
        onCompClose(e);
    }

    // const onEditorStateChange = e => {

    // }
    //https://jpuri.github.io/react-draft-wysiwyg/#/docs
    return (
        <Holder className={style.text} onCompClick={onCompClick} onClose={onCloseClick} activeClassName={style.focused}>
            <div className={style.title}>
                <TitleInput defaultVal={`Text ${count}`} />
            </div>
            <Editor
                toolbar={{
                    options: ['fontFamily', 'fontSize', 'inline', 'colorPicker', 'remove', 'history'],
                    inline: { options: ['bold', 'italic', 'underline'] }
                }}
                wrapperClassName={style.wrapper}
                toolbarClassName={style.toolbar}
                editorClassName={style.editor}
                placeholder="Type here"
            />
        </Holder>
    );
};

export default Text;