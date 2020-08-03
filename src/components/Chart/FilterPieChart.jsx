import React from "react";
import {Doughnut} from 'react-chartjs-2';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from "react-bootstrap/esm/DropdownItem";

const names = require('../Search/search_filter.json')

 class FilterPieChart extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            chartData: {},
            url: `https://trefle.io/api/v1/species?token=${process.env.REACT_APP_TREFLE_API_TOKEN}`,
            key: names.light.param,
            error: false,
        }
        this.updateGraph = this.updateGraph.bind(this)
        this.handleRefresh = this.handleRefresh.bind(this)
        this.handleDropDown = this.handleDropDown.bind(this)
    }
    
    componentWillMount(){
        this.updateGraph()
    }

    handleRefresh(){
        this.updateGraph()
    }

    handleDropDown = (event) =>{
        const key = event.target.id

        this.setState(() => ({
            key: key
        }))
    }

    async updateGraph(){
        let error = false

        try {
            const data = await this.getData()
            this.setChartData(data)
        }
        catch(err) {
            console.log(err)
            error = true;
        }

        if(this.state.error !== error){
            this.setState(() => ({
                error: error
            }))
        }
    }

    async getData(){
        console.log(this.state.key)
        const param = names[this.state.key].param
        const type = names[this.state.key].type
        const values = names[this.state.key].values
        let data = []
        for(let val of values){
            const url = `${this.state.url}&${type}[${param}]=${val}`
            const json = await this.props.makeApiCall(url)
            data.push(json.meta.total)
        }

        return data
    }

    setChartData(data){
        const chartData = {
        labels: names[this.state.key].values,
        datasets: [
            {
            label: names[this.state.key].title,
            backgroundColor: names[this.state.key].graph_colors,
            borderWidth: 2,
            data: data,
            }
        ]
        }

        this.setState(() => ({
            chartData: chartData
        }))
    }

    renderChart(){
        return (
            <div>
                <Doughnut
                data={this.state.chartData}
                options={{
                    title:{
                    display:true,
                    text:'Chart',
                    fontSize:20
                    },
                    legend:{
                    display:true,
                    position:'bottom'
                    },
                }}
                />
            </div>
        );
    }

    render(){
        return (
            <Container>
                <Row>
                    <Col><DropdownButton title={names[this.state.key].title}>
                        {
                            Object.keys(names).map((key, index) => 
                                <DropdownItem 
                                    onClick={this.handleDropDown}
                                    id={names[key].param}
                                >
                                    {names[key].title}
                                </DropdownItem>
                            )
                        }
                    </DropdownButton></Col>
                    <Col as="button" onClick={this.handleRefresh}>Refresh</Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.error ? <div>Error</div> : this.renderChart()}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default FilterPieChart