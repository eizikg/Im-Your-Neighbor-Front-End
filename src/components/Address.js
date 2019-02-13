import PlacesAutocomplete from 'react-places-autocomplete';
import {geocodeByAddress, geocodeByPlaceId, getLatLng} from 'react-places-autocomplete';
import React, { Component } from 'react';
import EachGroup from '../components/EachGroup.js'

class Address extends Component {

state={
  address: ""
}

  handleChange = address => {
  this.setState({ address });
};

handleSelect = address => {
  geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => {
      console.log('Success', latLng)
      this.setState({
         address: address,
         location: latLng
      })
      console.log(this.state)
      this.props.getVolounteersLocation(this.state)
    })
    .catch(error => console.error('Error', error));
};


render() {
  // console.log(this.searchOptions())
  return (
    <div>
    <PlacesAutocomplete
      value={this.state.address}
      onChange={this.handleChange}
      onSelect={this.handleSelect}
      // searchOptions={this.searchOptions()}x
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active
                ? 'suggestion-item--active'
                : 'suggestion-item';
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  </div>
  );
}

}

export default Address;
