import React from "react"

class ResultList extends React.Component {
    constructor(props) {
        super(props)
        this.limits = 30
        this.state = {
        }
    }

    createItem(name, index) {
        return (
            <li key={index}>{ name }</li>
        )
    }

    render() {
        return (
            <ul>
                {
                    this.props.items.map((n, index) => {
                        return this.createItem(n, index)
                    })
                }
            </ul>
        )
    }
}

export default ResultList