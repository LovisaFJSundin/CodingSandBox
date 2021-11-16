import React, {useState, useRef, useEffect} from 'react'
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';


const CodeEditor = () => {

    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        esbuild.initialize({
            worker: true,
            wasmURL: '/esbuild.wasm'
        }).then(()=> {
            console.log("Initialised")
        })
    };

    useEffect(()=> {
        try {
            startService();
        }catch(err){
            console.error(err);
        }
        
    }, [])

    const onClick = async () => {
        console.log(input);
        esbuild.transform(input, {
            loader: 'jsx',
            target: 'es2015'
        }).then(() => {
            esbuild.build({
                entryPoints: ['index.js'],
                bundle: true,
                write: false,
                plugins: [unpkgPathPlugin()],
                define: {
                    'process.env.NODE_ENV': '"production"',
                    global: 'window',
                }
            }).then((result) => {
                setCode(result.outputFiles[0].text)
            })
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
