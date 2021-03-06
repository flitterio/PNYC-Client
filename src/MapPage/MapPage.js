import React from 'react';
import {Link, Route} from 'react-router-dom';
import {GoogleMap, useLoadScript,  InfoWindow, Marker} from '@react-google-maps/api';
import { formatRelative } from 'date-fns';
import './MapPage.css';

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
import mapStyles from './mapStyles';
import InfoPopUp from '../InfoPopup/InfoPopup';


const libraries = ['places'];
const mapContainerStyle ={
    width: '100vw',
    height: '89vh'
};
const center = {
    //Manhattan is default center
    lat: 40.7831,
    lng: -73.9712,
}
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true
}
export default function App(props) {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAP_API_KEY,
       libraries
    });
    const [markers, setMarkers] = React.useState(center);
    const [selected, setSelected] = React.useState(null);
    const [newPrompt, setNewPrompt] = React.useState(null);
    const [tempLocation, setTempLocation] = React.useState({});
    const [currentLocation, setCurrentLocation] = React.useState(center);
    const [popUp, setPopUp] = React.useState(false);

   //establishes current location if allowed 
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

    //gets bathrooms from props for markers
    React.useEffect (() => {
           setMarkers(props.bathrooms)
    }, []);

    //controls if popup is rendered 
    const renderPopUp = () => {
        if(popUp){
            return(
                <div >
                    <InfoPopUp toggle={() => {setPopUp(!popUp)}} />
                </div>
            )
        }
    }

    const onMapClick = React.useCallback((event) => {
                setTempLocation({
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng() 
                });
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
            <Help setPopUp={setPopUp} popUp={popUp}/>
            {renderPopUp()}

            <Link to='/' className='pnyc'>PNYC </Link>
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
                        url:'./blue-dot.png',
                        scaledSize: new window.google.maps.Size(25, 25),
                        origin: new window.google.maps.Point(0,0),
                        anchor: new window.google.maps.Point(15, 15)
                    }}
                />
            {/* This should map the pre-existing markers  */}
                    {markers.map((marker) => (
                    <Marker 
                        key={marker.lat + marker.lng + marker.br_name} 
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
                 {Object.keys(tempLocation).length !== 0 ? 
                    (<Marker 
                        key={tempLocation.lat + tempLocation.lng} 
                        position={{lat: tempLocation.lat, lng: tempLocation.lng}}
                        icon={{
                            url:'./pile-of-poo_1f4a9.png',
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0,0),
                            anchor: new window.google.maps.Point(15, 15)
                        }}
                        onClick={() => {
                            setNewPrompt(tempLocation);
                            
                        }}
                    /> ) : null
                }
               {selected ? (
                    //this Info Window Will be for markers that already exist.
                    <InfoWindow 
                        position={{lat: selected.lat, lng: selected.lng}} 
                        onCloseClick={() => {
                            setSelected(null);
                            }}
                    >
                        <div>
                            <Link to={`/${selected.id}`} className='selected'>
                                <h2>{selected.br_name}</h2>
                            </Link>
                                <button onClick={(e) => {
                            e.preventDefault() 
                            window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                            }
                            className='directions'
                        >
                            Directions
                        </button>
                        <br /><br />
                            <Link to={`/${selected.id}`} className='selected'>
                                More Info
                            </Link>

                        </div>
                </InfoWindow>) : null}

                {newPrompt ? (
                    //new marker
                    <InfoWindow 
                        position={{lat: newPrompt.lat, lng: newPrompt.lng}} 
                        onCloseClick={() => {
                            setNewPrompt(null);
                            setTempLocation({});
                            }}
                    >
                        <div>
                            <h2>Do You Want to Add This as a Bathroom?
                            </h2>

                            <Link to={`/new-bathroom`}
                                 onClick={ () => props.handleNewBathroom(newPrompt.lat, newPrompt.lng)}
                            >
                                Add Bathroom
                            </Link>
                            
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
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
            <img src='./current-location-trans1.png' alt ='find current location' />
        </button>
    )
}

function Help({setPopUp, popUp}) {
    return (
        <button className='help' 
        onClick={() => setPopUp(!popUp)}
        >
            <img src='./info.png' alt ='extra help' />
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
