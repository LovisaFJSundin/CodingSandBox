import React, {useState, useRef, useEffect} from 'react'
import * as esbuild from 'esbuild-wasm'


const CodeEditor = () => {

    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        esbuild.initialize({
            wasmURL: '/esbuild.wasm'
        }).then(()=> {
            console.log("Initialised")
        })
    };

    useEffect(()=> {
        startService();
    }, [])

    const onClick = async () => {
        console.log(input);
        esbuild.transform(input, {
            loader: 'jsx',
            target: 'es2015'
        }).then((result) => {
            setCode(result.code)
        })
    }


    return (
        <div>
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
        </div>
    )
}

export default CodeEditor
