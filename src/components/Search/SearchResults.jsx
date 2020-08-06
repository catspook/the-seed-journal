import React from "react"
import '../../styles/scss/SearchResult.scss'

class ResultList extends React.Component {
    createItem(name, index) {
        let url = "http://localhost:3000/plant/" + (this.props.slugs)[index]
        return (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                <li className='results' key={index}>{ name }</li>
            </a>
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
