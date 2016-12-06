
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

    // enten kan dette metode blive en "fail" eller en "success".
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

        // Nendenstående kode benyttes til at style siden "Semester", som er blot en side som viser de forskellige uddannelser vi arbejder med, og som vi har bøger til.

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
                                     // Nedenstående variabler skal hedde nøjagtigt det samme, som det der står i objektet og som det der står på serveren under "model", "curriculum".
                                     // Man kan eksempelvis ikke ændre "school" til "university" eller lignende, de skal hedde det samme.
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

