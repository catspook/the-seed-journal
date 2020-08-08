import React from "react"

class ResultList extends React.Component {
    createItem(name, index) {
        let current_url = window.location.href
        let base_url = (current_url.split("/"))[2]
        let url = "http://" + base_url + "/plant/" + (this.props.slugs)[index]
        return (
            <li className='results' key={index}>
                <a key={index} href={url} target="_blank" rel="noopener noreferrer" className='accent-dark'>
                    { name }
                </a>
            </li>
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
