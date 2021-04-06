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
//NEED TO FIGURE OUT IF THIS CAN BE USED WITHOUT PLACESAUTOCOMPLETE TAG

render(){
    const list = bathroomList
return(
    <div>
    </div>
)}

}

export default FormatBathrooms;