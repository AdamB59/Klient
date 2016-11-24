
import React, { Component } from 'react';

export default class Sidenav extends Component {

    constructor(props){
        super(props);

        this.state = {

        }
    }

    render() {

        const btnStyle= {
            backgroundColor: "#333",
            color: "#fff",
            padding: "30px",
            border: "2px solid white",
            display: "inline-block"
        }

        return (
            <div style={{

                height: "100%",
                backgroundColor: "#fff"}}>
                <ul style={{listStyle: "none", padding: "0px"}}>
                    <li style={btnStyle}><a style={{color: "#fff"}} href="/books">Books</a></li>
                    <li style={btnStyle}><a style={{color: "#fff"}} href="/users">Users</a></li>
                    <li style={btnStyle}><a style={{color: "#fff"}} href="/curriculum">Semester</a></li>
                    <li style={btnStyle}><a style={{color: "#fff"}} href="/books">Hent min pensumliste</a></li>
                </ul>
            </div>
        );
    }
}