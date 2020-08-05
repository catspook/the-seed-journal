import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../../styles/scss/pHBar.scss'

class PhBar extends React.Component{
    constructor(props){
        super(props)
        this.ph = {
            0: ["rgba(178, 36, 41, 1)", "rgba(178, 36, 41, 0.2)"],
            1: ["rgba(231, 108, 13, 1)", "rgba(231, 108, 13, 0.2)"],
            2: ["rgba(241, 145, 19, 1)", "rgba(241, 145, 19, 0.2)"],
            3: ["rgba(237, 225, 53, 1)", "rgba(237, 225, 53, 0.2)"],
            4: ["rgba(197, 235, 45, 1)", "rgba(197, 235, 45, 0.2)"],
            5: ["rgba(120, 227, 38, 1)", "rgba(120, 227, 38, 0.2)"],
            6: ["rgba(58, 209, 21, 1)", "rgba(58, 209, 21, 0.2)"],
            7: ["rgba(36, 172, 21, 1)", "rgba(36, 172, 21, 0.2)"],
            8: ["rgba(22, 177, 92, 1)", "rgba(22, 177, 92, 0.2)"],
            9: ["rgba(20, 200, 143, 1)", "rgba(20, 200, 143, 0.2)"],
            10: ["rgba(21, 176, 203, 1)", "rgba(21, 176, 203, 0.2)"],
            11: ["rgba(26, 91, 183, 1)", "rgba(26, 91, 183, 0.2)"],
            12: ["rgba(88, 76, 200, 1)", "rgba(88, 76, 200, 0.2)"],
            13: ["rgba(126, 65, 180, 1)", "rgba(126, 65, 180, 0.2)"],
            14: ["rgba(98, 49, 135, 1)", "rgba(98, 49, 135, 0.2)"],
        }
    }

    render(){
        return(
            <Container>
                <Row className="ph-scale">
                    {
                        Object.keys(this.ph).map((key, index) => 
                            <Col
                                className="ph-node"
                                key={index}
                                id={index}
                                style={{backgroundColor: `${this.ph[key][0]}`}}
                            >
                            </Col>
                        )
                    }
                </Row>
            </Container>
        )
    }
}

export default PhBar