import ReactDOM from 'react-dom'
import IDEComponent from './components/IDEComponent';

const App = () => {
 
    return <IDEComponent />;
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);
