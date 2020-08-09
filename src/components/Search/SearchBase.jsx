import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Toast from 'react-bootstrap/Toast'
import SearchBar from './SearchBar'
import SearchContent from './SearchContent'
import SearchFilter from './SearchFilter'
import LoadingSpinner from '../LoadingSpinner'

const names = require('./common_names.json')

class SearchBase extends React.Component{
    constructor(props) {
        super(props)
        
        this.plantList = JSON.parse(names)
        
        var fav = require('local-storage').get('favorites');

        this.state = {
            searchValue: '',
            filter: [],
            currentPage: "",
            firstPage: "",
            nextPage: "",
            prevPage: "",
            lastPage: "",
            currentResults: [],
            trefleDown: false,
            plantResult: "",
            option: "lower",
            loading: false,
            favorites: fav,
            noResults: false,
            pageMax: 5168,
        }

        this.changePage = this.changePage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOrderOption = this.handleOrderOption.bind(this)
        this.handleRandom = this.handleRandom.bind(this)
        this.handleFiliter = this.handleFilter.bind(this)
    }

    handleFilter(num){
        let filter = []
        if(num !== 0){
            if(num <= 3){
                filter.push('light')
            }
            else{
                filter.push('atmospheric_humidity')
            }
            if(num % 3 === 1) 
                filter.push([0, 3])
            else if(num % 3 === 2)
                filter.push([4, 7])
            else
                filter.push([8, 10])
        }
        this.setState(() => ({
            filter: filter,
        }))
    }

    async handleRandom(event){
        event.preventDefault()
        let current_url = window.location.href
        let base_url = (current_url.split("/"))[2]
        let slug = await this.getSlug()
        let url = "http://" + base_url + "/plant/" + slug
        window.open(url, "_blank", "noopener noreferrer")
    }

    // Get the slug of a random plant 
    async getSlug(){
        let slug = ''
        const page = Math.floor(Math.random() * this.state.pageMax) + 1
        const cors_url = "https://cors-anywhere.herokuapp.com/"
        let url = cors_url + `https://trefle.io/api/v1/species?filter_not[image_url]=null&page=${page}&token=${process.env.REACT_APP_TREFLE_API_TOKEN}`
        console.log(url)
        const json = await this.makeApiCall(url)
        const data_num = Math.floor(Math.random() * json.currentResults.length)
        slug = json.currentResults[data_num].slug
        return slug
    }

    handleOrderOption(event){
        const id = event.target.id
        this.setState(() => ({
            option: id,
        }))
    }

    addFilterToURL(value){
        const filter = this.state.filter
        let filter_str = ''
        let cors_url = "https://cors-anywhere.herokuapp.com/"
        let url = cors_url + "https://trefle.io/api/v1/species/search?token=" 
            + process.env.REACT_APP_TREFLE_API_TOKEN
        if(!value){
            url = "https://trefle.io/api/v1/species?token=" 
                + process.env.REACT_APP_TREFLE_API_TOKEN
        }
        if(filter.length > 0) {
            filter_str = filter_str.concat(`&range[${filter[0]}]=${filter[1]}`)
            url = url.concat(filter_str)
        }
        if(value)
            url = url.concat(`&q=${value}`)
        console.log(url)

        console.log(url)
        return url
    }

    async makeApiCall(url) {
        this.setState(() =>({
            loading: true,
        }))

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
            if (json.meta.total === 0) {
                this.setState(() => ({
                    trefleDown: false,
                    noResults: true
                }))
            }
            else {
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
                    trefleDown: false,
                    noResults: false
                }))
            }
        }
        else {
            console.log(response.status)
            this.setState(() => ({
                trefleDown: true,
                loading: false,
                noResults: false,
            }))
        }

        this.setState(() =>({
            loading: false,
        }))

        return jsonState

    }

    async changePage(next) {
        let newPage = (next ? this.state.nextPage : this.state.prevPage)
        if (newPage) {
            let cors_url = "https://cors-anywhere.herokuapp.com/"
            let url = cors_url + "https://trefle.io" + newPage + "&token=" 
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

        if(value || this.state.filter.length !== 0){
            let url = this.addFilterToURL(value)
            let jsonState = await this.makeApiCall(url)

            this.setState(() => ({
                searchValue: value,
                currentPage: jsonState.currentPage,
                firstPage: jsonState.firstPage,
                nextPage: jsonState.nextPage,
                prevPage: jsonState.prevPage,
                lastPage: jsonState.lastPage,
                currentResults: jsonState.currentResults,
                filter: [],
            }))
        }
    }

    renderSearchList(searchValue){
        
        const showTrefleDown = this.state.trefleDown
        const toggleShowTrefleDown = () => this.setState(() => ({
            trefleDown: false
        }));

        const favorites = this.state.favorites;
        let favoritesRender;

        if (favorites != null){
            let current_url = window.location.href
            let base_url = (current_url.split("/"))[2]
            favoritesRender = (<div>
                { favorites.map((value) => 
                    <p className='center testAlign'><a className="accent" href={"http://" + base_url + "/plant/" + value}>{value}</a></p>
                )}
                </div>);
        }else {
            favoritesRender = <p className='center testAlign'>No Favorites are saved :(</p>
        }
        return (
            <Container className="search-container" fluid="true">
                <Row>
                    <Col md={{order: 1}} className='addTop'>
                        <div className='center testAlign'>
                            <h4>Favorites:</h4>
                        </div>
                        {favoritesRender}
                    </Col>
                    <Col md={{order: 3}}  className='addTop'>
                        <h5 className='center'>Go to a Random Plant 
                            <button onClick={this.handleRandom} aria-label='locationButton' className="btn secondary-background" id='locationButton'>
                                <i aria-label='locationService' className="fa fa-location-arrow primary" id='locationService'>
                        </i></button> </h5>
                    </Col>
                    <Col md={{order: 2}} className='sb-wrapper'>
                            <SearchBar 
                                className='sb' 
                                plantList={this.plantList}
                                onSubmit={this.handleSubmit}
                                searching={true}
                            />
                            <Toast show={showTrefleDown} onClose={toggleShowTrefleDown}>
                                <Toast.Header>
                                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                    <strong className="mr-auto">Search Error</strong>
                                    <small>Now</small>
                                </Toast.Header>
                                <Toast.Body>Our data source is currently unavailable. Please try again later!</Toast.Body>
                            </Toast>
                    </Col>
                </Row>
                <Col className='sb-wrapper'>
                    <SearchFilter handleFilter={this.handleFiliter} filter={this.state.filter}/>
                    { this.state.noResults ? <p className='error accent'>No results found. Try another search!</p> : null }
                </Col>
                <Row className='d-flex justify-content-center'>
                {this.state.loading ?
                                <LoadingSpinner className="spinner" />
                                :
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
                            }
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
