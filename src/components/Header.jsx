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
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Header