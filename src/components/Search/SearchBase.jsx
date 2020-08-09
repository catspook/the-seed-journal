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
            filter: {},
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
        }

        this.changePage = this.changePage.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateFilterConditions = this.updateFilterConditions.bind(this)
        this.handleOrderOption = this.handleOrderOption.bind(this)
    }

    /*

    setCookies(plantName) {
        const cookies = new Cookies({ path: '../' });
        var fav = cookies.get('favorites');
    
        if (fav) {
          fav.push(plantName);
        }else {
          fav = [plantName]
        }
    
        cookies.set('favorites', fav);
    }

    getCookies() {
        const cookies = new Cookies({ path: '../' });

        var fav = cookies.get('favorites');
    
        if (fav) {
          return fav;
        }else {
          return null;
        }
    }

    */

    getLocal(name){
    }

    handleOrderOption(event){
        const id = event.target.id
        this.setState(() => ({
            option: id,
        }))
    }

    updateFilterConditions(obj){
        this.setState(() => ({
            filter: obj
        }))
    }

    addFilterToURL(value){
        const filter_obj = this.state.filter
        let filter_str = ''
        let key = Object.keys(filter_obj)[0]
        let cors_url = "https://cors-anywhere.herokuapp.com/"
        let url = cors_url + "https://trefle.io/api/v1/species/search?token=" 
            + process.env.REACT_APP_TREFLE_API_TOKEN
        if(!value){
            url = "https://trefle.io/api/v1/species?token=" 
                + process.env.REACT_APP_TREFLE_API_TOKEN
        }

        if(this.state.filter[key]) {
            if(this.state.option === "lower"){
                filter_str = filter_str.concat(`&${filter_obj[key]
                    .type}[${key}]=,${filter_obj[key].values}`)
            } 
            else {
                filter_str = filter_str.concat(`&${filter_obj[key]
                    .type}[${key}]=${filter_obj[key].values}`)
            }

            url = url.concat(filter_str)
        }
        if(value)
            url = url.concat(`&q=${value}`)

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
            console.log(json)
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

        let url = this.addFilterToURL(value)
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

        const favorites = this.state.favorites;
        let favoritesRender;

        if (favorites != null){
        favoritesRender = <div>
            { favorites.map((value) => 
                <p className='center testAlign'>{value}</p>
            )}
            </div>;
        }else {
            favoritesRender = <p className='center testAlign'>No Favorites are saved :(</p>
        }

        return (
            <Container className="search-container" fluid="true">
                <Row>
                    <Col lg className='sb-wrapper'>
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
                    <SearchFilter />
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
                 <Row>
                    <Col lg className='addTop'>
                        <div className='center testAlign'>
                            <h4>Favorites:</h4>
                        </div>
                        {favoritesRender}
                    </Col>
                    <Col sm className='overlay'>
                    </Col>
                    <Col lg className='addTop'>
                        <h4 className='center'>Random Plant in your Area <button aria-label='locationButton' className="btn secondary-background" id='locationButton'><i aria-label='locationService' className="fa fa-location-arrow primary" id='locationService'></i></button> </h4>
                        
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
