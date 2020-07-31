import React from "react"
import ResultList from "./SearchResults"
import '../styles/SearchContent.scss'

class SearchContent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            reversed: false,
        }

        this.handleReverse = this.handleReverse.bind(this)
    }

    // Reverse the order of the search results and reset it to start
    // from the beginning
    handleReverse(event){
            this.setState(() => ({
                reversed: !this.state.reversed
            }))
            this.props.onSubmit(event, this.props.value)
    }

    // Render next and previous button and the search result list
    renderList(results, length) {
        if(length > 0) {
            return (
                <div className='search-nav'>
                    <div className='btn-bar'>
                        <button onClick={() => this.props.decrement(length, false)}>previous</button>
                        <button onClick={() => this.props.increment(length, true)}>next</button>
                        <button onClick={this.handleReverse}>
                            {this.state.reversed ? 'A-Z':'Z-A'}
                        </button>
                    </div>
                    <ResultList 
                        items={results}
                        value={this.props.value}
                    />
                </div>
            )
        }
    }

    render() {
        //const allResults = this.props.plantList
        const results = this.props.plantList
        //Slice the matching results to fit the limit of matches to show on browser
        //const results = allResults.slice(this.props.start, this.props.end)
                //{this.renderList(results, allResults.length)}
        return (
            <div>
                {this.renderList(results, results.length)}
            </div>
        )
    }
}

export default SearchContent
