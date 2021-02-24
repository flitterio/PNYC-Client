import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
  
require('dotenv').config();

class MapPage extends Component {
      constructor(props) {
        super(props);
        this.state = { 
            address: '',

            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            
            mapCenter:{
                lat: 40.7831,
                lng: -73.9712
            }
        };
    }

      handleChange = address => {
        this.setState({ address });
      };
     
      handleSelect = address => {
        this.setState({address});
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latLng => {
               console.log('Success', latLng);

               this.setState({mapCenter: latLng});
            })
          .catch(error => console.error('Error', error));
      };
    //   onMarkerClick = (props, marker, e) =>
    //     this.setState({
    //       selectedPlace: props,
    //       activeMarker: marker,
    //       showingInfoWindow: true
    //     });
    
    //   onMapClicked = (props) => {
    //     if (this.state.showingInfoWindow) {
    //       this.setState({
    //         showingInfoWindow: false,
    //         activeMarker: null
    //       })
    //     }
    //   };
    
      render() {
        return (
        <div id="googleMap">
            <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
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
            <Map google={this.props.google}
                initialCenter={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
                center={{
                    lat: this.state.mapCenter.lat,
                    lng: this.state.mapCenter.lng
                }}
                >
                <Marker 
                    position={{
                        lat: this.state.mapCenter.lat,
                        lng: this.state.mapCenter.lng
                    }}
                />
            </Map>
          </div>
        )
      }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCDsu4FlzhpUbPlfD90SbJFlF8efWr-fn4')
  })(MapPage); 