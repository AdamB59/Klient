
import React, { Component } from 'react';

export default class Sidenav extends Component {

    constructor(props){
        super(props);

        this.state = {}
    }

    // Denne klasse indeholder stortset kun funktionaliteten til at lave nye knapper
    render() {

        const btnStyle= {
            backgroundColor: "#333",
            color: "#fff",
            padding: "40px",
            border: "2px solid white",
            display: "inline-block"
        }

        return (
            <div style={{
            // Her styles knapperne (som kan ses øverst på skærmen når man er logget ind) og ordene inde i dem, som jeg eksempelvis har jeg stylet til rødt.
                height: "100%",
                backgroundColor: "#fff"}}>
                <ul style={{listStyle: "none", padding: "0px", textAlign: "center"}}>
                    <li style={btnStyle}><a style={{color: "red"}} href="/books">Books</a></li>
                    <li style={btnStyle}><a style={{color: "red"}} href="/users">Users</a></li>
                    <li style={btnStyle}><a style={{color: "red"}} href="/curriculum">Semester</a></li>
                    <li style={btnStyle}><a style={{color: "red"}} href="/">Sign out</a></li>

                </ul>
            </div>
        );
    }
}