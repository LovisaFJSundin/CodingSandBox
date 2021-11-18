import React from 'react';
import ReactDOM from 'react-dom'
import IDEComponent from './components/IDEComponent';
import { Provider } from 'react-redux'
import store from './store/index'
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import { BrowserRouter, Routes, Route} from 'react-router-dom'

const App = () => {
 
    return (
        <BrowserRouter>
        <Routes>
            <Route  path="/" element={ < IDEComponent /> } ></Route>
            <Route path="/login" element={ < Login /> } ></Route>
            <Route path="/register" element={ < Register /> } ></Route>
        </Routes>
        </BrowserRouter>
        );
}

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
);
