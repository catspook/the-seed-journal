import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/Header.scss'

class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <Container fluid>
                    <Row>
                        <Col xs={2}><p className='title'>Plant Base</p></Col>
                        <Col><SearchBar></SearchBar></Col>
                    </Row>
                </Container>
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