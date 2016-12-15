import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Books from './Books';
import Users from './Users';
import Curriculum from './Curriculum';
import MyCurriculum from './MyCurriculum';
import { Router, Route, Link, browserHistory } from 'react-router'


const checkAuth = (nextState, replace) => {

    // Tjek om der er en token i localStorage, og på baggrund af dette afgøres der om personen er "authorized" eller ej.
    if(localStorage.getItem("token")){
        console.log("AUTHENTICATED")
    } else {
        console.log("NOT AUTH");
        replace("/")
    }
}

ReactDOM.render(

    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="books" component={Books} onEnter={checkAuth}/>
        <Route path="users" component={Users} onEnter={checkAuth}/>
        <Route path="curriculum" component={Curriculum} onEnter={checkAuth}/>
        <Route path="myCurriculum" component={MyCurriculum} />
    </Router>, document.getElementById('root'));

