import React from "react"
import '../styles/SearchBar.scss'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
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
           if (first in this.props.plantList) {
               let plantArray = this.props.plantList[first];
               const regex = new RegExp(`${value}`, 'i')
               suggestions = plantArray.filter(v => regex.test(v))
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
                    {suggestions.map((item, index) => 
                        <li key={index} onClick={() => this.selectSuggestion(item)}>{item}</li>)}
                </ul>
            </div>
        )
    }
    
    render() {
        const { text } = this.state;
        return(
            <div>
                <div className='search-bar' onClick={() => this.myInput.focus()}>
                    <input
                        value={text} 
                        onChange={this.onTextChanged} 
                        //On blur saves state of input and continues suggestion on focus
                        onBlur={() => this.selectSuggestion(text)}
                        onFocus={this.onTextChanged}
                        //Only triggers when enter is pressed down
                        onKeyDown={(event) => event.key === 'Enter' 
                            && this.props.onKeyDown(event, text)
                        }
                        ref={(input) => this.myInput = input}
                        type='text'/>
                    {this.renderSuggestions()}
                </div>
            </div>
        )
    }
}

export default SearchBar
