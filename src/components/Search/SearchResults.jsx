import React from "react"
import '../../styles/scss/SearchResult.scss'

class ResultList extends React.Component {
    createItem(name, index) {
        let current_url = window.location.href
        let base_url = (current_url.split("/"))[2]
        let url = "http://" + base_url + "/plant/" + (this.props.slugs)[index]
        return (
            <a href={url} target="_blank" rel="noopener noreferrer">
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
