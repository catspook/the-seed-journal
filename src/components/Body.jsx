import React from "react";
import logo from '../images/logo.svg'; /*Place Holder image*/

class Body extends React.Component {
    render() {
        return (
            <div>
                <Info></Info>
                <hr></hr> {/*Take this out when styling is included*/}
            </div>
        )
    }
}

class Info extends React.Component {
    render() {
        return(
            <div>
                {/*Take out width later*/}
                <img src={logo} alt='place holder' width={400}></img>
                <div>
                    {/*Chang displayed info as needed*/}
                    <p>Common Name:</p>
                    <p>Scientific Name:</p>
                    <p>Growth Zone:</p>
                    <p>pH:</p>
                </div>
                <button>Add to favorites</button>
            </div>
        )
    }
}

export default Body