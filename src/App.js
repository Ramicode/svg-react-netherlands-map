import React, { Component } from 'react';
import Map from './Map';
import './App.css';

class App extends Component {

  onRegionClicked = (event, activeRegions) => {
    console.log(activeRegions)
  }

  onMouseEnter = (event, activeRegion) => {
    console.log('enter :', activeRegion)
  }

  onMouseOut = (event) => {
    console.log('exit')
  }
  render() {
    return (
      <div className="App">
        <Map
          onRegionClicked={this.onRegionClicked}
          onMouseEnter={this.onMouseEnter}
          onMouseOut={this.onMouseOut}
        />
      </div>
    );
  }
}

export default App;
