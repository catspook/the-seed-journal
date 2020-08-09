import React from "react";
import '../../styles/scss/pHBar.scss'

class PhBar extends React.Component{
    constructor(props){
        super(props)
        this.ph = {
            0: "rgba(178, 36, 41, 1)", 
            1: "rgba(231, 108, 13, 1)",
            2: "rgba(241, 145, 19, 1)",
            3: "rgba(237, 225, 53, 1)",
            4: "rgba(197, 235, 45, 1)",
            5: "rgba(120, 227, 38, 1)",
            6: "rgba(58, 209, 21, 1)", 
            7: "rgba(36, 172, 21, 1)", 
            8: "rgba(22, 177, 92, 1)", 
            9: "rgba(20, 200, 143, 1)",
            10: "rgba(21, 176, 203, 1)",
            11: "rgba(26, 91, 183, 1)",
            12: "rgba(88, 76, 200, 1)",
            13: "rgba(126, 65, 180, 1)",
        }
        this.state = {
            min: (this.props.children)[3],
            max: (this.props.children)[1],
            valid: true,
        }
    }
    
    componentWillMount(){
        if(typeof(this.state.min) !== "number" || typeof(this.state.max) !== "number")
            this.setState({
                valid: false,
            })
    }

    setUniqueKey(index, value){
        return index * 10 + value
    }

    setOpacity(index, value){
        const num = this.setUniqueKey(index, value)
        const min = this.state.min * 10
        const max = this.state.max * 10 - 1
        if(num >= min && num <= max)
            return 1
        return 0.2
    }

    renderInvalid(){
        return(
            <span className="accent">No pH Information Available</span>
        )
    }

    renderScale(){
        const repeat = [0,1,2,3,4,5,6,7,8,9]
        const phVal =[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
        return(
                <div className="container chart ph-chart">
                    <h4>pH Range</h4>
                    <div className="ph-scale">
                        {
                            Object.keys(this.ph).map((key,index) =>
                                repeat.map((value) => 
                                    <div
                                        className="ph-node"
                                        key={this.setUniqueKey(index, value)}
                                        style={{
                                            backgroundColor: `${this.ph[key]}`,
                                            opacity: this.setOpacity(index, value),
                                        }}
                                    >
                                        {this.setUniqueKey(index, value) !== 0 && 
                                            this.setUniqueKey(index, value) % 2 === 0 &&
                                            <div className="tick"></div>}
                                        {this.setUniqueKey(index, value) === this.state.min * 10}
                                        {this.setUniqueKey(index, value) === this.state.max * 10 - 1}
                                    </div>
                                )
                            )
                        }
                    </div>
                    <div className="ph-label">
                        {
                            phVal.map((key) =>
                                <span key={key} className="label">
                                    {key < 10 ? '0' + key : key}
                                </span>
                            )
                        }
                    </div>
                    {!this.state.valid && this.renderInvalid()}
                    <p><b>Minimum pH</b> {this.state.min}, <b>Maximum pH</b> {this.state.max}</p>
                </div>
        )
    }

    render(){
        return(
            this.renderScale()
        )
    }
}

export default PhBar
