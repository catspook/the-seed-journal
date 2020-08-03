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
            reversed: false
        }

        this.changePage = this.changePage.bind(this)
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
            console.log("HERE")
            let json = await response.json();
            jsonState.currentPage = json.links.self
            jsonState.firstPage = (json.links.first ? json.links.first : null)
            jsonState.nextPage = (json.links.next ? json.links.next : null)
            jsonState.prevPage = (json.links.prev ? json.links.prev : null)
            jsonState.lastPage = (json.links.last ? json.links.last : null)
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
            //throw new Error (response.status)
            console.log(response.status)
        }
        return jsonState

    }

    async changePage(next) {
        let newPage = (next ? this.state.nextPage : this.state.prevPage)
        if (newPage) {
            let url = "https://trefle.io" + newPage + "&token=" + process.env.REACT_APP_TREFLE_API_TOKEN

            let jsonState = await this.makeApiCall(url)
            this.setState(() => ({
                currentPage: jsonState.currentPage,
                currentResults: jsonState.currentResults,
                firstPage: jsonState.firstPage,
                nextPage: jsonState.nextPage,
                prevPage: jsonState.prevPage,
                lastPage: jsonState.lastPage
            }))
        }
    }

    // Change search to the entered text on submission
    // and reset search index on new search
    // and do api call on results
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
                    resultList={(this.state.currentResults).reduce((acc, element) => {
                        acc.push(element.name)
                        return acc
                    }, [])}
                    start={this.state.start}
                    end={this.state.end}
                    newPage={this.changePage}
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
