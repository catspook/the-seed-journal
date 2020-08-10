import React from "react";
import ResultList from "./SearchResults";

class SearchContent extends React.Component {
  // Render next and previous button and the search result list
  renderList(results) {
    let length = results.length;
    if (length > 0) {
      return (
        <div className="search-nav">
          <div className="d-flex justify-content-around">
            <button
              className="btn secondary-background primary"
              onClick={() => this.props.newPage(false)}
            >
              <b>previous</b>
            </button>
            <button
              className="btn secondary-background primary"
              onClick={() => this.props.newPage(true)}
            >
              <b>next</b>
            </button>
          </div>
          <ResultList
            items={results}
            value={this.props.value}
            slugs={this.props.slugs}
          />
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderList(this.props.resultList)}</div>;
  }
}

export default SearchContent;
