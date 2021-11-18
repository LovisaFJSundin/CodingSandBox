import React, { useRef} from 'react'
import './syntax.css'
import MonacoEditor, { OnMount } from '@monaco-editor/react'
import prettier from 'prettier';
import parser from 'prettier/parser-babel'
import Highlighter from 'monaco-jsx-highlighter'
import { parse } from '@babel/parser'
import traverse from '@babel/traverse'

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor : React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {

    const editorRef = useRef<any>(null);

    const onEditorMount : OnMount = ( editor, _monaco) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(()=> onChange(editor.getValue()));
        editor.getModel()?.updateOptions({ tabSize: 2});

        const highlighter = new Highlighter(
            //@ts-ignore
            window.monaco,
            parse, 
            traverse, 
            editor
        );
        highlighter.highLightOnDidChangeModelContent(100);
        highlighter.addJSXCommentCommand();
    }

    const onFormatClick = () => {
        const unformatted = editorRef.current.getModel().getValue();
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/,'');

        editorRef.current.setValue(formatted);
    }

    return (
        <>
        <button onClick={onFormatClick}>Format</button>
        <MonacoEditor 
        onMount={onEditorMount}
        value={initialValue}
        language="javascript" 
        theme="vs-dark" 
        height="400px" 
        options={{
            wordWrap: 'on',
            minimap: { enabled: false},
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 14,
            scrollBeyondLastLine: false,
            automaticLayout: true
        }}
        />
        </>
    )
}

export default CodeEditor
