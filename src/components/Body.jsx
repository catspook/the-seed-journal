import React from "react";
import logo from '../images/logo.svg'; /*Place Holder image*/
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchBar from './SearchBar'
import SearchContent from './SearchContent'
import '../styles/Body.scss'

const names = require('./common_names.json')

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.plantList = JSON.parse(names)
        this.state = {
            searchValue: '',
            limit: 30, //Number of search results to show on browser
            start: 0, //Starting index of search results
            end: 30, //Ending index of search results
        }

        this.decrementSearchResults = this.decrementSearchResults.bind(this)
        this.incrementSearchResults = this.incrementSearchResults.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
    }

    // Decrement the search result by the limit
    // Only works if starting index is above 0
    decrementSearchResults(){
        if(this.state.start > 0) {
            this.setState(() => ({
                start: this.state.start - this.state.limit,
                end: this.state.end - this.state.limit,
            }))
        }
    }

    // Increment the search result by the limit
    // Only works if ending index is less than the total
    // search result length
    incrementSearchResults(length){
        if(this.state.end < length) {
            this.setState(() => ({
                start: this.state.start + this.state.limit,
                end: this.state.end + this.state.limit,
            }))
        }
    }

    // Change search value to true when eneter is pressed (in search bar)
    // and reset search index on new search
    handleEnter(event, value) {
        this.setState(() => ({
            searchValue: value,
            start: 0,
            end: 30,
        }))
    }

    render() {
        const { searchValue } = this.state
        return (
            <div className='body'>
                <div 
                    className='sb-container' 
                >
                    <SearchBar 
                        onKeyDown={this.handleEnter} 
                        plantList={this.plantList}
                    />
                    <SearchContent 
                        value={searchValue}
                        plantList={this.plantList}
                        start={this.state.start}
                        end={this.state.end}
                        increment={this.incrementSearchResults}
                        decrement={this.decrementSearchResults}
                    />
                </div>
            </div>
        )
    }
}



class Info extends React.Component {
    render() {
        return(
           <Container>
                <Row>
                    <Col>
                        <img src={logo} alt='place holder'></img>
                    </Col>
                    <Col>
                        <div className='info'>
                            {/*Chang displayed info as needed*/}
                            <p>Common Name:</p>
                            <p>Scientific Name:</p>
                            <p>Growth Zone:</p>
                            <p>pH:</p>
                        </div>
                        <button className='fav-btn'>Add to favorites</button>
                    </Col>
                </Row>
            </Container> 
        )
    }
}

export default Body
