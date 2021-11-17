import React, { useRef, useEffect } from 'react'

interface PreviewProps {
    code: string;
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

const Preview : React.FC<PreviewProps> = ({ code }) => {
    const iframe = useRef<any>();

    useEffect(() => {
        iframe.current.srcdoc = html;
        //console.log("CODE IS", code)
        //iframe.current.contentWindow.postMessage( code, '*');
    }, [code])

    const loadHandler = () => {
        iframe.current.contentWindow.postMessage(code, "*");
      };

    return (
        <iframe 
        title="preview" 
        ref={iframe} 
        sandbox="allow-scripts" 
        srcDoc={html} 
        onLoad={loadHandler}
        />
    )
}

export default Preview
