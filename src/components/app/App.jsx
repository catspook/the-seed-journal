import React from 'react';
import logo from '../../images/logo.svg';
import Header from '../Header';
import Body from '../Body';
import Footer from '../Footer';
import '../../styles/App.scss';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
}

export default App;
