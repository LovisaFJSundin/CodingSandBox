import React, {useState, useRef } from 'react'
import bundle from '../bundler'
import CodeEditor from './CodeEditor'
import Preview from './Preview';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store';
// OS code editors
// CodeMirror, AceEditor, Monaco Editor


const IDEComponent = () => {

    // Temporary... get counter state from the state.. subscription
    const dispatch = useDispatch();
        /*
    const counter = useSelector( (state: any) => {
        return state.counter.counter;
    });

    const incrementHandler = () => { 
        dispatch(counterActions.decrement(4))
    }
    */

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
