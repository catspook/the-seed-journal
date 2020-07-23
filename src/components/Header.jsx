import React from "react"

class Header extends React.Component {
    render() {
        return (
            <div>
                <p>Plant Base</p>
                <SearchBar></SearchBar>
                <hr></hr> {/*Take this out when styling is included*/}
            </div>
        )
    }
}

class SearchBar extends React.Component {

    render() {
        return (
            <div className='search'>
                <input type='text' placeholder='Search...'>
                </input>
                <button>Search</button>
            </div>
        )
    }
}

export default Header