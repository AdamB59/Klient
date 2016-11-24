
import React, { Component } from 'react';
import Sidenav from "./Sidenav"
import { getAllCurriculum } from "./service/api"

export default class Curriculum extends Component {

    constructor(props){
        super(props);

        this.state = {
            curriculum: []
        }
    }

    componentWillMount(){
        getAllCurriculum("/curriculum")
            .then((response, fail) => {
                if(fail) {
                    this.setState({response: "An error happend"})
                }
                console.log("response", response.body)
                this.setState({curriculum: response.body})
            })
    }

    render() {

        console.log("CURRICULUM:", this.state.curriculum)

        const thStyles = {
            textAlign: "left",
            backgroundColor: "#333",
            color: "#fff",
            padding: "10px",
            fontSize: "20px"
        }
        const tdStyles= {
            border: "1px solid #dddddd",
            textAlign: "left",
            padding: "8px"
        }

        return (
            <div style={{backgroundColor: "white"}}>

                <Sidenav/>
                <div>
                    <h1 style={{textAlign: "center", fontSize: "50px"}}>Semester</h1>
                    <table style={{width:"100%"}}>
                        <tbody>
                        <tr>
                            <th style={thStyles}>University</th>
                            <th style={thStyles}>Education</th>
                            <th style={thStyles}>Semester</th>
                        </tr>
                        {
                            this.state.curriculum.map((curriculum) => {
                                return (
                                     // husk navnene skal have nøjagtig samme navn som der står i objektet
                                    <tr>
                                        <td style={tdStyles}>{curriculum.school}</td>
                                        <td style={tdStyles}>{curriculum.education}</td>
                                        <td style={tdStyles}>{curriculum.semester}</td>
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

