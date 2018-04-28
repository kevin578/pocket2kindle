import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import SignIn from './SignIn';

const Routes = (
<Router>
    <div>
        <Route exact path="/" component={App}/>
    </div>
</Router>
)


ReactDOM.render(Routes, document.getElementById('root'));
registerServiceWorker();
