import React from "react";
import { InputGroup, FormControl, Button, Row } from "react-bootstrap";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
      searching: this.props.searching,
    };
  }

  onTextChanged = (e) => {
    //Find matching regex to input value every time it is updated
    //Change slice to change the max number of matches to show
    const value = e.target.value;
    let fixed_value = value.replace(/[^'`.\-A-Za-z\s]/gi, "");
    let suggestions = [];

    if (fixed_value.length > 0) {
      let first = fixed_value.charAt(0);
      if (first in this.props.plantList) {
        let plantArray = this.props.plantList[first];
        const regex = new RegExp(`${fixed_value}`, "i");
        suggestions = plantArray.filter((v) => regex.test(v));
      }
    }
    this.setState(() => ({ suggestions, text: fixed_value }));
  };

  selectSuggestion(value) {
    //Update input value to selected and set the suggestion
    //list to an empty list when a suggestion is selected.
    this.setState(() => ({
      text: value,
      suggestions: [],
    }));
  }

  submitSearch(event) {
    this.selectSuggestion(this.state.text);
    this.props.onSubmit(event, this.state.text);
  }

  renderSuggestions() {
    //Render the contents of matching regex in an unordered list
    //Make the list element clickable to fill the input field
    let { suggestions } = this.state;

    if (suggestions.length === 0) {
      return null;
    }

    // display at most 8 results
    if (suggestions.length > 8) {
      suggestions = suggestions.slice(0, 7);
    }

    return (
      <div className="search-size prediction-container">
        {this.state.searching
          ? suggestions.map((item, index) => (
              <Row
                onClick={() => this.selectSuggestion(item)}
                key={index}
                className="justify-content-center predictions-res show primary secondary-background"
              >
                <p>{item}</p>
              </Row>
            ))
          : null}
      </div>
    );
  }

  render() {
    const { text } = this.state;

    return (
      <form
        className="search-size"
        onSubmit={(event) => this.submitSearch(event)}
      >
        <InputGroup className="mb-3 input-group-lg">
          <InputGroup.Prepend>
            <Button
              variant="btn secondary-background"
              onClick={(event) => this.submitSearch(event)}
            >
              <i className="fa fa-search primary"></i>
            </Button>
          </InputGroup.Prepend>
          <FormControl
            value={text}
            onChange={this.onTextChanged}
            placeholder="lavender"
            aria-label="Plant Search Box"
            ref={(input) => (this.myInput = input)}
          />
        </InputGroup>
        {this.renderSuggestions()}
      </form>
    );
  }
}

export default SearchBar;
