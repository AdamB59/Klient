import React, { Component } from 'react';
import { getToken } from "./service/api"


export default class App extends Component {

  constructor(){
    super();

    this.state = {
      username: "",
      password: ""
    }
  }

  _submit(e){

    e.preventDefault();
    getToken("/user/login", {username : this.state.username, password : this.state.password})
    .then((response, fail) => {
      if(fail) {
        this.setState({response: "An error happend"})
      }
      // denne metode køre ved "success" - når requestet er "successful" skal den ændre url til /books
      window.location.href = "/books";
      console.log("response", response.body);
      this.setState({response: response.body})
    })

  }
  render() {
    return (
      <div>
        <h1 style={{textAlign: "center", fontSize: "50px"}}>Welcome</h1>
        <form onSubmit={this._submit.bind(this)}>
          <label>
            Username
            <input type="text" onChange={(e) => this.setState({username: e.target.value})}/>
          </label>
          <label>
            Password
            <input type="password" onChange={(e) => this.setState({password: e.target.value})}/>
          </label>
          <button type="submit">Login</button>

        </form>
        {this.state.response}
      </div>

    );
  }
}

