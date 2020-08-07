import React from "react"
import '../../styles/scss/SearchBar.scss'

class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            text: '',
        }
    }

    onTextChanged = (e) => {
        //Find matching regex to input value every time it is updated
        //Change slice to change the max number of matches to show
       const value = e
       let fixed_value = value.replace(/[^'`\-A-Za-z\s]/gi, '')
       let suggestions = [];
       if(fixed_value.length > 0){
           let first = fixed_value.charAt(0)
           if (first in this.props.plantList) {
               let plantArray = this.props.plantList[first];
               const regex = new RegExp(`${fixed_value}`, 'i')
               suggestions = plantArray.filter(v => regex.test(v))
           }
       }
       this.setState(() => ({suggestions, text: fixed_value}))
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
                    {
                        suggestions.map((item, index) => 
                        <li 
                            onClick={() => this.selectSuggestion(item)}
                            key={index}
                        >{item}</li>)
                    }
                </ul>
            </div>
        )
    }
    
    render() {
        const { text } = this.state;
        return(
            <div>
                <form className='search-bar' 
                      onSubmit = {(event) => this.props.onSubmit(event, text)}
                >
                    <div className='input-buttons'> 
                        <input
                            value={text} 
                            onChange={(event) => this.onTextChanged(event.target.value)} 
                            type='text'/>
                        <input type="image" alt="search" id="searchButton" src="https://img.icons8.com/cotton/64/000000/search--v2.png" onClick={() => this.selectSuggestion(this.state.text)}/>
                    </div>
                    {this.renderSuggestions()}
                </form>
            </div>
        )
    }
}

export default SearchBar
