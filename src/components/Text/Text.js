
import React, { useState, useEffect, useRef } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, Modifier } from 'draft-js';

import { PasteIcon } from '../../elements/Icon/Icon';
import Holder from '../../elements/Holder/Holder';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TitleInput from '../../elements/TitleInput/TitleInput';
import style from './Text.module.scss';



const CopyComp = ({ editorState, onChange }) => {

    const onCopyClick = () => {
        var selectionState = editorState.getSelection();
        var anchorKey = selectionState.getAnchorKey();
        var currentContent = editorState.getCurrentContent();
        var currentContentBlock = currentContent.getBlockForKey(anchorKey);
        var start = selectionState.getStartOffset();
        var end = selectionState.getEndOffset();
        var selectedText = currentContentBlock.getText().slice(start, end);
        navigator.clipboard.writeText(selectedText);
    };

    return (
        <div title="Copy" className="rdw-option-wrapper" onClick={onCopyClick}><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUwMiA1MDIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUwMiA1MDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8Zz4NCgkJCTxwYXRoIGQ9Ik00NjcuNjI4LDE5MC4xNzZsLTcwLjQ2OS03MC40NjhjLTEuODc2LTEuODc1LTQuNDE5LTIuOTI5LTcuMDcxLTIuOTI5aC03Ni40NzNWODAuNDY4YzAtMi42NTItMS4wNTQtNS4xOTYtMi45MjktNy4wNzENCgkJCQlMMjQwLjIxOSwyLjkyOUMyMzguMzQyLDEuMDU0LDIzNS44LDAsMjMzLjE0NiwwSDQxLjQ0M2MtNS41MjIsMC0xMCw0LjQ3Ny0xMCwxMHYzNjUuMjIxYzAsNS41MjMsNC40NzgsMTAsMTAsMTBoMTQ2Ljk0MVY0OTINCgkJCQljMCw1LjUyMyw0LjQ3OCwxMCwxMCwxMGgyNjIuMTcyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBWMTk3LjI0N0M0NzAuNTU3LDE5NC41OTUsNDY5LjUwMywxOTIuMDUxLDQ2Ny42MjgsMTkwLjE3NnoNCgkJCQkgTTQwMC4wODksMTUwLjkyMWwxOC4xNjMsMTguMTYzbDE4LjE2MywxOC4xNjNoLTM2LjMyNlYxNTAuOTIxeiBNMjQzLjE0NywzNC4xNDJsMTguMTYzLDE4LjE2M2wxOC4xNjMsMTguMTYzaC0zNi4zMjZWMzQuMTQyeg0KCQkJCSBNODcuMjg3LDExNi43NzljLTUuNTIyLDAtMTAsNC40NzctMTAsMTBzNC40NzgsMTAsMTAsMTBoMTAxLjA5OXYyOS45MTlIODcuMjg3Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwczQuNDc4LDEwLDEwLDEwaDEwMS4wOTkNCgkJCQl2MzAuMDFIODcuMjg3Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwYzAsNS41MjMsNC40NzgsMTAsMTAsMTBoMTAxLjA5OXYzMC4wMDlIODcuMjg3Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwczQuNDc4LDEwLDEwLDEwDQoJCQkJaDEwMS4wOTl2NzguNTA0SDUxLjQ0M1YyMGgxNzEuNzAzdjYwLjQ2OGMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwaDYwLjQ2OXYyNi4zMTFIODcuMjg3eiBNNDUwLjU1Nyw0ODJIMjA4LjM4NlYxMzYuNzc5aDE3MS43MDMNCgkJCQl2NjAuNDY4YzAsNS41MjMsNC40NzgsMTAsMTAsMTBoNjAuNDY5VjQ4MnoiLz4NCgkJCTxwYXRoIGQ9Ik0yNDQuMjI5LDI1My40NjhIMzY5LjYzYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBjMC01LjUyMy00LjQ3OC0xMC0xMC0xMEgyNDQuMjI5Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwDQoJCQkJQzIzNC4yMjksMjQ4Ljk5MSwyMzguNzA2LDI1My40NjgsMjQ0LjIyOSwyNTMuNDY4eiIvPg0KCQkJPHBhdGggZD0iTTQxNC43MTQsMjgzLjQ3OEgyNDQuMjI5Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwczQuNDc4LDEwLDEwLDEwaDE3MC40ODZjNS41MjIsMCwxMC00LjQ3NywxMC0xMA0KCQkJCVM0MjAuMjM3LDI4My40NzgsNDE0LjcxNCwyODMuNDc4eiIvPg0KCQkJPHBhdGggZD0iTTQxNC43MTQsMzMzLjQ4N0gyNDQuMjI5Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwczQuNDc4LDEwLDEwLDEwaDE3MC40ODZjNS41MjIsMCwxMC00LjQ3NywxMC0xMA0KCQkJCVM0MjAuMjM3LDMzMy40ODcsNDE0LjcxNCwzMzMuNDg3eiIvPg0KCQkJPHBhdGggZD0iTTQxNC43MTQsMzgzLjQ5N0gyNDQuMjI5Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwczQuNDc4LDEwLDEwLDEwaDE3MC40ODZjNS41MjIsMCwxMC00LjQ3NywxMC0xMA0KCQkJCVM0MjAuMjM3LDM4My40OTcsNDE0LjcxNCwzODMuNDk3eiIvPg0KCQkJPHBhdGggZD0iTTM5OC4wNDQsMjUzLjQ2OGgxNi42N2M1LjUyMiwwLDEwLTQuNDc3LDEwLTEwYzAtNS41MjMtNC40NzgtMTAtMTAtMTBoLTE2LjY3Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwDQoJCQkJQzM4OC4wNDQsMjQ4Ljk5MSwzOTIuNTIyLDI1My40NjgsMzk4LjA0NCwyNTMuNDY4eiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" /></div>
    );
}


