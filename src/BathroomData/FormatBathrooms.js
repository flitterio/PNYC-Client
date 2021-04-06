import { render } from '@testing-library/react';
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import {bathroomList} from './Bathrooms';

class FormatBathrooms extends React.Component {
geocodeIt = address => {
    geocodeByAddress(address)
    .then(results => getLatLng(results[0]))
    .then(latLng => console.log('Success', latLng))
    .catch(error => console.error('Error', error));
};

componentDidMount() {
    this.state.list = bathroomList
}


render(){
    const {list} = this.state
    console.log(list.map(address => this.geocodeIt(address.location)))
    return(
        <div>
            {this.geocodeIt}
        </div>
    )}

}

export default FormatBathrooms;