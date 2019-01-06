import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class SideList extends Component {

  //if a list item is clicked the corresponding marker
  //is highlighted and its infowindow is called
  onNameClick = (location) => {
    this.props.markerArray.map(marker => {
      if(marker.title === location.title){
        this.props.setActiveMarker(marker);
        this.props.setShowingInfoWindow(true);
      }
      return marker;
    })
  }

  render(){

    let shownLocations;
    //this filters the location list based on the searched word
    if(this.props.query) {
      const match = new RegExp(escapeRegExp(this.props.query), 'i');
      shownLocations = this.props.markerArray.filter((marker) => match.test(marker.title));
    } else {
      shownLocations = this.props.markerArray;
    }

    shownLocations.sort(sortBy('title'));

    let sideList = document.getElementById('sidelist');
    //if the sideIsOpen state in app.js is true the sidelist is shown,
    //otherwise the sidelist is hidden
    if(sideList !== null){
      this.props.sideIsOpen
        ? sideList.style.left = '0px'
        : sideList.style.left = '-230px'

    }
    return(
      <div id='sidelist'>
      {/*hamburger icon from https://icons8.com/icon/set/hamburger/all*/}
      {/*if hamburger icon is clicked the sidelist is shown*/}
        <img
        onClick={() => this.props.setSideList(false)}
        src='hamburger-menu.png'
        alt='hamburger icon'
        tabIndex='0'
        height='40'
        width='40'/>
        <h2>Locations</h2>
        <div className='search-top'>
          <input
          type='text'
          role='textbox'
          aria-labelledby='location filter'
          placeholder='filter locations'
          className='filter-locations'
          value={this.props.query}
          onChange={(event) => this.props.updateQuery(event.target.value)}
          />
        </div>
        {shownLocations.length === 0 &&
        <div>no locations found</div>
        }
        {shownLocations.map(location=> (
          <div
            className='location-list'
            key={location.title}
            tabIndex='0'
            onClick={() => this.onNameClick(location)}>
              {location.title}
          </div>
        ))}

      </div>
    )
  }
}

export default SideList
