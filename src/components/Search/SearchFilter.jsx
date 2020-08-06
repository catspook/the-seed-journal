import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const filters = require('./search_filter.json')

// Wrapper component to hold a list of buttons that open and close
// to show a list of FilterItems with checkboxes that update what the
// search should be filtered on.
class SearchFilter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            clicked: null,
            open: false,
            filter: {},
            single: 0,
        }
        this.handleCheckBox = this.handleCheckBox.bind(this)
        this.handleButton = this.handleButton.bind(this)
    }

    // Get the current filter obj from this class and update it
    // depending on the value that is passed in. 
    updateFilters(event){
        let obj = this.state.filter
        const param = event.target.className
        const currentVal = event.target.value
        const name = event.target.name
        var values =[]
        if(name === "range"){
            values = [obj[param].values[0], currentVal]
        }
        else{
            values = [currentVal]
        }

        obj[param] = {
            type: event.target.id,
            values: values,
        }

        this.setState(() => ({
            filter: obj,
        }))
        console.log(obj)
    }

    // Handle the event when a checkbox is checked or uncked in FilterItem
    handleCheckBox(event, index) {
        if(event.target.name === "single"){
            this.setState(() => ({
                single: index,
            }))
        }
        this.updateFilters(event)
        this.props.updateFilterConditions(this.state.filter)
    }

    handleButton(event, index){
        event.preventDefault()

        // Reset filter on button press
        this.setState(() => ({
            filter: {},
            single: 0,
        }))

        const empty_obj ={}
        this.props.updateFilterConditions(empty_obj)

        if(index === this.state.clicked){
            this.setState(() => ({
                clicked: index,
                open: !this.state.open
            }))
        }else{
            this.setState(() => ({
                clicked: index,
                open: true
            }))
        }
    }

    disableRange(index){
        var disable = false
        if(this.props.option !== "range"){
            disable = true
        }
        else {
            const key = Object.keys(this.state.filter)[0]
            if(!this.state.filter[key]){
                disable = true
            }
            else{
                if(this.state.single >= index)
                    disable = true
            }
        }

        return disable
    }

    renderCheckBox(filters, key){
        return(
            filters[key].values.map((value, index) => 
                <Container key={index}>
                    <Row>
                        <Col>{filters[key]['values'][index]}</Col>
                        <Col>
                            <input 
                                onChange={(e) => this.handleCheckBox(e, index)}
                                type="radio"
                                value={filters[key].values[index]}
                                id={filters[key]['type']}
                                className={filters[key]['param']}
                                name={"single"}
                            />
                        </Col>
                        <Col>
                            <input 
                                onChange={(e) => this.handleCheckBox(e, index)}
                                type="radio"
                                value={filters[key].values[index]}
                                id={filters[key]['type']}
                                className={filters[key]['param']}
                                name={"range"}
                                disabled={this.disableRange(index)}
                            />
                        </Col>
                    </Row>
                </Container>
            )
        )
    }

    // Render each filter item based on the objects at the top of this file.
    renderList() {
        return (
            Object.keys(filters).map((key, index) =>
                <Container key={index}>
                    <Row>
                        <Col 
                            as="button" 
                            onClick={(event) => this.handleButton(event, index)}
                        >
                            {filters[key].title}
                        </Col>
                        {index === this.state.clicked && this.state.open 
                            && this.renderCheckBox(filters, key)}
                    </Row>
                </Container>
            )
        )
    }

    render() {
        return(
            <Container className="filter-container">
                <Row>
                    <Col>Show</Col> 
                    <Col>
                        <input 
                            type="radio" 
                            id="lower" 
                            name="option"
                            onClick={(e) => this.props.handleOrder(e)}
                            defaultChecked
                        />
                        <label htmlFor="lower">Lower</label>
                    </Col>
                    <Col>
                        <input 
                            type="radio" 
                            id="higher" 
                            name="option"
                            onClick={(e) => this.props.handleOrder(e)}
                        />
                        <label htmlFor="higher">Higher</label>
                    </Col>
                    <Col>
                        <input 
                            type="radio" 
                            id="range" 
                            name="option"
                            onClick={(e) => this.props.handleOrder(e)}
                        />
                        <label htmlFor="range">Range</label>
                    </Col>
                    {this.renderList()}
                </Row>
            </Container>
        )
    }
}

export default SearchFilter