import React from "react";
import "./styles.css";

import Card from "./Card";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchName: "",
      heroes: []
    };

    this.handleSearchNameChange = this.handleSearchNameChange.bind(this);
  }

  handleSearchNameChange(event) {
    this.setState({ searchName: event.target.value });
    this.searchSuperHeroByName(this.state.searchName);
  }

  searchSuperHeroByName(name) {
    fetch("https://superheroapi.com/api.php/10158291228183418/search/" + name)
      .then(response => response.json())
      .then(data => {
        if (data.response === "success") {
          this.setState({ heroes: data.results });
        } else {
          this.setState({ heroes: [] });
        }
      });
  }

  render() {
    return (
      <div className="App">
        <h1>Super Heroes App</h1>
        <div className="container">
          <div className="input-group mb-3">
            <input
              type="text"
              placeholder="Ingresar nombre super heroe"
              className="form-control"
              value={this.state.searchName}
              onChange={this.handleSearchNameChange}
            />
          </div>
        </div>
        <div className="container d-flex flex-wrap justify-content-center">
          {this.state.heroes.map(heroe => {
            return (
              <Card
                key={heroe.id}
                name={heroe.name}
                imageUrl={heroe.image.url}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
