import React from "react";
import logo from '../images/logo.svg'; /*Place Holder image*/
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/Body.scss'

class Body extends React.Component {
    render() {
        return (
            <div className='body'>
                <Info></Info>
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