import React from "react"
import '../../styles/scss/SearchResult.scss'

class ResultList extends React.Component {
    createItem(name, index) {
        return (
            <li className='results' key={index} onClick={() => this.props.lookupPlant(name, index)}>{ name }</li>
        )
    }

    render() {
        return (
            <div className='result-container'>
                <ul>
                    {
                        this.props.items.map((n, index) => {
                            return this.createItem(n, index)
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default ResultList
