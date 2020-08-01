import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// The content shown under the list of buttons in SearchFilter class.
// The contents should be a list of checkboxes with corresponding values
// based on the object that is passed in from the parent.
class FilterItem extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            filterObj: this.props.obj,
            open: false,
            checked: [],
        }

        this.handleButton = this.handleButton.bind(this)
        this.handleCheck = this.handleCheck.bind(this)
    }

    // Open and close the button on button press
    handleButton(event){
        event.preventDefault()
        this.setState(() =>({
            open: !this.state.open
        }))
    }

    handleCheck(event, value){
        this.props.handleCheck(event)

        const current = this.state.checked
        const isChecked = this.isChecked(value)

        // Update the condition of indivisual check boxes
        // Checked - add to list, Unchecked - remove from list
        if(isChecked){
            const index = current.indexOf(value)
            current.splice(index, 1)        
        } else {
            current.push(value)        
        }

        this.setState(() =>({
            checked: current,
        }))
    }

    // Check if the current value is in the checked list
    isChecked(value){
        const current = this.state.checked
        if(current.includes(value))
            return true
        else
            return false
    }

    // Render the checkboxes and it's values
    renderList(){
        const filterObj = this.state.filterObj
        return (
            Object.keys(filterObj['values']).map((value, index) =>
                <Row key = {index} >
                    <Col>{filterObj['values'][value]}</Col>
                    <Col>
                        <input 
                            type="checkbox"
                            value={filterObj['values'][value]}
                            id={filterObj['type']}
                            name={filterObj['param']}
                            onChange={(event) => 
                                this.handleCheck(event, filterObj['values'][value])}
                            checked={this.isChecked(filterObj['values'][value])}
                        />
                    </Col>
                </Row>
            )
        )
    }

    render() {
        return (
            <Container>
                <Row as="button" onClick={this.handleButton}>{this.state.filterObj['title']}</Row>
                {this.state.open && this.renderList()}
            </Container>
        )
    }
}

export default FilterItem