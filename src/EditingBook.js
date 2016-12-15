/**
 * Created by AdamBjergvang on 06/12/2016.
 */

import React from "react";
import { putAPI } from "./service/api"


export default class EditingBook extends React.Component {
    constructor(props){
            super(props);

        this.state ={
            bookID: props.bookID ||"",
            publisher: props.publisher || "",
            title: props.title ||"",
            author: props.author ||"",
            version: props.version ||"",
            ISBN: props.ISBN ||"",
            priceAB: props.priceAB || "",
            priceSAXO: props.priceSAXO || "",
            priceCDON: props.priceCDON || ""
        }
    }

    componentWillReceiveProps(nextProps){

        // Denne function er bare en sikkerhed for at hvis der senere bruges asyncrone kald ift. data at det stadig vil virke korrekt
        console.log("PROPS:", nextProps)
        this.setState({
            bookID: nextProps.bookID ||"",
            publisher: nextProps.publisher,
            title: nextProps.title,
            author: nextProps.author,
            version: nextProps.version,
            ISBN: nextProps.ISBN,
            priceAB: nextProps.priceAB,
            priceSAXO: nextProps.priceSAXO,
            priceCDON: nextProps.priceCDON,
        })
    }

    render(){
        const { bookID, publisher, title, author, version, ISBN, priceAB, priceSAXO, priceCDON } = this.state;
        console.log("This.props:", this.props)
        return (
            <tr>
                <td style={this.props.tdStyles}>
                    <input value={this.state.title}
                           onChange={(e) => {this.setState({title: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.version}
                           onChange={(e) => {this.setState({version: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.ISBN}
                           onChange={(e) => {this.setState({ISBN: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.priceAB}
                           onChange={(e) => {this.setState({priceAB: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.priceSAXO}
                           onChange={(e) => {this.setState({priceSAXO: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.priceCDON}
                           onChange={(e) => {this.setState({priceCDON: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.publisher}
                           onChange={(e) => {this.setState({publisher: e.target.value})}} />
                </td>

                <td style={this.props.tdStyles}>
                    <input value={this.state.author}
                           onChange={(e) => {this.setState({author: e.target.value})}} />
                </td>

                <td style={this.props.tdStyles}>
                    <button onClick={() => {
                        putAPI("/book/"+bookID, {
                            publisher,
                            title,
                            author,
                            version,
                            ISBN,
                            priceAB,
                            priceSAXO,
                            priceCDON}).then((response) => {
                            console.log("SUCCESS BOOK SAVED");
                            this.props.updateBook(this.state)
                            this.props.cancelEdit()
                        }).catch((err) => {
                            alert("you don't have permission to edit this")
                        })
                        // ovenstående sørger for at personen får en "advarsel box" der fortæller, at de ikke har lov til at ændre værdierne i bogen  fordi de er type "regular"
                    }}>Save</button>
                    <button onClick={() => this.props.cancelEdit()}>Cancel</button>
                </td>
            </tr>
        )
    }
}