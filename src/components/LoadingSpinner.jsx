import React from 'react'
import '../styles/scss/LoadingSpinner.scss'

class Spinner extends React.Component {
    render(){
        return(
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div><div></div></div>
        )
    }
}

export default Spinner
