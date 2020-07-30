import React from 'react';
import Header from '../Header'
import Body from '../Body'
import Footer from '../Footer'

import '../../styles/scss/App.scss';
import '../../styles/css/themify.css';

class App extends React.Component {
  constructor(props){
      super(props)
      this.state ={
          page: 0,
      }

      this.handlePage = this.handlePage.bind(this)
  }

  // Change the page number depeding on the button that was
  // pressed on the Header.
  handlePage(event) {
    const btnId = Number(event.target.id)

    this.setState(() => ({
      page: btnId,
    }))
  }

  render(){
      return(
		<div id="light" className="page-container">
			<div className="content-container">
				<Header onClick={this.handlePage}/>
				<Body pageId={this.state.page}></Body>
			</div>
      <Footer />
		</div>
      )
  }
}

export default App;
