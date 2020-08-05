import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import SearchBar from './SearchBar'
import SearchContent from './SearchContent'
import SearchFilter from './SearchFilter'

const names = require('./common_names.json')

class SearchBase extends React.Component{
    constructor(props) {
        super(props)
        this.plantList = JSON.parse(names)
        this.state = {
            searchValue: '',
            filter: {},
            currentPage: "",
            firstPage: "",
            nextPage: "",
            prevPage: "",
            lastPage: "",
            currentResults: [],
            reversed: false,
            trefleDown: false,
            plantResult: ""
        }

        this.changePage = this.changePage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateFilterConditions = this.updateFilterConditions.bind(this)
    }

    updateFilterConditions(obj){
        this.setState(() => ({
            filter: obj
        }))
        console.log(this.state.filter)
    }

    async makeApiCall(url) {

        let response = await fetch(url);
        let jsonState = {
            currentPage: "",
            currentResults: [],
            firstPage: "",
            nextPage: "",
            prevPage: "",
            lastPage: "",
        }

        if (response.status === 200) {
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
            this.setState(() => ({
                trefleDown: false
            }))
        }
        else {
            console.log(response.status)
            this.setState(() => ({
                trefleDown: true
            }))
        }
        return jsonState

    }

    async changePage(next) {
        let newPage = (next ? this.state.nextPage : this.state.prevPage)
        if (newPage) {
            let url = "https://trefle.io" + newPage + "&token=" 
                + process.env.REACT_APP_TREFLE_API_TOKEN

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

        let url = "https://trefle.io/api/v1/species/search?token=" 
            + process.env.REACT_APP_TREFLE_API_TOKEN + "&q=" + value
        let jsonState = await this.makeApiCall(url)

        this.setState(() => ({
            searchValue: value,
            currentPage: jsonState.currentPage,
            firstPage: jsonState.firstPage,
            nextPage: jsonState.nextPage,
            prevPage: jsonState.prevPage,
            lastPage: jsonState.lastPage,
            currentResults: jsonState.currentResults
        }))
    }

    renderSearchList(searchValue){
        
        const showTrefleDown = this.state.trefleDown
        const toggleShowTrefleDown = () => this.setState(() => ({
            trefleDown: false
        }));

        return (
            <Container>
                <Row>
                    <Col xs={2}>
                        <SearchFilter 
                            updateFilterConditions={this.updateFilterConditions}
                            filter={this.state.filter}
                        />
                    </Col>
                    <Col>
                        <div className='sb-container'>
                            <div>
                                <SearchBar 
                                    plantList={this.plantList}
                                    onSubmit={this.handleSubmit}
                                />
                            </div>

                            <Toast show={showTrefleDown} onClose={toggleShowTrefleDown}>
                                <Toast.Header>
                                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                    <strong className="mr-auto">Search Error</strong>
                                    <small>Now</small>
                                </Toast.Header>
                                <Toast.Body>Our data source is currently unavailable. Please try again later!</Toast.Body>
                            </Toast>

                            <SearchContent 
                                value={searchValue}
                                resultList={(this.state.currentResults).reduce((acc, element) => {
                                    acc.push(element.name)
                                    return acc
                                }, [])}
                                newPage={this.changePage}
                                onSubmit={this.handleSubmit}
                                slugs={(this.state.currentResults).reduce((acc, element) => {
                                    acc.push(element.slug)
                                    return acc
                                }, [])}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }

    render(){
        const { searchValue } = this.state
        return(
            this.renderSearchList(searchValue)
        )
    }
}

export default SearchBase
