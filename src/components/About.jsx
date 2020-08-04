import React from "react";

class About extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            query: null,
        }
    }
    
    render () {
        return(
            <div>
                Hello this is the About Page.
            </div>
        )
    }
}

export default About