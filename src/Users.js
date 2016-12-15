
import React, { Component } from 'react';
import Sidenav from "./Sidenav"
import { getAPI, postAPI } from "./service/api"
import EditingUser from "./EditingUser";
import { encryptDecryptXOR } from "./service/Xor"

export default class Books extends Component {

    constructor(props){
        super(props);

        this.state = {
            users: [],
            fistName: "",
            lastName: "",
            password: "",
            userName: "",
            email: "",
            userInEditing: false,
            userType: 0 //Default er typen "regular" og ikke Admin
        }
    }

    componentWillMount(){
        getAPI("/user")
            .then((response, fail) => {
                if(fail) {
                    this.setState({response: "An error happend"})
                }
                console.log("response", encryptDecryptXOR(response.body, localStorage.getItem("token")))
                this.setState({users: JSON.parse(encryptDecryptXOR(response.body, localStorage.getItem("token")))})
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


        postAPI("/user", {
            // Disse variabel navne skal hedde det samme som over på serveren, fx. man kan ikke skrive "E-mail" istedet for "email".
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
    // her bliver der genereret hvilken type bruger, som der skal oprettes (admin eller regular)
    generateUserType(userType){
        if(userType === 1){
            return "Admin user"
        } else if(userType === 0){
            return "Regular user"
        }
        return "Unkown user type"
    }

    cancelEdit = () => {
        this.setState({userInEditing: false})
    }

    // Metoden er den samme som på serveren
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

        // Her oprettes der labels til brugeren når der skal oprettes en ny bruger - disse labels giver mulighed for at indtaste navn, email osv.
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
                            <option value={1}>Admin</option>
                            <option value={0}>Regular</option>
                        </select>
                    </div>

                    <button type="submit">Create user</button>
                </form>

                <h1 style={{textAlign: "center", fontSize: "50px"}}>______________________________________________________________</h1>
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
                        <th style={thStyles}>Save / Delete </th>
                    </tr>
                    {
                        this.state.users.map((user, index) => {
                            if(this.state.userInEditing === user.userID) {
                                return (
                                    <EditingUser
                                        key={index}
                                        cancelEdit={this.cancelEdit}
                                        tdStyles={tdStyles}
                                        {...user}
                                    />
                                )
                            }
                            // nedenstående variabler skal være de samme som på serveren i "User"
                            return (
                                <tr key={index}>
                                    <td style={tdStyles}>{user.firstName}</td>
                                    <td style={tdStyles}>{user.lastName}</td>
                                    <td style={tdStyles}>{user.userName}</td>
                                    <td style={tdStyles}>{user.email}</td>
                                    <td style={tdStyles}>{user.password}</td>
                                    <td style={tdStyles}>{this.generateUserType(user.userType)}</td>
                                    <td style={tdStyles}>
                                        <button onClick={() => {this.setState({userInEditing:user.userID})}}>Edit</button>
                                        <button>Delete</button>
                                    </td>
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

