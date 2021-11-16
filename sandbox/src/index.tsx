import ReactDOM from 'react-dom'
import CodeEditor from './components/CodeEditor';

const App = () => {
 
    return <CodeEditor />;
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);
