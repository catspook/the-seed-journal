import React from "react";
import logo from '../images/logo.svg'; /*Place Holder image*/
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SearchBar from './SearchBar'
import '../styles/Body.scss'

class Body extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSearch: false,
        }

        this.handleEnter = this.handleEnter.bind(this)
    }

    handleEnter(event) {
        // Change search value to true when eneter is pressed (in search bar)
        this.setState(() => ({
            showSearch: true,
        }))
        console.log(this.state.showSearch)
    }

    render() {
        return (
            <div className='body'>
                <div 
                    className='sb-container' 
                >
                    <SearchBar 
                        onKeyDown={this.handleEnter} 
                        showSearch={this.state.showSearch}
                    />
                </div>
            </div>
        )
    }
}



class Info extends React.Component {
    render() {
        return(
           <Container>
                <Row>
                    <Col>
                        <img src={logo} alt='place holder'></img>
                    </Col>
                    <Col>
                        <div className='info'>
                            {/*Chang displayed info as needed*/}
                            <p>Common Name:</p>
                            <p>Scientific Name:</p>
                            <p>Growth Zone:</p>
                            <p>pH:</p>
                        </div>
                        <button className='fav-btn'>Add to favorites</button>
                    </Col>
                </Row>
            </Container> 
        )
    }
}

export default Body
