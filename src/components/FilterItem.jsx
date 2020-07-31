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
        }

        this.handleButton = this.handleButton.bind(this)
    }

    // Open and close the button on button press
    handleButton(){
        this.setState(() =>({
            open: !this.state.open
        }))
    }

    // Render the checkboxes and it's values
    renderList(){
        return (
            Object.keys(this.state.filterObj['values']).map((key, index) =>
                <Row key = {index} >
                    <Col>{this.state.filterObj['values'][key]}</Col>
                    <Col>
                        <input 
                            type="checkbox"
                            value={this.state.filterObj['values'][key]}
                            id={this.state.filterObj['type']}
                            name={this.state.filterObj['param']}
                            onChange={this.props.handleCheck}
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