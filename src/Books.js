
import React, { Component } from 'react';
import Sidenav from "./Sidenav";
import { getAllBooks, getBooksByCurriculum, getCurriculumId } from "./service/api"

const studieRetninger = [
    { title: "HA(it)"},
    { title: "HA(mat)"},
    { title: "HA(jur)"},
    { title: "Cand.merc.it."},
    { title: "Cant.merc.mat."},
    { title: "Cand.merc.jur."},
    {title: "HA(psyk)"},
    { title: "Cand.merc.psyk."},
    { title: "HA(fil)"},
    { title: "Cand.merc.fil."}
]
const semestre = [
    { title: "1"},
    { title: "3"},
    { title: "5"}
]

function switchStudie(x) {
    console.log("X: " + x)
    switch (x) {
        case "1":
            return "Ha(it)"
            break;
        case "2":
            return "Ha(mat)"
            break;
        case "3":
            return "Ha(jur)"
            break;
        case "4":
            return "Cand.merc.it."
            break;
        case "5":
            return "Cand.merc.mat."
            break;
        case "6":
            return "Cand.merc.jur."
            break;
        case "7":
            return "HA(psyk)"
            break;
        case "8":
            return "Cand.merc.psyk."
            break;
        case "9":
            return "HA(fil)"
            break;
        case "10":
            return "Cand.merc.fil."
            break;
        default:
            return "1"

    }
}

export default class Books extends Component {

    constructor(props){
        super(props);


        this.state = {
            books: [],
            studieRetning: "Ha(it)",
            semester: "1"
        }
    }

    componentWillMount(){
         getAllBooks("/book")
             .then((response, fail) => {
                 if(fail) {
                     this.setState({response: "An error happend"})
                 }
                 console.log("response", response.body);
                 this.setState({books: response.body})
             })

    }
    // Function til at kalde serveren når værdien i dropdownen ændres
    // denne her function kaldes hver gang du ændre værdien i en af de to dropdowns
    updateList(e, type) {
        // laver et object (egentlig bare for at gøre det lidt nemmere, kunne gøres anderledes)
        let obj = {};
        // sætter objects key'en = værdien i dropdown du lige valgte så fx
        // {studieRetning: "Ha(jur)"} sådan ville objectet se ud hvis du skiftede
        // studieRetnings dropdownen og valgte "HA(jur)"
        obj[type] = e.target.value;
        // Her ændres state
        // fra e.g.
        // studieRetning: "Ha(it)",
        // semester: "1"
        // til
        // studieRetning: "Ha(jur)",
        // semester: "1"

        this.setState(obj, () => {
            // dernæst API call til serveren og med samme eksempel ville se således ud:
            // /curriculum/"HA(jur)"&1
            getBooksByCurriculum(`/curriculum/"${this.state.studieRetning}"&${this.state.semester}`).then((response)=> {
                // inde i denne function venter vi på at serveren svarer og derefter
                // mutere vores array af bøger til det nye array af bøger vi får fra serveren
                // ved dette kald (url)
                this.setState({books: response.body})
            })
        })


    }

    render() {

        console.log("BOOKS:", this.state.books)

        // Her styles kategorierne i "Books"
        const thStyles = {
            textAlign: "center",
            backgroundColor: "#333",
            color: "red",
            padding: "10px",
            fontSize: "20px",
            fontStyle: ""

        }
        const tdStyles= {
            border: "1px solid #dddddd",
            textAlign: "center",
            padding: "8px",
            // table: "tableStriped",


        }
        return (
            <div style={{backgroundColor: "white"}}>

                <Sidenav/>
                <div>
                    <h1 style={{textAlign: "center", fontSize: "50px"}}>___________________________________________________________</h1>
                    <h2 style={{textAlign: "center", fontSize: "50px", color: "red"}}>Books</h2>
                    <h3 style={{textAlign: "center", fontSize: "25px"}}> - This is a list showing every single book we have - </h3>
                    <h4 style={{textAlign: "center", fontSize: "25px"}}> - Please choose your education and semester of intrest to narrow down the list - </h4>
                    <h5 style={{textAlign: "center", fontSize: "25px"}}> </h5>
                    <h6 style={{textAlign: "center", fontSize: "25px"}}> </h6>
                    <h7 style={{textAlign: "center", fontSize: "25px"}}> </h7>

                    {/* DROPDOWN til at vælge studieRetning */}
                    <select
                        value={this.state.studieRetning}
                        onChange={(e) => this.updateList(e, "studieRetning")}>
                        {studieRetninger.map((studieRetning, index) => {
                            return (
                                // value er = navnet på studieretning man vælger
                                <option key={index} value={studieRetning.title}>{studieRetning.title}</option>
                            )
                        })}
                    </select>

                    {/* DROPDOWN til at vælge semester */}
                    <select
                        value={this.state.semester}
                        onChange={(e) => this.updateList(e, "semester")}>
                        {semestre.map((semester, index) => {
                            return (
                                <option key={index} value={semester.title}>{semester.title}</option>)
                        })}


                    </select>
                    <table style={{width:"100%"}}>
                        <tbody>
                        <tr>
                            <th style={thStyles}>Title</th>
                            <th style={thStyles}>Version</th>
                            <th style={thStyles}>ISBN</th>
                            <th style={thStyles}>Price (Academic Books) </th>
                            <th style={thStyles}>Price (SAXO) </th>
                            <th style={thStyles}>Price (CDON) </th>
                            <th style={thStyles}>Publisher</th>
                            <th style={thStyles}>Author</th>
                        </tr>
                        {
                            // Ovenstående tabel giver mulighed for at ændre navn på kategorierne.
                            // De har fået samme navn som det der står i databasen.

                            this.state.books.map((book, index) => {
                                return (
                                    <tr key={index}>
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