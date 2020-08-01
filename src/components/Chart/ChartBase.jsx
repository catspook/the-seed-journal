import React from "react";
import Chart from "chart.js"
import {Bar} from 'react-chartjs-2';

const value = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
var light = {
    title: 'Light',
    type: 'range',
    param: 'light',
    values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
}

var leafColor = {
    title: 'Leaf Color',
    type: 'filter',
    param: 'leaf_color',
    values: ['white', 'pink', 'red', 'orange', 'yellow',
             'green', 'blue', 'purple'],
}

var params = {
    light: light,
    leafColor: leafColor
}
const url = 'https://trefle.io/api/v1/species?range[light]=1&token=Y1Z6YlRZeWhZZUhCY05ZQklRUzZydz09'
const names = require('../Search/search_filter.json')

const state = {
  labels: ['January', 'February', 'March',
           'April', 'May'],
  datasets: [
    {
      label: 'Rainfall',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

 class ChartBase extends React.Component {
    constructor(props){
        super(props)
        this.handleButton = this.handleButton.bind(this)
    }

    handleButton(){
        this.makeApiCall(url)
        console.log(names.light.values)
    }

    async makeApiCall(url) {

        let response = await fetch(url);
        if (response.status === 200) {
            let json = await response.json();
            console.log(json.meta.total)
        }
    }

    render() {
        return (
        <div>
            <Bar
            data={state}
            options={{
                title:{
                display:true,
                text:'Average Rainfall per month',
                fontSize:20
                },
                legend:{
                display:true,
                position:'right'
                }
            }}
            />
            <button onClick={this.handleButton}>hi</button>
        </div>
        );
    }
}

export default ChartBase