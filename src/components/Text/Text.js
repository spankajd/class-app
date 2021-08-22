
import React, { useState, useEffect, useRef } from 'react';
import { Editor } from "react-draft-wysiwyg";

import Holder from '../../elements/Holder/Holder';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TitleInput from '../../elements/TitleInput/TitleInput';
import style from './Text.module.scss';



const Text = ({ count = 1, onCompClick, onCompClose }) => {

    const [editorState, setEditorState] = useState('');
    const textTitle = useRef();
    const [editorReferece, setEditorReferece] = useState(null);
    // let editorReferece = null;
    useEffect(() => {
        if (textTitle.current) {
            textTitle.current.click();
        }
    }, [textTitle]);

    const onCloseClick = e => {
        onCompClose(e);
    }
    // const setEditorReference = (ref) => {
    //     // this.editorReferece = ref;
    //     ref.focus();
    // }

    // const onComponentClick = e => {
    //     console.log('onComponentClick ', e.target);
    // }

    const setEditorReference = (ref) => {
        // if(editorReferece === null)
        //     setEditorReferece(ref);

        if(ref && ref.focus && editorReferece === null){
            setEditorReferece(ref);
            ref.focus();
        }
        console.log('editorReferece ' ,editorReferece);
    }

    //https://jpuri.github.io/react-draft-wysiwyg/#/docs
    return (
        <Holder className={style.text} onCompClick={onCompClick} onClose={onCloseClick} activeClassName={style.focused} nodesNotAllowToDrag={editorReferece ? [editorReferece.editorContainer ? editorReferece.editorContainer : editorReferece] : []}>
            <div className={style.title} ref={textTitle}>
                <TitleInput defaultVal={`Text ${count}`} />
            </div>
            <Editor
                toolbar={{
                    options: ['fontFamily', 'fontSize', 'inline', 'colorPicker', 'remove', 'history'],
                    inline: { options: ['bold', 'italic', 'underline'] },
                }}
                // editorRef={setEditorReference}
                wrapperClassName={style.wrapper}
                toolbarClassName={style.toolbar}
                editorClassName={style.editor}
                editorRef={ setEditorReference }
                placeholder="Type here"
            />
        </Holder>
    );
};

export default Text;