import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

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
                <Container key={index} className="choice-con" fluid="true">
                    <Row>
                        <Col 
                            as="button" 
                            onClick={(event) => this.handleButton(event, index)}
                            className='choice-btn secondary'
                        >{filters[key].title}
                        </Col>
                        {index === this.state.clicked && this.state.open 
                            && this.renderCheckBox(filters, key)}
                    </Row>
                </Container>
            )
        )
    }


    render() {
        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Click the magnifying glass to submit your search!
            </Tooltip>
        );

        return(
            <Row className='d-flex justify-content-center'>
               <OverlayTrigger
                    placement="top"
                    delay={{ show: 100, hide: 100 }}
                    overlay={renderTooltip}
                >
                <Dropdown className='dropdown-light'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className='secondary-background primary accent-border'>
                        Search by Category
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item className='drop-menu' href="#/action-1">Low Sunlight</Dropdown.Item>
                        <Dropdown.Item className='drop-menu' href="#/action-2">Medium Sunlight</Dropdown.Item>
                        <Dropdown.Item className='drop-menu' href="#/action-2">Lots of Sunlight</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item className='drop-menu' href="#/action-2">Low Humidity</Dropdown.Item>
                        <Dropdown.Item className='drop-menu' href="#/action-2">Medium Humidity</Dropdown.Item>
                        <Dropdown.Item className='drop-menu' href="#/action-2">High Humidity</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </OverlayTrigger>
            </Row>
        )
    }
}

/*
    render() {
        return(
            <Container className="root-con" fluid="true">
                <Row className="f-title">Filter</Row>

                <Row className="op-con">
                    <Col className="f-rad">
                        <input 
                            type="radio" 
                            id="lower" 
                            name="option"
                            onClick={(e) => this.props.handleOrder(e)}
                            defaultChecked
                            disabled={!this.state.open ? true : false}
                        />
                        <label htmlFor="lower">Lower</label>
                    </Col>
                    <Col className="f-rad">
                        <input 
                            type="radio" 
                            id="higher" 
                            name="option"
                            onClick={(e) => this.props.handleOrder(e)}
                            disabled={!this.state.open ? true : false}
                        />
                        <label htmlFor="higher" className="lab-mid">Higher</label>
                    </Col>
                    <Col className="f-rad">
                        <input 
                            type="radio" 
                            id="range" 
                            name="option"
                            onClick={(e) => this.props.handleOrder(e)}
                            disabled={!this.state.open ? true : false}
                        />
                        <label htmlFor="range">Range</label>
                    </Col>
                </Row>
                {this.renderList()}
            </Container>
        )
    }
}
*/
export default SearchFilter
