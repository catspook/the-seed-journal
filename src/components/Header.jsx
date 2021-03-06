import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/css/Header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
    };
  }

  render() {
    return (
      <div className="header">
        <Container fluid>
          <Row>
            <Col xs={2}>
              <h1 className="title title-text">
                <a href="/">The Seed Journal</a>
              </h1>
            </Col>
            <Col>
              <button
                aria-label="Theme"
                className="btn secondary-background float-right"
                onClick={(event) => this.props.onClick(event)}
                id="Theme"
              >
                <i
                  aria-label="ThemeIcon"
                  className="fa fa-paint-brush primary"
                  id="ThemeIcon"
                  onClick={(event) => this.props.onClick(event)}
                ></i>
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Header;
