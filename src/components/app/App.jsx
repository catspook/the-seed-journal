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

import Cookies from 'universal-cookie';

import '../../styles/scss/App.scss';
import '../../styles/css/themify.css';
import '../../styles/css/typography.css';

class App extends React.Component {
  constructor(props){
      super(props)

      const cookies = new Cookies();

      var fav = cookies.get('favorites', { path: '/' });

      if (fav === null) {
        fav = [];
      }

      // only ever add to the favorites list as we re-write it each time.
      this.state ={
          page: 0,
          theme: "light",
          favorites: fav,
          cookies: cookies
      }

      this.handlePage = this.handlePage.bind(this)
  }

  setCookies(plantName) {
    const cookies = new Cookies({ path: '../' });
    var fav = cookies.get('favorites');

    if (fav) {
      fav.push(plantName);
    }else {
      fav = [plantName]
    }

    cookies.set('favorites', fav);
  }

  
  componentDidMount() {
    this.setCookies("tyoyooyoyoy");
  }

  componentWillUnmount() {
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
