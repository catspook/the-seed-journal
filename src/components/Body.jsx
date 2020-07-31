import React from "react";
//import logo from '../images/logo.svg'; /*Place Holder image*/
//import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
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
            currentPage: "",
            firstPage: "",
            nextPage: "",
            prevPage: "",
            lastPage: "",
            currentResults: [],
            //reversed: false
        }

        this.decrementSearchResults = this.decrementSearchResults.bind(this)
        this.incrementSearchResults = this.incrementSearchResults.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async makeApiCall(url) {

        let response = await fetch(url);
        let jsonState = {
            currentPage: "",
            currentResults: [],
            firstPage: "",
            nextPage: "",
            prevPage: "",
            lastPage: ""
        }

        if (response.status === 200) {
            let json = await response.json();
            jsonState.currentPage = json.links.self
            jsonState.firstPage = json.links.first
            jsonState.nextPage = json.links.next
            jsonState.prevPage = json.links.prev
            jsonState.lastPage = json.links.last
            jsonState.currentResults = (json.data).reduce((acc, element) => {
                let addName = (element.common_name != null ? element.common_name : element.scientific_name)
                acc.push({
                    name: addName,
                    slug: element.slug
                })
                return acc
            }, []);
            
        }
        else {
            throw new Error (response.status)
        }
        return jsonState

    }

    // Decrement the search result by the limit
    // Only works if starting index is above 0
    async decrementSearchResults() {
        let url = "https://trefle.io" + this.state.prevPage + "&token=" + process.env.REACT_APP_TREFLE_API_TOKEN

        let jsonState = await this.makeApiCall(url)
        this.setState(() => ({
            currentPage: jsonState.currentPage,
            firstPage: jsonState.firstPage,
            nextPage: jsonState.nextPage,
            prevPage: jsonState.prevPage,
            lastPage: jsonState.lastPage,
            currentResults: jsonState.currentResults
        }))
        /*
        if(this.state.start > 0) {
            this.setState(() => ({
                start: this.state.start - this.state.limit,
                end: this.state.end - this.state.limit,
            }))
        }
        */
    }

    // Increment the search result by the limit
    // Only works if ending index is less than the total
    // search result length
    async incrementSearchResults(length){
        let url = "https://trefle.io" + this.state.nextPage + "&token=" + process.env.REACT_APP_TREFLE_API_TOKEN

        let jsonState = await this.makeApiCall(url)
        this.setState(() => ({
            currentPage: jsonState.currentPage,
            firstPage: jsonState.firstPage,
            nextPage: jsonState.nextPage,
            prevPage: jsonState.prevPage,
            lastPage: jsonState.lastPage,
            currentResults: jsonState.currentResults
        }))

        /*
        if(this.state.end < length) {
            this.setState(() => ({
                start: this.state.start + this.state.limit,
                end: this.state.end + this.state.limit,
            }))
        }
        */
    }

    // Change search to the entered text on submission
    // and reset search index on new search
    async handleSubmit(event, value) {
        event.preventDefault()

        let url = "https://trefle.io/api/v1/species/search?token=" + process.env.REACT_APP_TREFLE_API_TOKEN + "&q=" + value
        let jsonState = await this.makeApiCall(url)

        this.setState(() => ({
            searchValue: value,
            start: 0,
            end: 30,
            currentPage: jsonState.currentPage,
            firstPage: jsonState.firstPage,
            nextPage: jsonState.nextPage,
            prevPage: jsonState.prevPage,
            lastPage: jsonState.lastPage,
            currentResults: jsonState.currentResults
        }))
        console.log(this.state)
    }

    // Content to render on the home screen
    renderHome(searchValue){
        return (
            <div className='sb-container'>
                <div>
                    <SearchBar 
                        plantList={this.plantList}
                        onSubmit={this.handleSubmit}
                    />
                </div>
                <SearchContent 
                    value={searchValue}
                    plantList={(this.state.currentResults).reduce((acc, element) => {
                        acc.push(element.name)
                        return acc
                    }, [])}
                    start={this.state.start}
                    end={this.state.end}
                    increment={this.incrementSearchResults}
                    decrement={this.decrementSearchResults}
                    onSubmit={this.handleSubmit}
                />
            </div>
        )
    }

    // Content to render on the "insert name here" screen
    renderTab1() {
        return(
            <div>
                <p>Chart Thingy</p>
            </div>
        )
    }

    // Content to render on the "insert name here" screen
    renderTab2() {
        return(
            <div>
                <p>I'm a Plant!</p>
            </div>
        )
    }

    // Conditionally render the contents of the body depending on
    // the pageId (Header Buttons)
    renderBody(searchValue) {
        if(this.props.pageId === 0)
            return this.renderHome(searchValue)
        if(this.props.pageId === 1)
            return this.renderTab1()
        if(this.props.pageId === 2)
            return this.renderTab2()
    }

    render() {
        const { searchValue } = this.state
        return (
            <div className='body'>
                {this.renderBody(searchValue)}
            </div>
        )
    }
}



//class Info extends React.Component {
//    render() {
//        return(
//           <Container>
//                <Row>
//                    <Col>
//                        <img src={logo} alt='place holder'></img>
//                    </Col>
//                    <Col>
//                        <div className='info'>
//                            {/*Chang displayed info as needed*/}
//                            <p>Common Name:</p>
//                            <p>Scientific Name:</p>
//                            <p>Growth Zone:</p>
//                            <p>pH:</p>
//                        </div>
//                        <button className='fav-btn'>Add to favorites</button>
//                    </Col>
//                </Row>
//            </Container> 
//        )
//    }
//}

export default Body
