import React from "react";
//import logo from '../images/logo.svg'; /*Place Holder image*/
//import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'
import SearchBase from './Search/SearchBase'
import '../styles/scss/Body.scss'

class Body extends React.Component {
    // Content to render on the home screen
    renderHome(searchValue){
        return(
            <SearchBase />
        )
    }

    // Content to render on the "insert name here" screen
    renderTab1() {
        return(
            <div>
                <p>Chart Thingy</p>
            </div>
        )
    }

    // Content to render on the "insert name here" screen
    renderTab2() {
        return(
            <div>
                <p>I'm a Plant!</p>
            </div>
        )
    }

    // Conditionally render the contents of the body depending on
    // the pageId (Header Buttons)
    renderBody() {
        if(this.props.pageId === 0)
            return this.renderHome()
        if(this.props.pageId === 1)
            return this.renderTab1()
        if(this.props.pageId === 2)
            return this.renderTab2()
    }

    render() {
        return (
            <div className='body'>
                {this.renderBody()}
            </div>
        )
    }
}



//class Info extends React.Component {
//    render() {
//        return(
//           <Container>
//                <Row>
//                    <Col>
//                        <img src={logo} alt='place holder'></img>
//                    </Col>
//                    <Col>
//                        <div className='info'>
//                            {/*Chang displayed info as needed*/}
//                            <p>Common Name:</p>
//                            <p>Scientific Name:</p>
//                            <p>Growth Zone:</p>
//                            <p>pH:</p>
//                        </div>
//                        <button className='fav-btn'>Add to favorites</button>
//                    </Col>
//                </Row>
//            </Container> 
//        )
//    }
//}

export default Body
