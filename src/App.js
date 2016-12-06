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
          // Denne metode køre ved "success"
          // Når requestet er "successful" har jeg besluttet at den skal ændre url til /books, dermed bliver denne side vist som "default" når der logges ind.

          window.location.href = "/books";
          console.log("response", response.body);
          this.setState({response: response.body})
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
          {this.state.response}
        </div>

        // ovenstående kode er til forsiden som giver brugeren mulighed for at logge ind ved at indtaste navn og adgangskode.
    );
  }
}