const PasteComp = ({ editorState, onChange }) => {

    const onCopyClick = async () => {
        let text = await navigator.clipboard.readText();
        const contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            text,
            editorState.getCurrentInlineStyle(),
        );
        onChange(EditorState.push(editorState, contentState, 'insert-characters'));
    };

    return (
        <div title="Paste" className="rdw-option-wrapper" onClick={onCopyClick}><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUwMiA1MDIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUwMiA1MDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8Zz4NCgkJCTxwYXRoIGQ9Ik00NjcuMzUsMTkwLjE3NmwtNzAuNDY4LTcwLjQ2OGMtMS44NzYtMS44NzUtNC40MTktMi45MjktNy4wNzEtMi45MjloLTIzLjA4OVY0OWMwLTUuNTIzLTQuNDc4LTEwLTEwLTEwaC0xMTV2LTIuNDENCgkJCQljMC0yMC4xNzYtMTYuNDE0LTM2LjU5LTM2LjU5LTM2LjU5aC0xMS44MTljLTIwLjE3NiwwLTM2LjU5MSwxNi40MTUtMzYuNTkxLDM2LjU5VjM5aC0xMTVjLTUuNTIyLDAtMTAsNC40NzctMTAsMTB2Mzg2DQoJCQkJYzAsNS41MjMsNC40NzgsMTAsMTAsMTBoMTQ2LjM4NnY0N2MwLDUuNTIzLDQuNDc4LDEwLDEwLDEwaDI2Mi4xNzFjNS41MjIsMCwxMC00LjQ3NywxMC0xMFYxOTcuMjQ3DQoJCQkJQzQ3MC4yNzksMTk0LjU5NSw0NjkuMjI1LDE5Mi4wNTEsNDY3LjM1LDE5MC4xNzZ6IE0zOTkuODExLDE1MC45MjFsMzYuMzI2LDM2LjMyNmgtMzYuMzI2VjE1MC45MjF6IE0xNDQuNzIxLDU5aDQ3DQoJCQkJYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBzLTQuNDc4LTEwLTEwLTEwaC0xNXYtMi40MWMwLTkuMTQ4LDcuNDQyLTE2LjU5LDE2LjU5MS0xNi41OWgxMS44MTljOS4xNDcsMCwxNi41OSw3LjQ0MiwxNi41OSwxNi41OVY0OQ0KCQkJCWMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwaDIydjIwaC0xMDlWNTl6IE0xOTguMTA3LDExNi43NzljLTUuNTIyLDAtMTAsNC40NzctMTAsMTBWNDI1SDUxLjcyMVY1OWg3M3YzMGMwLDUuNTIzLDQuNDc4LDEwLDEwLDEwDQoJCQkJaDEyOWM1LjUyMiwwLDEwLTQuNDc3LDEwLTEwVjU5aDczdjU3Ljc3OUgxOTguMTA3eiBNNDUwLjI3OCw0ODJIMjA4LjEwN1YxMzYuNzc5SDM3OS44MXY2MC40NjhjMCw1LjUyMyw0LjQ3OCwxMCwxMCwxMGg2MC40NjgNCgkJCQlWNDgyeiIvPg0KCQkJPHBhdGggZD0iTTI0My45NDksMjUzLjQ2OGgxMjUuNDAyYzUuNTIyLDAsMTAtNC40NzcsMTAtMTBjMC01LjUyMy00LjQ3OC0xMC0xMC0xMEgyNDMuOTQ5Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwDQoJCQkJQzIzMy45NDksMjQ4Ljk5MSwyMzguNDI3LDI1My40NjgsMjQzLjk0OSwyNTMuNDY4eiIvPg0KCQkJPHBhdGggZD0iTTQxNC40MzcsMjgzLjQ3OEgyNDMuOTQ5Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwczQuNDc4LDEwLDEwLDEwaDE3MC40ODdjNS41MjIsMCwxMC00LjQ3NywxMC0xMA0KCQkJCVM0MTkuOTU5LDI4My40NzgsNDE0LjQzNywyODMuNDc4eiIvPg0KCQkJPHBhdGggZD0iTTQxNC40MzcsMzMzLjQ4N0gyNDMuOTQ5Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwczQuNDc4LDEwLDEwLDEwaDE3MC40ODdjNS41MjIsMCwxMC00LjQ3NywxMC0xMA0KCQkJCVM0MTkuOTU5LDMzMy40ODcsNDE0LjQzNywzMzMuNDg3eiIvPg0KCQkJPHBhdGggZD0iTTQxNC40MzcsMzgzLjQ5N0gyNDMuOTQ5Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwczQuNDc4LDEwLDEwLDEwaDE3MC40ODdjNS41MjIsMCwxMC00LjQ3NywxMC0xMA0KCQkJCVM0MTkuOTU5LDM4My40OTcsNDE0LjQzNywzODMuNDk3eiIvPg0KCQkJPHBhdGggZD0iTTM5Ny43NjcsMjUzLjQ2OGgxNi42N2M1LjUyMiwwLDEwLTQuNDc3LDEwLTEwYzAtNS41MjMtNC40NzgtMTAtMTAtMTBoLTE2LjY3Yy01LjUyMiwwLTEwLDQuNDc3LTEwLDEwDQoJCQkJQzM4Ny43NjcsMjQ4Ljk5MSwzOTIuMjQ1LDI1My40NjgsMzk3Ljc2NywyNTMuNDY4eiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=" /></div>
    );
}


const Wrapper = ({ editorState, onChange }) => {
    return (
        <div className="rdw-clipAction-wrapper">
            <CopyComp editorState={editorState} onChange={onChange} />
            <PasteComp editorState={editorState} onChange={onChange} />
        </div>
    );
}


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
    const setEditorReference = (ref) => {
        if (ref && ref.focus && editorReferece === null) {
            setEditorReferece(ref);
            ref.focus();
            // ref.click();
        }
    }

    const onChang = () => {

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
                toolbarCustomButtons={[<Wrapper />]}
                // editorRef={setEditorReference}
                wrapperClassName={style.wrapper}
                toolbarClassName={style.toolbar}
                editorClassName={style.editor}
                editorRef={setEditorReference}
                placeholder="Type here"
            />
        </Holder>
    );
};

export default Text;