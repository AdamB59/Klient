/**
 * Created by AdamBjergvang on 06/12/2016.
 */

import React from "react";
import { putAPI } from "./service/api"

export default class EditingUser extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            userID: props.userID || null,
            firstName: props.firstName || "",
            lastName: props.lastName ||"",
            userName: props.userName ||"",
            email: props.email ||"",
            password: props.password ||"",
            userType: props.userType || 0
        }
    }

    componentWillReceiveProps(nextProps){

        // Denne function er bare en sikkerhed for at hvis der senere bruges asyncrone kald ift. data at det stadig vil virke korrekt :-)
        console.log("PROPS:", nextProps)
        this.setState({
            userID: nextProps.userID,
            firstName: nextProps.firstName,
            lastName: nextProps.lastName,
            userName: nextProps.userName,
            email: nextProps.email,
            password: nextProps.password,
            userType: nextProps.userType,
        })
    }

    render(){

        const { userID, firstName, lastName, userName, email, password, userType} = this.state;
        console.log("Tis.props:", this.props)
        return (
            <tr>
                <td style={this.props.tdStyles}>
                    <input value={this.state.firstName}
                           onChange={(e) => {this.setState({firstName: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.lastName}
                           onChange={(e) => {this.setState({lastName: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.userName}
                           onChange={(e) => {this.setState({userName: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.email}
                           onChange={(e) => {this.setState({email: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.password}
                           onChange={(e) => {this.setState({password: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <select value={this.state.usertype}>
                        <option value={1}>Admin</option>
                        <option value={0}>Regular</option>
                    </select>
                </td>
                <td style={this.props.tdStyles}>
                    <button onClick={() => {
                        putAPI("/user/"+this.props.userID, {
                            firstName,
                            lastName,
                            userName,
                            email,
                            password,
                            userType,
                        }).then((response) => {
                            console.log("SUCCESS USER SAVED");
                            this.props.updateUser(this.state)
                            this.props.cancelEdit()
                        }).catch((err) => {
                            alert("you don't have permission to edit this")
                        })
                    }}>Save</button> {}
                    <button onClick={() => this.props.cancelEdit()}>Cancel</button>
                </td>
            </tr>
        )
    }
}