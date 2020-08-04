import React from "react";

class Result extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            query: null,
        }
    }
    
    render () {
        return(
            <div>
                Hello this is the Result Page.
            </div>
        )
    }
}

export default Result