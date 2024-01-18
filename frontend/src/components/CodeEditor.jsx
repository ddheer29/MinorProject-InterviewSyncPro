import React from 'react'
import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/keybinding-emacs";
import "ace-builds/src-noconflict/keybinding-vim";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-searchbox";
import { CssHighlightRules } from 'ace-builds/src-noconflict/mode-html'


const CodeEditor = ({ AceEditorRef, language, codeKeyBinding, code, handleChange, input, InputHandler, output }) => {
    return (
        <div className="coding">
            <AceEditor
                id="codeEditor"
                ref={AceEditorRef}
                setOptions={{ useWorker: false }}
                placeholder='Write your code here'
                className='roomCodeEditor'
                mode={language}
                keyboardHandler={codeKeyBinding}
                theme='monokai'
                name='collabEditor'
                width='auto'
                height='600px'
                fontSize={15}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                enableLiveAutocompletion={true}
                enableBasicAutocompletion={false}
                enableSnippets={false}
                wrapEnabled={true}
                tabSize={2}
                editorProps={{
                    $blockScrolling: true
                }}
                value={code}
                onChange={(change) => handleChange(change)}
            />
            <div className="op">
                <textarea
                    type="text"
                    id="input"
                    name="input"
                    placeholder='input'
                    value={input}
                    onChange={InputHandler}>
                </textarea>
                <br />
                <textarea
                    type="text"
                    id="output"
                    name="output"
                    placeholder='output'
                    value={output}>
                </textarea>
            </div>
        </div>
    )
}

export default CodeEditor