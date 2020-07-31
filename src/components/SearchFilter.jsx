import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import FilterItem from "./FilterItem"

// Maybe make a JSON file for this
var light = {
    title: 'Light',
    type: 'range',
    param: 'light',
    values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
}

var leafColor = {
    title: 'Leaf Color',
    type: 'filter',
    param: 'leaf_color',
    values: ['white', 'pink', 'red', 'orange', 'yellow',
             'green', 'blue', 'purple'],
}

var params = {
    light: light,
    leafColor: leafColor
}

// *****************************************************

// Wrapper component to hold a list of buttons that open and close
// to show a list of FilterItems with checkboxes that update what the
// search should be filtered on.
class SearchFilter extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            filter: {}
        }

        this.handleCheckBox = this.handleCheckBox.bind(this)
    }

    // Get the current filter obj from this class and update it
    // depending on the value that is passed in. 
    updateFilters(event){
        let obj = this.state.filter
        const param = event.target.name
        const currentVal = event.target.value
        if(event.target.name in obj){
            const keyVal = Object.keys(obj[param])[1] // The object key 'value'
            // Update an existing objects filter value array (Checked)
            if(!obj[param][keyVal].includes(currentVal)){
                obj[param][keyVal].push(currentVal)
            }
            // Remove the value from the filter value array if it already exists (Uncheck)
            else{
                const index = obj[param][keyVal].indexOf(currentVal)
                if(index >= 0)
                    obj[param][keyVal].splice(index, 1)
            }
        }
        else {
            // If the object does not exist create a new object using
            // the parameter name then add it's query tag and the first value of
            // the array.
            obj[param] = {
                filter: event.target.id,
                values: [currentVal],
            }
        }

        return obj
    }

    // Handle the event when a checkbox is checked or uncked in FilterItem
    handleCheckBox(event) {
        const obj = this.updateFilters(event)
        this.setState(() => ({
            filter: obj
        }))
    }

    // Render each filter item based on the objects at the top of this file.
    renderList() {
        return (
            Object.keys(params).map((key, index) =>
                <FilterItem 
                    key={index}
                    obj={params[key]}
                    handleCheck={this.handleCheckBox}
                >
                </FilterItem>
            )
        )
    }

    render() {
        return(
            <Container className="filter-container">
                <Row>
                    <Col>Filter</Col> 
                    <Col as="button">Reset</Col>
                    {this.renderList()}
                </Row>
            </Container>
        )
    }
}

export default SearchFilter