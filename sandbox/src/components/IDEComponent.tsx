import React, {useState, useRef, useEffect} from 'react'
import * as esbuild from 'esbuild-wasm'
import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';
import { fetchPlugin } from '../plugins/fetch-plugin';
import CodeEditor from './CodeEditor'

// OS code editors
// CodeMirror, AceEditor, Monaco Editor


const IDEComponent = () => {

    const ref = useRef<any>();
    const iframe = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        esbuild.initialize({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm'
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
        
        iframe.current.srcdoc = html;

        esbuild.transform(input, {
            loader: 'jsx',
            target: 'es2015'
        }).then(() => {
            esbuild.build({
                entryPoints: ['index.js'],
                bundle: true,
                write: false,
                plugins: [
                    unpkgPathPlugin(),
                    fetchPlugin(input)
                ],
                define: {
                    'process.env.NODE_ENV': '"production"',
                    global: 'window',
                }
            }).then((result) => {
                //setCode()
                iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
            })
        })
    }

    const html = `
        <html>
            <head></head>
            <body>
                <div id="root"></div>
                <script>
                window.addEventListener('message', (event)=> {
                    try {
                        eval(event.data);
                    } catch (err) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div className="error">' + err + '</div>'
                        console.error(err);
                    }
                }, false);
                </script>
            </body>
        </html>
    `;


    return (
        <div>
            <CodeEditor initialValue="Type here" onChange={(val)=> console.log("HIYA"+val)}/>
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
        </div>
    )
}

export default IDEComponent
