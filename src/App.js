import React, { Component } from 'react';
import './App.css';
import SideList from './SideList';
import MapSide from './MapSide';

const locationsData = [
  {title: 'Nintendo World Store', location: {lat: 40.758056, lng: -73.979444}},
  {title: 'Adidas Flagship New York', location: {lat: 40.756113, lng: -73.978676}},
  {title: 'Hatsuhana', location: {lat: 40.757304, lng: -73.976942}},
  {title: 'Cassa', location: {lat: 40.756318, lng: -73.982232}},
  {title: 'The Tour at NBC Studios', location: {lat: 40.759383, lng: -73.980104}}
];


class App extends Component {

  state = {
     locations: [],
     markers: [],
     activeMarker: {title: 'Nintendo World Store', location: {lat: 40.758056, lng: -73.979444}},
     showingInfoWindow: false,
     query: '',
     sideIsOpen: false

  }
  //loads the location data into the locations in state
  loadLocations = () =>
  this.setState(
    locationsData.map(location=>(
      this.state.locations.push(location)
    ))
  );
  //got some help with the markers from https://www.youtube.com/watch?v=cJ3sAG2Ybq4
  //creates a markers arrray based the the locations in state
  loadMarkers = () =>{

    this.setState({
      markers: this.state.locations.map((marker) =>{

        return {
          position: marker.location,
          title: marker.title,
          isOpen: true,
          isVisible: true,
          urlObject: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"},
          image: false
        }
      } )
    })
  }

    //got some help for this from https://medium.com/@ruthmpardee/passing-data-between-react-components-103ad82ebd17
    setActiveMarker = (marker) => {
      this.setState({activeMarker: marker});
    }

    setShowingInfoWindow = (boolean) => {
      this.setState({showingInfoWindow: boolean});
    }

    updateQuery = (query) => {
      this.setState({query: query.trim()});
      this.setShowingInfoWindow(false);
    }

    setSideList = (boolean) => {
      this.setState({sideIsOpen: boolean})
    }

    loadImage = () => {
      function addImage() {
        // let htmlContent = '';
        const data = JSON.parse(this.responseText);
        const firstImage = data.results[0];

        // htmlContent = document.createElement();
        // let textnode = document.createElement('IMG');
        let cat = document.getElementById('cat');
        cat.src = ''+firstImage.urls.small;
        cat.style.width = '150px';
        cat.style.height = '150px';
        cat.style.top = '100px';
        // splash.appendChild(textnode);
      }

      // searchedForText = 'cat';
      const unsplashRequest = new XMLHttpRequest();
      unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=cat`);
      unsplashRequest.onload = addImage;
      unsplashRequest.setRequestHeader('Authorization', 'Client-ID f1ca461fd3d402ae161678937ee555478a8a1a4719d7a30ad63503dc1a761804');

      unsplashRequest.send();
    }

  componentDidMount(){
    this.loadLocations();
    this.loadMarkers();
    let appdiv = document.getElementsByClassName('App')[0].children;
    //this waits four seconds and if the map is still loading
    //an error message appears informing the user it is unable to load map
    setTimeout(function(){
      if(appdiv[2].innerHTML === 'Loading...'){
        document.getElementById('error-header').innerHTML = 'map failed to load due to connection';
      }
    }, 4000);
  }

  render() {

    return (
      <div className="App">
          <h2 id='error-header'></h2>
          <SideList
          markerArray={this.state.markers}
          setActiveMarker={this.setActiveMarker}
          setShowingInfoWindow={this.setShowingInfoWindow}
          query={this.state.query}
          updateQuery={this.updateQuery}
          sideIsOpen={this.state.sideIsOpen}
          setSideList={this.setSideList}
          />
          <MapSide
          showingInfoWindow={this.state.showingInfoWindow}
          setShowingInfoWindow={this.setShowingInfoWindow}
          markerArray={this.state.markers}
          setActiveMarker={this.setActiveMarker}
          activeMarker={this.state.activeMarker}
          query={this.state.query}
          setSideList={this.setSideList}
          setImageShown={this.setImageShown}
          />
      </div>
    );
  }
}

export default App;
