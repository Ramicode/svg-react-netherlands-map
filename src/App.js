import React, { Component } from 'react';
import Map from './Map';
import './App.css';

class App extends Component {

  onRegionClicked = (event, activeRegions) => {
  }

  onMouseEnter = (event, activeRegion) => {
  }

  onMouseOut = (event) => {
  }
  render() {
    return (
      <div className="App">
        <Map/>
      </div>
    );
  }
}

export default App;
