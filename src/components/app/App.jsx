import React from 'react';
import Header from '../Header'
import Body from '../Body'
import Footer from '../Footer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import '../../styles/scss/App.scss';
import '../../styles/css/themify.css';
import '../../styles/css/typography.css';

class App extends React.Component {
  constructor(props){
      super(props)
      this.state ={
          page: 0,
          theme: "light"
      }

      this.handlePage = this.handlePage.bind(this)
  }

  
  componentDidMount() {
    // add a function to look for saved cookies.
  }

  componentWillUnmount() {
      // add a function to save preference cookies.
  }

  // Change the page number depeding on the button that was
  // pressed on the Header.
  handlePage(event) {
    const btnId = Number(event.target.id)

    if (event.target.id === 'Theme'){
      let temp = '';
      if (this.state.theme === 'dark'){
        temp = 'light';
      } else {
        temp = 'dark';
      }
        
      this.setState(() => ({
        theme: temp,
      }))
    }else{
      this.setState(() => ({
        page: btnId,
      }))
    }
  }

  	render(){
		return(
			<Router>
				<div id={this.state.theme} className="page-container">

				<div className="content-container">
					<Header onClick={this.handlePage}/>
					<Switch>
						<Route path="/about">
						</Route>

						<Route path="/plant/:plantID">
						</Route>

						<Route path="/search">
							<Body pageId={this.state.page}></Body>
						</Route>

						<Route path="/">
							<Redirect to="/search" />
						</Route>
					</Switch>
				</div>

				<Footer />
				</div>
			</Router>
		)
    }
}

export default App;
