/**
 * Created by AdamBjergvang on 06/12/2016.
 */

import React from "react";

export default class EditingBook extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            publisher: props.publisher || "", // "the initial value" :-)
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

        // Denne function er bare en sikkerhed for at hvis der senere bruges asyncrone kald ift. data at det stadig vil virke korrekt :-)
        console.log("PROPS:", nextProps)
        this.setState({
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
        console.log("This.props:", this.props)
        return (
            <tr>
                <td style={this.props.tdStyles}>
                    <input value={this.state.publisher}
                           onChange={(e) => {this.setState({publisher: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.title}
                           onChange={(e) => {this.setState({title: e.target.value})}} />
                </td>
                <td style={this.props.tdStyles}>
                    <input value={this.state.author}
                           onChange={(e) => {this.setState({author: e.target.value})}} />
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
                    <button onClick={() => {console.log("SAVE FUNC GOES HERE LATER")}}>Save</button>
                    <button onClick={() => this.props.cancelEdit()}>Cancel</button>
                </td>
            </tr>
        )
    }
}