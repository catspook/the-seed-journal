import React from "react";
import { Radar } from "react-chartjs-2";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/scss/RadarChart.scss";

class PlantRadar extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = null;
    this.state = {
      light: this.props.children[1],
      humidity: this.props.children[3],
      salinity: this.props.children[5],
      nutriments: this.props.children[7],
      texture: this.props.children[9],

      lengend: <></>,
    };
  }

  componentDidMount() {
    const legend = this.createLegend();
    this.setState(() => ({
      legend: legend,
    }));
  }

  setRefrence(element) {
    this.myRef = element;
  }

  createLegend() {
    if (!this.myRef) {
      return null;
    }
    let props_valid = [
      this.state.light,
      this.state.humidity,
      this.state.salinity,
      this.state.nutriments,
      this.state.texture,
    ].reduce((acc, element) => {
      return (
        acc &&
        element !== "none listed" &&
        element !== undefined &&
        element != null
      );
    }, true);
    this.setState(() => ({
      valid: props_valid,
    }));
    return this.myRef.chartInstance.generateLegend();
  }

  renderInvalid() {
    return <span className="error accent">Some Information Unvailable</span>;
  }

  render() {
    let theme = document.getElementById("Theme");
    if (!theme) {
      theme = "Light";
    }

    const data = {
      labels: [
        "Light",
        "Atmospheric Humidity",
        "Soil Salinity",
        "Soil Nutriments",
        "Soil Texture",
      ],
      datasets: [
        {
          backgroundColor: "rgba(0, 204, 210, 0.2)",
          borderColor: "rgba(0, 150, 153, 1)",
          pointBackgroundColor: [
            "rgba(33, 154, 19, 1)",
            "rgba(58, 117, 255, 1)",
            "rgba(199, 113, 0, 1)",
            "rgba(198, 47, 62, 1)",
            "rgba(138, 73, 212, 1)",
          ],
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(179,181,198,1)",
          data: [
            this.state.light,
            this.state.humidity,
            this.state.salinity,
            this.state.nutriments,
            this.state.texture,
          ],
          pointRadius: 5,
        },
      ],
    };

    return (
      <Container className="chart" fluid="true">
        <Row>
          <Col>
            <h4>Plant Specifications</h4>
            <div className="spec-chart">
              <Radar
                aria-label="Radar Chart"
                role="img"
                ref={(element) => this.setRefrence(element)}
                data={data}
                height={250}
                options={{
                  responsive: false,
                  legend: false,
                  legendCallback: function (chart) {
                    var text = [];
                    var item = chart.data.datasets[0];
                    const scale_low = [
                      " Intense Shade, ",
                      " <= 10%, ",
                      " Intolerant, ",
                      " Oligotrophic, ",
                      " Clay, ",
                    ];
                    const scale_high = [
                      " Intense Light",
                      " >= 90%",
                      " Hyperhaline",
                      " Hypereutrophic",
                      " Rock",
                    ];
                    text.push("<ul>");
                    for (var i = 0; i < chart.data.labels.length; i++) {
                      text.push("<li>");
                      text.push(`<div 
                                                    class='legend accent' 
                                                    value='${item}'
                                                    style='background-color:
                                                    ${item.pointBackgroundColor[i]}'>
                                                    </div>`);
                      text.push(`<div><b>${chart.data.labels[i]}</b>
                                                    0:${scale_low[i]} 10: ${scale_high[i]}</div>`);
                      text.push("</div>");
                      text.push("</li>");
                    }
                    text.push("</ul>");
                    return text.join("");
                  },
                  scale: {
                    ticks: {
                      beginAtZero: true,
                      max: 10,
                      min: 0,
                      stepSize: 1,
                      showLabelBackdrop: false,
                    },
                    pointLabels: {
                      display: false,
                    },
                    gridLines: {},
                  },
                  tooltips: {
                    enabled: true,
                    mode: "label",
                    bodyFontSize: 17,
                    callbacks: {
                      title: function (item, data) {
                        return;
                      },
                      label: function (item, data) {
                        var index = item.index;
                        var text = ` ${data.labels[index]}: ${data.datasets[0].data[index]}`;
                        return text;
                      },
                    },
                  },
                }}
              />
            </div>
            <div dangerouslySetInnerHTML={{ __html: this.state.legend }} />
            {!this.state.valid && this.renderInvalid()}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PlantRadar;
