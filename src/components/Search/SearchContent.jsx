import React from "react"
import ResultList from "./SearchResults"
import '../../styles/scss/SearchContent.scss'

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
    renderList(results) {
        let length = results.length
        if(length > 0) {
            return (
                <div className='search-nav'>
                    <div className='btn-bar'>
                        <button onClick={() => this.props.newPage(false)}>previous</button>
                        <button onClick={() => this.props.newPage(true)}>next</button>
                        <button onClick={this.handleReverse}>
                            {this.state.reversed ? 'A-Z':'Z-A'}
                        </button>
                    </div>
                    <ResultList 
                        items={results}
                        value={this.props.value}
                        slugs={this.props.slugs}
                    />
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderList(this.props.resultList)}
            </div>
        )
    }
}

export default SearchContent
