import {useState, useRef} from 'react'
import '../google-maps/Google_maps'
import '../google-maps/Google_maps.scss'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
  } from "@react-google-maps/api";
import { formatRelative, set } from 'date-fns';
import { useCallback } from 'react';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";

//   import mapStyles from "./mapStyles";

const libraries = ["places"]
const mapContainerStyle = {
    width: '100%',
    height: '37.8vh',
};
const center = {
    lat: 40.758480,
    lng: -111.888138,
};

export default function Google_maps(){
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
      });
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    const onMapClick = useCallback((e) => {
          setMarkers((current) => [
              ...current,
              {
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                  time: new Date(),
                },
            ]);
        }, []);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
      }, []);
    
      const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
      }, []);  


    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";


    return (
    <div>
      <Locate panTo={panTo} />
      <Search panTo={panTo} />

        <GoogleMap 
        mapContainerStyle={mapContainerStyle} 
        zoom={8}
        center={center}
        onClick={onMapClick}
        onLoad={onMapLoad}
        >
          {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }} 
            onClick={() => {
                setSelected(marker);
            }}
            />
          ))}

         {selected ? (
         <InfoWindow 
         position={{lat: selected.lat, lng: selected.lng }} 
         onCloseClick={() => {
             setSelected(null);
         }}>
            <div>
             <h2>Marked</h2>   
             <p>Marked {formatRelative(selected.time, new Date())}</p>
             </div> 
         </InfoWindow>) : null}
        </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
    return (
      <button
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <img src="https://blogs.flinders.edu.au/student-news/wp-content/uploads/sites/89/2019/05/compass-blog.png" alt="compass" />
      </button>
    );
  }

  function Search({ panTo }) {
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 43.6532, lng: () => -79.3832 },
        radius: 100 * 1000,
      },
    });
  
    // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest
  
    const handleInput = (e) => {
      setValue(e.target.value);
    };
  
    const handleSelect = async (address) => {
      setValue(address, false);
      clearSuggestions();
  
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);
        panTo({ lat, lng });
      } catch (error) {
        console.log("😱 Error: ", error);
      }
    };
  
    return (
      <div className="search">
        <Combobox onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search your location"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    );
  }