import React from "react";
import Row from 'react-bootstrap/Row'
import Dropdown from 'react-bootstrap/Dropdown'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// Wrapper component to hold a list of buttons that open and close
// to show a list of FilterItems with checkboxes that update what the
// search should be filtered on.
class SearchFilter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            clicked: null,
            open: false,
            single: 0,
            category: ['None', 'Low Sunlight', 'Medium Sunlight', 'Lots of Sunlight', 'Low Humidity', 'Medium Humidity', 'High Humidity'],
            title: 'Search by Category'
        }
    }

    handleSelect(event){
        const num = Number(event)
        let title = ''

        if(num === 0)
            title = "Search by Category"
        else
            title = this.state.category[event]
        this.setState(() => ({
            title: title
        }))
        this.props.handleFilter(num)
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

export default SearchFilter
