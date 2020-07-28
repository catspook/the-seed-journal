import React from "react"
import '../styles/SearchBar.scss'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.plantList = JSON.parse(require('./common_names.json'));
        this.state = {
            suggestions: [],
            text: '',
        }
    }

    onTextChanged = (e) => {
        //Find matchin regex to input value every time it is updated
        //Change slice to change the max number of matches to show
       const value = e.target.value 
       let suggestions = [];
       if(value.length > 0){
           let first = value.charAt(0)
           if (first in this.plantList) {
               let plantArray = this.plantList[first];
               const regex = new RegExp(`${value}`, 'i')
               suggestions = plantArray.filter(v => regex.test(v))
               console.log(suggestions)
           }
       }
       this.setState(() => ({suggestions, text: value}))
    }

    selectSuggestion(value) {
        //Update input value to selected and set the suggestion
        //list to an empty list when a suggestion is selected.
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions () {
        //Render the contents of matching regex in an unordered list
        //Make the list element clickable to fill the input field
        const { suggestions } =this.state;
        if(suggestions.length === 0){
            return null
        }
        const listStyle = {
            height: "110px",
            overflow: "auto"
        };
        return(
            <div style={listStyle}>
                <ul className='suggestions'>
                    {suggestions.map((item) => 
                        <li onClick={() => this.selectSuggestion(item)}>{item}</li>)}
                </ul>
            </div>
        )
    }
    
    render() {
        const { text } = this.state;
        return(
            <div className='search-bar' onClick={() => this.myInput.focus()}>
                <input
                    value={text} 
                    onChange={this.onTextChanged} 
                    ref={(input) => this.myInput = input}
                    type='text'/>
                {this.renderSuggestions()}
            </div>
        )
    }
}

export default SearchBar
