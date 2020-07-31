import React from "react"
import '../styles/SearchResult.scss'

class ResultList extends React.Component {
    createItem(name, index) {
        return (
            <li className='results' key={index}>{ name }</li>
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