
import React, { Component } from 'react';
import Sidenav from "./Sidenav"
import { getAPI } from "./service/api"
import { encryptDecryptXOR } from "./service/Xor"

export default class Curriculum extends Component {

    constructor(props){
        super(props);

        this.state = {
            curriculum: []
        }
    }

    // enten kan denne metode "faile" eller være en "success".
    componentWillMount(){
        getAPI("/curriculum")
            .then((response, fail) => {
                if(fail) {
                    this.setState({response: "An error happend"})
                }
                console.log("response", JSON.parse(encryptDecryptXOR(response.body, localStorage.getItem("token"))))
                this.setState({curriculum: JSON.parse(encryptDecryptXOR(response.body, localStorage.getItem("token")))})
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

        // Nendenstående kode benyttes til at style siden "Semester", som er blot en side der viser de forskellige uddannelser, som der er bøger til i databasen.
        return (
            <div style={{backgroundColor: "white"}}>

                <Sidenav/>
                <div>
                    <h1 style={{textAlign: "center", fontSize: "50px"}}>_______________________________________________________</h1>
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
                                     // HUSK: Nedenstående variabler skal hedde nøjagtigt det samme som det der står på serveren i "curriculum".
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

