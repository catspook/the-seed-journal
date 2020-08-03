import React from "react";
import FilterPieChart from './FilterPieChart'

class ChartBase extends React.Component {
    constructor(props){
        super(props)
        this.makeApiCall = this.makeApiCall.bind(this)
    }

    async makeApiCall(url) {
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

    render() {
        return (
        <div>
            <FilterPieChart makeApiCall={this.makeApiCall}/>
        </div>
        );
    }
}

export default ChartBase