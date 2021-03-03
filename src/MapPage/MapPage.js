import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {GoogleMap, useLoadScript,  InfoWindow, Marker} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import CommentRate from '../CommentRate/CommentRate'

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox';

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
    const [selected, setSelected] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(center);
    
    React.useEffect (() => {
            navigator.geolocation.getCurrentPosition((position) => {
                setCurrentLocation(
                    {  
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                ) 
            },
             () => null, options);
    }, []);


    const onMapClick = React.useCallback((event) => {
        setMarkers(current => [...current, {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date()
            },
        ]);
    }, []);

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(18);
    }, []);

    if(loadError) return "Error loading maps";
    if(!isLoaded) return 'Loading Maps';
    return (
        <div>
            <Search panTo={panTo}/>
            <Locate panTo={panTo}/>

            <h1 className='pnyc'>PNYC </h1>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom={12}
                center={currentLocation || center}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
            >
                <Marker
                    key='uRHere' 
                    position= {{lat: currentLocation.lat,
                    lng : currentLocation.lng}}
                    icon={{
                        url:'./blue.png',
                        scaledSize: new window.google.maps.Size(25, 25),
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(15, 15)
                    }}
                />
                    {markers.map((marker) => (
                    <Marker 
                        key={marker.lat + marker.lng} 
                        position={{lat: marker.lat, lng: marker.lng}}
                        icon={{
                            url:'./pile-of-poo_1f4a9.png',
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0,0),
                            anchor: new window.google.maps.Point(15, 15)
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    /> 
                ))}

                {selected ? (
                    <InfoWindow 
                        position={{lat: selected.lat, lng: selected.lng}} 
                        onCloseClick={() => {
                            setSelected(null);
                            }}
                    >
                        <div>
                            <h2>Public Bathroom</h2>
                            <p>Added {formatRelative(selected.time, new Date())}</p>
                            <div class="rate">
                                <input type="radio" id="star5" className="rate" value="5" />
                                <label htmlFor="star5" title="text">5 stars</label>
                                <input type="radio" id="star4" className="rate" value="4" />
                                <label htmlFor="star4" title="text">4 stars</label>
                                <input type="radio" id="star3" className="rate" value="3" />
                                <label htmlFor="star3" title="text">3 stars</label>
                                <input type="radio" id="star2" className="rate" value="2" />
                                <label htmlFor="star2" title="text">2 stars</label>
                                <input type="radio" id="star1" className="rate" value="1" />
                                <label htmlFor="star1" title="text">1 star</label>
                            </div>
                            <Link to={`/rate/hashdidURL`}>
                                Add Rating
                            </Link>
                        </div>
                </InfoWindow>) : null}
            </GoogleMap>
        </div>
    )
}

function Current() {
console.log('current location called')

    return (
        <img src='./blue.png' alt='blue current location dot' />
    )
}

function Locate({panTo}) {
    return (
        <button className='locate' onClick={() => {
            navigator.geolocation.getCurrentPosition((position) => {

                panTo({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
             () => null, options);
        }}>
            <img src='./current-location.png' alt ='find current location' />
        </button>
    )
}

function Search({panTo}){
    const {
        ready, 
        value, 
        suggestions: {status, data}, 
        setValue, 
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 40.7831, lng: () => -73.9712, },
            radius: 200 * 1000,
        },
    });

    return (
    <div className='search'>
        <Combobox 
            onSelect={async (address) => {
                setValue(address, false);
                clearSuggestions();

                try{
                    const results = await getGeocode({address});
                    const { lat, lng} = await getLatLng(results[0]);
                    panTo({ lat, lng });

                }catch(error) {
                    console.log('error!');
                }
            }}
        >
            <ComboboxInput 
                value={value} 
                onChange={(e) => {
                    setValue(e.target.value);
                }} 
                disabled={!ready}
                placeholder="Enter an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                {status === 'OK' && data.map(({id, description}) =>
                     <ComboboxOption key = {id} value={description} />
                     )}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox> 
    </div> 
    )
}