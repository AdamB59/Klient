import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Books from './Books';
import Users from './Users';
import Curriculum from './Curriculum';
import MyCurriculum from './MyCurriculum';
import { Router, Route, Link, browserHistory } from 'react-router'


ReactDOM.render(

    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="books" component={Books}/>
        <Route path="users" component={Users}/>
        <Route path="curriculum" component={Curriculum}/>
            <Route path="myCurriculum" component={MyCurriculum}/>
    </Router>, document.getElementById('root'));

