
import React, { Component } from 'react';
import Sidenav from "./Sidenav";
import { getAPI, deleteAPI } from "./service/api"
import EditingBook from "./EditingBook";

// dette er vores "konstanter", som er de uddannelser som man kan vælge mellem.
const studieRetninger = [
    { title: "HA(it)"},
    { title: "HA(mat)"},
    { title: "HA(jur)"},
    { title: "Cand.merc.it."},
    { title: "Cant.merc.mat."},
    { title: "Cand.merc.jur."},
    { title: "HA(psyk)"},
    { title: "Cand.merc.psyk."},
    { title: "HA(fil)"},
    { title: "Cand.merc.fil."}
]

// dette er vores "konstanter", som er de semestre som er forbundet til ét af ovenstående uddannelser, som brugeren kan vælge.
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
            semester: "1",
            bookInEditing: false, // "bookInEditing" kan enten være false eller være = "bookID" - den bliver aldrig true.
            userType: 1 //Default er "userType" Admin
        }
    }
    // ComponentWillMount = en metode der i React kaldes "LifeCycle method" og er normalt der hvor man kalder "GET" for at loade data ind.
    // "getAPI" er bare en metode til at kalde et GET-request til serveren, og i dette tilfælde ville det være GET "http://localhost:8080/server2_0_war_exploded/book"
    componentWillMount(){
         getAPI("/book")
             .then((response, fail) => {
                 if(fail) {
                     this.setState({response: "An error happend"})
                 }
                 console.log("response", response.body);
                 this.setState({books: response.body})
             })

    }

    submit = (e) => {
        const { School, Education, Semester, publisher, title, author, version, ISBN, priceAB, priceSAXO, priceCDON } = this.state;

        // stopper browseren i at refreshe siden.
        e.preventDefault()

        console.log("School:", school)
        console.log("Education:", education)
        console.log("Semester:", semester)

        console.log("publisher:", publisher)
        console.log("title:", title)
        console.log("author:", author)
        console.log("version:", version)
        console.log("ISBN:", ISBN)
        console.log("priceAB:", priceAB)
        console.log("priceSAXO:", priceSAXO)
        console.log("priceCDON:", priceCDON)

        createBook("/book", {

            //de her variabel navne skal hedde det samme som på serveren, man kan ikke kalde disse for noget andet. Eksempelvis "The Titel" istedet for "title".
            School: school,
            Education: education,
            Semester: semester,

            publisher: publisher,
            title: title,
            author: author,
            version: version,
            ISBN: ISBN,
            priceAB: priceAB,
            priceSAXO: priceSAXO,
            priceCDON: priceCDON
        }).then((response)=> {
            console.log("RES ADD BOOK", response)
        })
        // then((response)=> {}), tager en paramter som kaldes en "callback function" og i den returnere den en variabel "response" som er serverens svar på et API kald.
        // I dette tilfælde ville serveren "svare" på om det lykkedes at tilføje det man sendte (en bog) til serveren eller ej.
    }

    cancelEdit = () => {
        console.log("should cancel edit")
        this.setState({bookInEditing: false})
    }

    // "updateList" er funktionen til at kalde serveren når værdien (uddannelse, semester) i dropdownen ændres.
    // Functionen kaldes hver gang du ændre værdien i én af de to dropdowns.
     updateList(e, type) {

        // "let obj" laver bare et objekt
        let obj = {};

        // Sætter objekts key'en = værdien i dropdown som man vælger
        // {studieRetning: "Ha(jur)"} sådan ville objektet se ud hvis man fx. skiftede til HA jur.
         obj[type] = e.target.value;

         // Her ændres "state"
        // fra fx.
        // studieRetning: "Ha(it)",
        // semester: "1"
        // til
        // studieRetning: "Ha(jur)",
        // semester: "1"
         this.setState(obj, () => {

             // Dernæst laves et "API kald" til serveren og med samme eksempel ville se således ud:
            // /curriculum/"HA(jur)"&1
             getAPI(`/curriculum/"${this.state.studieRetning}"&${this.state.semester}`).then((response)=> {

                 // inde i denne funktion venter vi på at serveren svarer og derefter
                // mutere vores array af bøger til det nye array af bøger vi får fra serveren
                // ved dette kald (url)
                 this.setState({books: response.body})
             })
         })
    }

    updateBook = (updatedBook) => {
        let newBookList = this.state.books.map((book) => {
           return book.bookID === updatedBook.bookID ?
                 updatedBook
               :
               book
        })
        this.setState({books: newBookList})
    }

    render() {

        console.log("BOOKS:", this.state.books)

        // Her styles kategorierne i "Books"
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
        // table: "tableStriped",
        }
        // Nedenfor styles siden "Books" - meget amatør agtigt, men pt. er det ligemeget
        return (
            <div style={{backgroundColor: "white"}}>

                <Sidenav/>
                <div>
                    <h1 style={{textAlign: "center", fontSize: "50px"}}>______________________________________________________________</h1>
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
                            <th style={thStyles}>Save / Edit</th>
                        </tr>
                        {
                            // Ovenstående tabel giver mulighed for at ændre navn på "kategorierne" i Books.
                            // De har fået samme navn som det der står i databasen.

                            // ".map" itererer over array'et af bøger, som virker lidt ligesom et "for loop"
                            // (book) = hver bog i array'et som den looper igennem, og (index) er bogens plads i array'en
                            // dvs. at hvis index = 9, så er det bog nummer 10
                            this.state.books.map((book, index) => {

                                // check for at sætte den række du trykker på bliver sat som i "edit mode"
                                if(this.state.bookInEditing === book.bookID) {

                                    // {...book} er bare en "shortcut" for at gå ét level ind i et objekt
                                    // Så alt "inde i" book objektet bliver sendt ind i <EditingBook /> componenten.
                                    return (
                                        <EditingBook
                                            key={index}
                                            updateBook={this.updateBook}
                                            cancelEdit={this.cancelEdit}
                                            tdStyles={tdStyles}
                                            {...book}
                                        />
                                    )
                                }

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
                                        <td style={tdStyles}>
                                            <button onClick={() => {this.setState({bookInEditing:book.bookID})}}>Edit</button>
                                            <button onClick={() => {
                                                deleteAPI("/book/"+book.bookID).then((response) => {
                                                    let updatedBookList = this.state.books.filter((mapBook)=> mapBook.bookID !== book.bookID);
                                                    this.setState({books: updatedBookList})
                                                })

                                            }}>Delete</button>
                                        </td>
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