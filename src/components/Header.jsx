import React from "react"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../styles/css/Header.css'

class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <Container fluid>
                    <Row>
                        <Col xs={2}><p className='title'>The Seed Journal</p></Col>
                        <Col><button onClick={(event) => this.props.onClick(event)} id='0'>Home</button></Col>
                        <Col><button onClick={(event) => this.props.onClick(event)} id='1'>Chart Thingy</button></Col>
                        <Col><button onClick={(event) => this.props.onClick(event)} id='2'>Random Plant</button></Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Header