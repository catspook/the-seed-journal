import React from 'react'
import "../../styles/scss/ClickToShow.scss"

class ClickToShow extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            header: this.props.header,
            category: this.props.category,
            data: this.props.data,
            open: this.props.open,
            message: "click to show",
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(){
        this.setState(() => ({
            open: !this.state.open,
            message: (this.state.message === "click to show" ? "click to hide" : "click to show")
        }))
    }
    
    render(){
        const category = this.state.category
        return(
            <div className="click-wrapper">
                    <h3 
                        onClick={this.handleClick}
                        className="h-click"
                    >
                        <b>{this.props.header} <small>{this.state.message}</small></b>
                    </h3>
                {
                    this.state.open &&
                    this.state.category.map((key,index) => {
                        return (
                            <p key ={index}>
                                <b className='accent'>
                                    {category[index] + ' '} 
                                </b>
                                {this.state.data[index]}
                            </p>
                        )
                    })
                }
            </div>
        )
    }
}

export default ClickToShow
