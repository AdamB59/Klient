
import React, { Component } from 'react';
import Sidenav from "./Sidenav"
import { getAllUsers } from "./service/api"

export default class Books extends Component {

    constructor(props){
        super(props);

        this.state = {
            users: []
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

    render() {

        // her styles "overskrifterne" på "Users"
        const thStyles = {
            textAlign: "left",
            backgroundColor: "#333",
            color: "white",
            padding: "10px",
            fontSize: "20px"
        }
        const tdStyles= {
            border: "1px solid #dddddd",
            textAlign: "left",
            padding: "8px"
        }
        return (
            <div>
                <Sidenav/>
                <h1>Users</h1>
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

