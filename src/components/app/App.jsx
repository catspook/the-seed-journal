import React from 'react';
import Header from '../Header'
import Body from '../Body'
import Footer from '../Footer'
import '../../styles/App.scss';

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
          <div className="App">
              <Header onClick={this.handlePage}/>
              <Body pageId={this.state.page}></Body>
              <Footer></Footer>
          </div>
      )
  }
}

export default App;
