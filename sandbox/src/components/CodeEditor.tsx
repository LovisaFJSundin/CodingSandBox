import React, { useRef} from 'react'
import MonacoEditor, { OnMount } from '@monaco-editor/react'

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
    }

    return (
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
    )
}

export default CodeEditor
