
import React, { Component } from 'react';
import Sidenav from "./Sidenav";
import { getAPI } from "./service/api"

export default class MyCurriculum extends Component {

    constructor(props){
        super(props);

        this.state = {
            MyCurriculum: []
        }
    }

    componentWillMount(){
        getAPI("/myCurriculum")
            .then((response, fail) => {
                if(fail) {
                    this.setState({response: "An error happend"})
                }
                console.log("response", response.body);
                this.setState({myCurriculum: response.body})
            })
    }


    render() {

        console.log("MYCURRICULUM:", this.state.myCurriculum);

        // her styles "kategorierne" i "Books"
        const thStyles = {
            textAlign: "left",
            backgroundColor: "#333",
            color: "#fff",
            padding: "10px",
            fontSize: "20px"
        };
        const tdStyles= {
            border: "1px solid #dddddd",
            textAlign: "left",
            padding: "8px"
        };
        return (
            <div style={{backgroundColor: "white"}}>

                <Sidenav/>
                <div>
                    <h1 style={{textAlign: "center", fontSize: "50px"}}>Mit semester</h1>
                    <table style={{width:"100%"}}>
                        <tbody>
                        <tr>
                            <th style={thStyles}>Title</th>
                            <th style={thStyles}>Version</th>
                            <th style={thStyles}>ISBN</th>
                            <th style={thStyles}>Price (AB)</th>
                            <th style={thStyles}>Price (SAXO)</th>
                            <th style={thStyles}>Price (CDON)</th>
                            <th style={thStyles}>Publisher</th>
                            <th style={thStyles}>Author</th>
                        </tr>
                        {
                            this.state.myCurriculum.map((book) => {
                                return (
                                    <tr>
                                        <td style={tdStyles}>{book.title}</td>
                                        <td style={tdStyles}>{book.version}</td>
                                        <td style={tdStyles}>{book.ISBN}</td>
                                        <td style={tdStyles}>{book.priceAB}</td>
                                        <td style={tdStyles}>{book.priceSAXO}</td>
                                        <td style={tdStyles}>{book.priceCDON}</td>
                                        <td style={tdStyles}>{book.publisher}</td>
                                        <td style={tdStyles}>{book.author}</td>
                                    </tr>
                                )
                            })
                        }

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
