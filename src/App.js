import React, { Component } from 'react';
import { postAPI } from "./service/api"


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
    postAPI("/user/login", {username : this.state.username, password : this.state.password})
        .then((response, fail) => {
          if(fail) {
            this.setState({response: "An error happend"})
          }
          // Denne metode køre ved "success"
          console.log("response", response.body);
          this.setState({response: response.body});

            // Gemmer token fra serveren i localStorage
            localStorage.setItem("token", response.body);
            // redirect til books siden som "default"
            window.location.href = "/books";
        })

  }
  render() {
    return (
        <div>
          <h1 style={{textAlign: "center", fontSize: "50px", color: "red"}}></h1>
          <h2 style={{textAlign: "center", fontSize: "50px", color: "red"}}></h2>
          <h3 style={{textAlign: "center", fontSize: "50px", color: "red"}}></h3>
          <h4 style={{textAlign: "center", fontSize: "50px", color: "red"}}></h4>
          <h5 style={{textAlign: "center", fontSize: "50px", color: "red"}}></h5>
          <h6 style={{textAlign: "center", fontSize: "50px", color: "red"}}></h6>
          <h2 style={{textAlign: "center", fontSize: "50px", color: "red"}}>Welcome to BookIt</h2>
          <form onSubmit={this._submit.bind(this)}>
              <h3 style={{textAlign: "center", fontSize: "25px", color: "black"}}></h3>
              <h4 style={{textAlign: "center", fontSize: "25px", color: "black"}}></h4>
              <h5 style={{textAlign: "center", fontSize: "25px", color: "black"}}></h5>
              <h6 style={{textAlign: "center", fontSize: "25px", color: "black"}}> - Please enter your username & password - </h6>
              <h7 style={{}}></h7>

            <div style={{textAlign: "center", fontSize: "18px"}}>
              <div>
                <label>
                  Username
                  <input type="userName" onChange={(e) => this.setState({username: e.target.value})}/>
                </label>
              </div>
              <div>
                <label>
                  Password
                  <input type="password" onChange={(e) => this.setState({password: e.target.value})}/>
                </label>
              </div>
              <div>
                <button type="submit">Login</button>
              </div>
            </div>
          </form>

        </div>
        // ovenstående kode er til forsiden, som giver brugeren mulighed for at logge ind vha. et brugernavn og adgangskode.
    );
  }
}

