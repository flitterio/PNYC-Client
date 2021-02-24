import React, {Component} from 'react';
import {GoogleMap, useLoadScript,  InfoWindow, Marker} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';

import '@reach/combobox/styles.css';
import { FaTextHeight } from 'react-icons/fa';
import mapStyles from './mapStyles';


const libraries = ['places'];
const mapContainerStyle ={
    width: '100vw',
    height: '100vh'
};
const center = {
    lat: 40.7831,
    lng: -73.9712,
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}
export default function App() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
       libraries
    });
    const [markers, setMarkers] = React.useState([]);

    if(loadError) return "Error loading maps";
    if(!isLoaded) return 'Loading Maps';
    return (
        <div>
            <h1 className='pnyc'>PNYC </h1>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={center}
                options={options}
                onClick={(event) => {
                    setMarkers(current => [...current, {
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                        time: new Date()
                        },
                    ]);
                }}
            >
                    {markers.map(marker => <Marker key={marker.lat + marker.lng} position={{lat: marker.lat, lng: marker.lng}}/> )}
            </GoogleMap>
        </div>
    )
}