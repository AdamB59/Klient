
import React, { Component } from 'react';
import Sidenav from "./Sidenav"
import { getAllUsers, createUser } from "./service/api"

export default class Books extends Component {

    constructor(props){
        super(props);

        this.state = {
            users: [],
            userName: "",
            password: "",
            fistName: "",
            lastName: "",
            email: "",
            userType: 0
        }
    }

    componentWillMount(){
        getAllUsers("/user")
            .then((response, fail) => {
                if(fail) {
                    this.setState({response: "An error happend"})
                }
                console.log("response", (response.body))
                this.setState({users: (response.body)})
            })
    }

    submit = (e) => {
        const { firstName, lastName, password, userName, email, userType} = this.state;

        // stopper browseren i at refreshe siden.
        e.preventDefault()

        console.log("firstName:", firstName)
        console.log("lastName:", lastName)
        console.log("password:", password)
        console.log("userName:", userName)
        console.log("email:", email)
        console.log("userType:", userType)


        createUser("/user", {
            //de her variabel navne skal hedde det samme som på serveren
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
            password: password,
            userType: userType
        }).then((response)=> {
            console.log("RES ADD USER", response)
        })

    }

    // Jeg skal på et eller andet tidspunkt benytte mig af nedenstående kode til at dekryptere.
    // Metoden er den samme som på serveren og burde virke her på klienten også.

    // encrypt(input) {
    //    var key = ['A', 'B', 'C'];
    //    var out = "";
    //    for (var i = 0; i < input.length; i++) {
    //        out += (String.fromCharCode(((input.charAt(i)).charCodeAt(0) ^ (key[i % key.length]).charCodeAt(0))));
    //    }
    //    return out;
    // }

    render() {
        // her styles kategorierne på "Users"
        const thStyles = {
            textAlign: "center",
            backgroundColor: "#333",
            color: "red",
            padding: "10px",
            fontSize: "20px"
        }
        const tdStyles= {
            border: "1px solid #dddddd",
            textAlign: "center",
            padding: "8px"
        }

        // Her oprettes der labels til brugeren som skal oprettes på klienten - der gives mulighed for at indtaste navn, email, username osv.

        return (
            <div>
                <Sidenav/>
                <form onSubmit={this.submit.bind(this)}>

                    <div><label>Firstname</label><input required type="text" placeholder="firstname"  onChange={(e) => this.setState({firstName: e.target.value})} value={this.state.firstName}/></div>
                    <div><label>Lastname</label><input required type="text" placeholder="lastname"  onChange={(e) => this.setState({lastName: e.target.value})} value={this.state.lastName}/></div>
                    <div><label>Username</label><input required type="text" placeholder="username"  onChange={(e) => this.setState({userName: e.target.value})} value={this.state.userName}/></div>
                    <div><label>Email</label><input required type="email" placeholder="email"  onChange={(e) => this.setState({email: e.target.value})} value={this.state.email}/></div>
                    <div><label>password</label><input required type="password" placeholder="password" onChange={(e) => this.setState({password: e.target.value})}value={this.state.password}/></div>


                    <div><label>User type</label>
                        <select required value={this.state.usertype}>
                            <option value={"1"}>Admin</option>
                            <option value={"0"}>Regular</option>
                        </select>
                    </div>

                    <button type="submit">Create user</button>
                </form>

                <h1 style={{textAlign: "center", fontSize: "50px"}}>___________________________________________________________</h1>
                <h2 style={{textAlign: "center", fontSize: "50px", color: "red"}}>Users</h2>
                <h3 style={{textAlign: "center", fontSize: "25px"}}> - This is a list showing all our users - </h3>
                <h4 style={{textAlign: "center", fontSize: "25px"}}> </h4>
                <h5 style={{textAlign: "center", fontSize: "25px"}}> </h5>
                <h6 style={{textAlign: "center", fontSize: "25px"}}> </h6>
                <table style={{width:"100%"}}>
                    <tbody>
                    <tr>
                        <th style={thStyles}>Firstname</th>
                        <th style={thStyles}>Lastname</th>
                        <th style={thStyles}>Username</th>
                        <th style={thStyles}>Email</th>
                        <th style={thStyles}>Password</th>
                        <th style={thStyles}>UserType</th>
                    </tr>
                    {
                        // nendenstående variabler skal være de samme som på serveren under "model", "User"
                        this.state.users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td style={tdStyles}>{user.firstName}</td>
                                    <td style={tdStyles}>{user.lastName}</td>
                                    <td style={tdStyles}>{user.userName}</td>
                                    <td style={tdStyles}>{user.email}</td>
                                    <td style={tdStyles}>{user.password}</td>
                                    <td style={tdStyles}>{user.userType}</td>

                                </tr>
                            )
                        })
                    }

                    </tbody>
                </table>
            </div>
        );
    }
}

