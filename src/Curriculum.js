
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
            <div style={{backgroundColor: "white"}}>

                <Sidenav/>
                <div>
                    <h1 style={{textAlign: "center", fontSize: "50px"}}>___________________________________________________________</h1>
                    <h2 style={{textAlign: "center", fontSize: "50px", color: "red"}}>Semester</h2>
                    <h3 style={{textAlign: "center", fontSize: "25px"}}> - This is a list showing all semesters - </h3>
                    <h4 style={{textAlign: "center", fontSize: "25px"}}> </h4>
                    <h5 style={{textAlign: "center", fontSize: "25px"}}> </h5>
                    <h6 style={{textAlign: "center", fontSize: "25px"}}> </h6>
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
                                     // husk at nedenstående navne skal hedde nøjagtig samme som der står i objektet.
                                     // Man kan eksempelvis ikke ændre "school" til "university" eller lignende.
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

