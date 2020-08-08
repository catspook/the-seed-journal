import React from 'react';
import Header from '../Header';
import Body from '../Body';
import Footer from '../Footer';
import Result from '../Result/Result';
import About from '../About';

import {
  BrowserRouter as Router, Switch,
  Route,
  Redirect
} from "react-router-dom";

import '../../styles/scss/App.scss';
import '../../styles/css/themify.css';
import '../../styles/css/typography.css';
import '../../styles/css/Search.css';

class App extends React.Component {
  constructor(props){
      super(props)

      // only ever add to the favorites list as we re-write it each time.
      this.state ={
          page: 0,
          theme: "light"
      }

      this.handlePage = this.handlePage.bind(this)
  }

  saveLocal(name, key){
    var ls = require('local-storage');
    return ls.set(name, key);
  }

  getLocal(name){
    var ls = require('local-storage');
    return ls.get(name);
  }

  componentDidMount() {
    console.log(this.saveLocal("test1", "howdy"));
    console.log(this.getLocal("test1"));
  }

  componentWillUnmount() {
  }

  // Change the page number depeding on the button that was
  // pressed on the Header.
  handlePage(event) {
    const btnId = Number(event.target.id)

    if (event.target.id === 'Theme' || event.target.id === 'ThemeIcon'){
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
              <About/>
            </Route>

						<Route path="/plant/:plantID">
                            <Result></Result>
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
