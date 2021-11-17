import React, {useState, useRef } from 'react'
import bundle from '../bundler'
import CodeEditor from './CodeEditor'
import Preview from './Preview';

// OS code editors
// CodeMirror, AceEditor, Monaco Editor


const IDEComponent = () => {

    const ref = useRef<any>();

    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const onClick = async () => {
        const output = await bundle(input);
        console.log("OUTPUT IS", output)
        setCode(output);
    }

    return (
        <div>
            <CodeEditor 
            initialValue="Type here" 
            onChange={(val) => setInput(val)}/>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        < Preview code={code} />
        </div>
    )
}

export default IDEComponent
