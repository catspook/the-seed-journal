import React from "react";
import SearchBase from './Search/SearchBase'
import '../styles/scss/Body.scss'

class Body extends React.Component {
    // Content to render on the home screen
    renderHome(searchValue){
        return(
            <div>
                <SearchBase />
            </div>
        )
    }

    render() {
        return (
            <div className='body'>
                {this.renderHome()}
            </div>
        )
    }
}

export default Body
