import React from "react";
import SearchBase from "./Search/SearchBase";
import "../styles/scss/Body.scss";

class Body extends React.Component {
  handleRandom() {
    let current_url = window.location.href;
    let base_url = current_url.split("/")[2];
    let slug = this.handleRandom();
    let url = "http://" + base_url + "/plant/" + slug;
    this.setState(() => ({
      random_url: url,
    }));
    return url;
  }

  // Get the slug of a random plant
  async getSlug() {
    const page = Math.floor(Math.random() * this.state.pageMax) + 1;
    const cors_url = "https://cors-anywhere.herokuapp.com/";
    let url =
      cors_url +
      `https://trefle.io/api/v1/species?page=${page}&token=${process.env.REACT_APP_TREFLE_API_TOKEN}`;
    const json = await this.makeApiCall(url);
    const data_num = Math.floor(Math.random() * json.currentResults.length);
    const slug = json.currentResults[data_num].slug;
    return slug;
  }

  // Content to render on the home screen
  renderHome(searchValue) {
    return (
      <div>
        <SearchBase />
      </div>
    );
  }

  render() {
    return <div className="body">{this.renderHome()}</div>;
  }
}

export default Body;
