import React from "react";
import { Radar } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import "../../styles/RadarChart.scss"

// Take these out later once an object is passed in
const id = 190500
const url = `https://trefle.io/api/v1/species/${id}?token=${process.env.REACT_APP_TREFLE_API_TOKEN}`

var makeApiCall = async(url) => {
    let response = await fetch(url);
    let json
    if (response.status === 200) {
        json = await response.json();
    }
    else {
        throw new Error (response.status)
    }
    return json
}


class PlantRadar extends React.Component{
    constructor(props) {
        super(props)

        this.myRef = null
        this.state = {
            json: {},
            light: 0,
            humidity: 0,
            salinity: 0,
            nutriments: 0,
            texture: 0,

            lengend: <></>,
        }
    }
    
    async componentWillMount(){
        const json = await makeApiCall(url)
        const light = json.data.growth.light
        const humidity = json.data.growth.atmospheric_humidity
        const salinity = json.data.growth.soil_salinity
        const nutriments = json.data.growth.soil_nutriments
        const texture = json.data.growth.soil_texture

        this.setState(() => ({
            json: json,
            light: light,
            humidity: humidity,
            salinity: salinity,
            nutriments: nutriments,
            texture: texture,
        }))
    }

    componentDidMount(){
        const legend = this.createLegend()
        this.setState(() => ({
            legend: legend
        }))
    }

    setRefrence(element){
        this.myRef = element
    }

    createLegend(){
        if(!this.myRef)
            return null
        return this.myRef.chartInstance.generateLegend()
    }

    legendCBWrapper(chart){

    }

    render() {
        const data = {
            labels: ['Light','Atmospheric Humidity', 'Soil Salinity', 'Soil Nutriments', 'Soil Texture'] ,
            datasets: [
              {
                backgroundColor: 'rgba(18, 92, 10, 0.2)',
                borderColor: 'rgba(18, 92, 10, 1)',
                pointBackgroundColor: [
                    'rgba(18, 92, 10, 1)',
                    'rgba(30, 118, 169, 1)',
                    'rgba(164, 65, 35, 1)',
                    'rgba(155,21,21,1)',
                    'rgba(0,0,0,1)',
                ],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(179,181,198,1)',
                data: [
                    this.state.light,
                    this.state.humidity,
                    this.state.salinity,
                    this.state.nutriments,
                    this.state.texture,
                ],
              },
            ]
          };

        return (
            <Container>
                <Row>
                    <Col>
                        <Radar 
                            ref={(element) => this.setRefrence(element)}
                            data={data}
                            options={{
                                legend: false,
                                legendCallback: function(chart) {
                                    var text = [];
                                    var item = chart.data.datasets[0]
                                    const scale_low = [
                                        "(Intense Shade)", "(<=10%) ","(Intolerant)",
                                        "(Oligotrophic)", "(Clay)"]
                                    const scale_high =[
                                        "(Intense Light)", "(>=90%)", "(Hyperhaline)",
                                        "(Hypereutrophic)", "(Rock)"]
                                    text.push('<ul>')
                                        for (var i=0; i < chart.data.labels.length; i++) {
                                            text.push('<li>')
                                            text.push(`<div 
                                                class="legend" 
                                                style="background-color:
                                                ${item.pointBackgroundColor[i]}">
                                                </div>`)
                                            text.push(`<div>${chart.data.labels[i]}: 
                                                0:${scale_low[i]} 10:${scale_high[i]}</div>`)
                                            text.push("</div>")
                                            text.push('</li>')
                                        }
                                    text.push('</ul>')
                                    return text.join("")
                                },
                                scale: {
                                    ticks: {
                                        beginAtZero: true,
                                        max: 10,
                                        min: 0,
                                        stepSize: 1
                                    }
                                },
                                tooltips: {
                                    enabled: true,
                                    mode: 'label',
                                    callbacks: {
                                        title:function(item, data){
                                            return
                                        },
                                        label:function(item, data){
                                            var index = item.index
                                            var text = ` ${data.labels[index]}: ${data.datasets[0].data[index]}`
                                            return text
                                        }
                                    }
                                }
                            }}
                        />
                    </Col>
                    <Col>
                        <div dangerouslySetInnerHTML ={{__html: this.state.legend}}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default PlantRadar