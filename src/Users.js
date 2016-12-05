
import React, { Component } from 'react';
import Sidenav from "./Sidenav"
import { getAllUsers, createUser } from "./service/api"

export default class Books extends Component {

    constructor(props){
        super(props);

        this.state = {
            users: [],
            username: "",
            password: "",
            fistname: "",
            lastname: "",
            email: "",
            usertype: 0

        }
    }


    // test push


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
        const { firstname, lastname, password, username, email, usertype} = this.state;
        // stopper browseren i at refreshe siden.
        e.preventDefault()
        console.log("username:", username)
        console.log("password:", password)
        console.log("firstname:", firstname)
        console.log("lastname:", lastname)
        console.log("email:", email)
        console.log("usertype:", usertype)


        createUser("/user", {
            First_Name: firstname,
            Last_Name: lastname,
            Username: username,
            Email:email,
            Password:password,
            Usertype:usertype
        }).then((response)=> {
            console.log("RES ADD USER", response)
        })

    }

    // if (userType = 1) {
    // userType = "Standard";
    // } else {
    // userType = "Admin";
// }

    render() {

        // her styles "overskrifterne" på "Users"
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
        return (
            <div>
                <Sidenav/>
                <form onSubmit={this.submit.bind(this)}>
                    <div><label>Firstname</label><input required type="text" placeholder="firstname"  onChange={(e) => this.setState({firstname: e.target.value})} value={this.state.firstname}/></div>
                    <div><label>Lastname</label><input required type="text" placeholder="lastname"  onChange={(e) => this.setState({lastname: e.target.value})} value={this.state.lastname}/></div>
                    <div><label>Email</label><input required type="email" placeholder="email"  onChange={(e) => this.setState({email: e.target.value})} value={this.state.email}/></div>
                    <div><label>Username</label><input required type="text" placeholder="username"  onChange={(e) => this.setState({username: e.target.value})} value={this.state.username}/></div>
                    <div><label>password</label><input required type="password" placeholder="password" onChange={(e) => this.setState({password: e.target.value})}value={this.state.password}/></div>
                    <div><label>User type</label>
                        <select required value={this.state.usertype}>
                            <option value={1}>Admin</option>
                            <option value={0}>Regular</option>
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
                        this.state.users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td style={tdStyles}>{user.firstName}</td>
                                    <td style={tdStyles}>{user.lastName}</td>
                                    <td style={tdStyles}>{user.userName}</td>
                                    <td style={tdStyles}>{user.email}</td>
                                    <td style={tdStyles}>{user.password}</td>
                                    <td style={tdStyles}>{user.userType.toString()}</td>

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

