import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import {mapKey, unsplashKey} from './keys.js';
const style = {
  height: '100vh',

}
let imgHidden = {display: 'none'}
let imgShown = {display: ''}

window.gm_authFailure = function() {
   console.log('hello error');
};

class MapSide extends Component {

  state = {
      mapCenter: {lat: 40.758056, lng: -73.979444}
  }
  //when the marker is clicked, it's highlighted and the infowindow is shown
  onMarkerClick = (props, marker, e) =>{
    this.props.setActiveMarker(marker);
    this.props.setShowingInfoWindow(true);

    function addImage() {
      const data = JSON.parse(this.responseText);
      const firstImage = data.results[0];

      let cat = document.getElementById('location1');
      cat.src = ''+firstImage.urls.small;
      cat.style.width = '100px';
      cat.style.height = '100px';
    }

    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=adidas`);
    unsplashRequest.onload = addImage;
    unsplashRequest.setRequestHeader('Authorization', unsplashKey);
    unsplashRequest.send();
    //image load 2
    function addImage2() {
      const data = JSON.parse(this.responseText);
      const firstImage = data.results[0];

      let cat = document.getElementById('location2');
      cat.src = ''+firstImage.urls.small;
      cat.style.width = '100px';
      cat.style.height = '100px';
    }

    const unsplashRequest2 = new XMLHttpRequest();
    unsplashRequest2.open('GET', `https://api.unsplash.com/search/photos?page=1&query=mexican+restaurant`);
    unsplashRequest2.onload = addImage2;
    unsplashRequest2.setRequestHeader('Authorization', unsplashKey);
    unsplashRequest2.send();
    //image load 3
    function addImage3() {
      const data = JSON.parse(this.responseText);
      const firstImage = data.results[0];

      let cat = document.getElementById('location3');
      cat.src = ''+firstImage.urls.small;
      cat.style.width = '100px';
      cat.style.height = '100px';
    }

    const unsplashRequest3 = new XMLHttpRequest();
    unsplashRequest3.open('GET', `https://api.unsplash.com/search/photos?page=1&query=japanese+restaurant`);
    unsplashRequest3.onload = addImage3;
    unsplashRequest3.setRequestHeader('Authorization', unsplashKey);
    unsplashRequest3.send();
    //image load 4
    function addImage4() {
      const data = JSON.parse(this.responseText);
      const firstImage = data.results[0];

      let cat = document.getElementById('location4');
      cat.src = ''+firstImage.urls.small;
      cat.style.width = '100px';
      cat.style.height = '100px';
    }

    const unsplashRequest4 = new XMLHttpRequest();
    unsplashRequest4.open('GET', `https://api.unsplash.com/search/photos?page=1&query=nintendo`);
    unsplashRequest4.onload = addImage4;
    unsplashRequest4.setRequestHeader('Authorization', unsplashKey);
    unsplashRequest4.send();
    //image load 5
    function addImage5() {
      const data = JSON.parse(this.responseText);
      const firstImage = data.results[0];

      let cat = document.getElementById('location5');
      cat.src = ''+firstImage.urls.small;
      cat.style.width = '100px';
      cat.style.height = '100px';
    }

    const unsplashRequest5 = new XMLHttpRequest();
    unsplashRequest5.open('GET', `https://api.unsplash.com/search/photos?page=1&query=nbc`);
    unsplashRequest5.onload = addImage5;
    unsplashRequest5.setRequestHeader('Authorization', unsplashKey);
    unsplashRequest5.send();
  };
  //when the map is clicked if the infowindow is showing it hides it,
  // recenters the map and removes color of clicked marker
    onMapClicked = (props) => {
      this.props.setShowingInfoWindow(false);
  };

  render(){

   let bounds = new this.props.google.maps.LatLngBounds();
   //this sets the map bounds around the markers
   for(let i = 0; i < this.props.markerArray.length; i++) {
     bounds.extend(this.props.markerArray[i].position);
   }

   let shownMarkers;
   //this filters the markers shown based on the given query
   if(this.props.query) {
     const match = new RegExp(escapeRegExp(this.props.query), 'i');
     shownMarkers = this.props.markerArray.filter((marker) => match.test(marker.title));
   } else {
     shownMarkers = this.props.markerArray;
   }

   shownMarkers.sort(sortBy('title'));

    return(
      <div id='mapside'>
      {/*hamburger icon from https://icons8.com/icon/set/hamburger/all*/}
      {/*if hamburger icon is clicked the sidelist is shown*/}
      <img
      id='floater'
      onClick={() => this.props.setSideList(true)}
      src='hamburger-menu.png'
      alt='hamburger icon'
      tabIndex='0'
      height='40'
      width='40'/>
        <Map
        style={style}
        google={this.props.google}
        zoom={16}
        initialCenter={
          this.state.mapCenter
          }
        center={this.state.mapCenter}
        onClick={this.onMapClicked}
        bounds={bounds}
        >
          {shownMarkers.map(marker=>(

            <Marker
            ref={this.onMarkerMounted}
            onClick={ this.onMarkerClick}
            name={marker.title}
            title= {marker.title}
            position={marker.position}
            key={marker.title}
            icon={marker.urlObject}
            />

          ))}
          {/*if a marker is clicked a green marker pops up in front of
            it to show its the clicked marker*/}
            <Marker
            name={this.props.activeMarker.title}
            title= {this.props.activeMarker.title}
            visible={this.props.showingInfoWindow}
            position={this.props.activeMarker.position}
            key={this.props.activeMarker.title}
            icon={{url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}}
            />
            <InfoWindow
            onClose={this.onMapClicked}
            position={this.props.activeMarker.position}
            visible={this.props.showingInfoWindow}
            options={{pixelOffset: new this.props.google.maps.Size(0,-30)}}>
              <div id='splash'>
                <h1>{this.props.activeMarker.title}</h1>
                <img id='location1' alt='adidas' style={this.props.markerArray[0].title === this.props.activeMarker.title ? imgShown : imgHidden}/>
                <img id='location2' alt='cassa restaurant' style={this.props.markerArray[1].title === this.props.activeMarker.title ? imgShown : imgHidden}/>
                <img id='location3' alt='hatsuhana restaurant' style={this.props.markerArray[2].title === this.props.activeMarker.title ? imgShown : imgHidden}/>
                <img id='location4' alt='nintendo world store' style={this.props.markerArray[3].title === this.props.activeMarker.title ? imgShown : imgHidden}/>
                <img id='location5' alt='nbc studios' style={this.props.markerArray[4].title === this.props.activeMarker.title ? imgShown : imgHidden}/>
                <div>images from unplash.com api</div>
              </div>
            </InfoWindow>
        </Map>
      </div>

    )
  }
}

export default GoogleApiWrapper({
  apiKey: mapKey
})(MapSide)
