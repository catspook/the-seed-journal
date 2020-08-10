import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: "dark",
    };
  }

  render() {
    return (
      <div className={"footer primary-background"}>
        <div className="content">
          <hr />
          <div className="row">
            <div className="col-sm">
              <Row className="d-flex justify-content-around">
                <Col
                  xs={12}
                  md={6}
                  lg={3}
                  className="d-flex justify-content-center"
                >
                  <p>
                    <small>
                      &copy;{new Date().getFullYear()}{" "}
                      <a href="https://github.com/kaigoos" className="accent">
                        Kyle Gustke
                      </a>
                      ,{" "}
                      <a href="https://github.com/HiceS" className="accent">
                        Shawn Hice
                      </a>
                      ,{" "}
                      <a href="https://github.com/catspook" className="accent">
                        Casper Rutz
                      </a>
                    </small>
                  </p>
                </Col>
                <Col
                  xs={6}
                  md={6}
                  lg={3}
                  className="d-flex justify-content-center"
                >
                  <p>
                    <small>All Rights Reserved</small>
                  </p>
                </Col>
                <Col
                  xs={6}
                  md={6}
                  lg={3}
                  className="d-flex justify-content-center"
                >
                  <p>
                    <small>
                      Data sourced from{" "}
                      <a href="https://trefle.io/" className="accent">
                        Trefle
                      </a>
                    </small>
                  </p>
                </Col>
                <Col
                  xs={12}
                  md={6}
                  lg={3}
                  className="d-flex justify-content-center"
                >
                  <p>
                    <small>
                      <a
                        href="https://github.com/catspook/the-seed-journal"
                        className="accent"
                      >
                        Contribution Guidelines
                      </a>
                    </small>
                  </p>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
