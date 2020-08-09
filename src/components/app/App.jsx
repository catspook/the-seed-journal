import React from 'react'
import Header from '../Header'
import Body from '../Body'
import Footer from '../Footer'
import Result from '../Result/Result'

import {
    BrowserRouter as Router, Switch,
    Route,
    Redirect
} from 'react-router-dom'

import '../../styles/scss/App.scss'
import '../../styles/scss/themify.scss'
import '../../styles/css/typography.css'
import '../../styles/css/Search.css'

class App extends React.Component {
    constructor(props){
        super(props)

        var theme = this.getLocal('theme')

        if (theme === null){
            theme = 'light'
        }

        // only ever add to the favorites list as we re-write it each time.
        this.state ={
            page: 0,
            theme: theme
        }

        this.handlePage = this.handlePage.bind(this)
    }

    setLocal(name, key){
        var ls = require('local-storage')
        return ls.set(name, key)
    }

    getLocal(name){
        var ls = require('local-storage')
        return ls.get(name)
    }

    // Change the page number depeding on the button that was
    // pressed on the Header.
    handlePage(event){
        const btnId = Number(event.target.id)

        if (event.target.id === 'Theme' || event.target.id === 'ThemeIcon'){

            let temp = ''
            if (this.state.theme === 'dark'){
                temp = 'light'
            } else {
                temp = 'dark'
            }

            this.setLocal('theme', temp)
        
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
                <div id={this.state.theme} className='page-container'>
                    <div className='content-container'>
                        <Header onClick={this.handlePage}/>
                        <Switch>
                            <Route path='/plant/:plantID'>
                                <Result></Result>
                            </Route>

                            <Route path='/search'>
                                <Body pageId={this.state.page}></Body>
                            </Route>

                            <Route path='/'>
                                <Redirect to='/search' />
                            </Route>
                        </Switch>
                    </div>

                    <Footer />
                </div>
            </Router>
        )
    }
}

export default App
