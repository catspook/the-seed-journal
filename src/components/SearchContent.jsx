import React from "react"
import ResultList from "./SearchResults"

class SearchContent extends React.Component {

    // Find matching regex to input value every time it is updated
    updateResults = () => {
        let results = [];
        let items = []
        const value = this.props.value
        if(value.length > 0){
            const regex = new RegExp(`${value}`, 'i')
            items = this.props.plantList[value[0]]
            results = items.sort().filter(v => regex.test(v))
        }
        return results
    }

    // Render next and previous button and the search result list
    renderList(results, length) {
        if(length > 0) {
            return (
                <div>
                    <button onClick={this.decrement}>previous</button>
                    <button onClick={() => this.props.increment(length)}>next</button>
                    <ResultList 
                        items={results}
                        value={this.props.value}
                    />
                </div>
            )
        }
    }

    render() {
        const allResults = this.updateResults()
        //Slice the matching results to fit the limit of matches to show on browser
        const results = allResults.slice(this.props.start, this.props.end)
        return (
            <div>
                {this.renderList(results, allResults.length)}
            </div>
        )
    }
}

export default SearchContent