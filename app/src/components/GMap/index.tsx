import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline
} from "@react-google-maps/api";

import "./map.css";

interface GeoInfo {
    lat: number,
	lng: number,
}

const mapStyle = {
    width: '100%',
    height: '100vh',
};

const center = {
	lat: -23.550520,
	lng: -46.633308,
}

const dest = {
	lat: -23.543727,
	lng: -46.629443,
}

const ori = {
	lat: -23.543727,
	lng: -46.629443,
}


interface BusGeo {
    "p": number,
    "a": boolean,
    "ta": string,
    "py": number,
    "px": number,
}

interface BusLinhas {
    "c": string,
    "cl": number,
    "sl": number,
    "lt0": string,
    "lt1": string,
    "qv": number,
    "vs": [BusGeo],
}

interface Bus {
    "hr": string,
    "l": [BusLinhas],
}


const GMap: React.FC = () => {

    const path = [
        { lat: -23.444654, lng: - 46.804041 },
        { lat: -23.444830, lng: - 46.804011},
        { lat: -23.444882, lng: - 46.803998},
        { lat: -23.444944, lng: - 46.803980},
        { lat: -23.444982, lng: - 46.803960},
        { lat: -23.445026, lng: - 46.803935},
        { lat: -23.445080, lng: - 46.803935},
        { lat: -23.445114, lng: - 46.803925},
        { lat: -23.445283, lng: - 46.803857},
        { lat: -23.445472, lng: - 46.803804},
        { lat: -23.445614, lng: - 46.803757},
        { lat: -23.445634, lng: - 46.803742},
        { lat: -23.445676, lng: - 46.803720},
        { lat: -23.445706, lng: - 46.803710},
        { lat: -23.445756, lng: - 46.803704},
        { lat: -23.445862, lng: - 46.803651},
        { lat: -23.446030, lng: - 46.803568},
        { lat: -23.446367, lng: - 46.803402},
        { lat: -23.446496, lng: - 46.803314},
        { lat: -23.446578, lng: - 46.803248},
        { lat: -23.446583, lng: - 46.803127},
        { lat: -23.446558, lng: - 46.802925 },
        { lat: -23.446542, lng: - 46.802826 },
        { lat: -23.446511, lng: - 46.802647 },
        { lat: -23.446423, lng: - 46.802251 },
        { lat: -23.446387, lng: - 46.802087 },
        { lat: -23.446327, lng: - 46.801849 },
        { lat: -23.446285, lng: - 46.801700 },
        { lat: -23.446206, lng: - 46.801493 },
        { lat: -23.446124, lng: - 46.801307 },
        { lat: -23.446109, lng: - 46.801273 },
        { lat: -23.446087, lng: - 46.801216 },
        { lat: -23.446049, lng: - 46.801108 },
        { lat: -23.445997, lng: - 46.800990 },
        { lat: -23.445971, lng: - 46.800926 },
        { lat: -23.445746, lng: - 46.800485 },
        { lat: -23.445654, lng: - 46.800305 },
        { lat: -23.445561, lng: - 46.800132 },
        { lat: -23.445518, lng: - 46.800023 },
        { lat: -23.445446, lng: - 46.799770 },
        { lat: -23.445334, lng: - 46.799559 },
        { lat: -23.445286, lng: - 46.799486 },
        { lat: -23.445231, lng: - 46.799444 },
        { lat: -23.445028, lng: - 46.799486 },
        { lat: -23.444678, lng: - 46.799492 },
        { lat: -23.444348, lng: - 46.799508 },
        { lat: -23.444389, lng: - 46.799641 },
        { lat: -23.444348, lng: - 46.799508 },
    ];
    
    const options = {
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 8,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
        radius: 10000,
        paths: path,
        zIndex: 1
    };

    // const searchInput = useSelector<string, string>( ( state ) => state );
    // console.log(searchInput)

    const [ posicoes, setPosicoes] = useState([]);

	useEffect(() => {
		const api = axios.create({ baseURL: 'http://192.168.2.152:3333'});
		api.get("/Posicao").then( response => {
			console.log(response.data.l);
			setPosicoes(response.data.l);
		})
    }, []);

    const marker = {lat: -23.432174, lng: -46.787095};
    return (
        <div className='mapContainer'>
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_API}
        >
            <GoogleMap mapContainerStyle={mapStyle} zoom={14} center={center}>
                
            {/* {posicoes.map( ( busLinhas : BusLinhas ) => (
                busLinhas.vs.map( ( bus: BusGeo) => (
                    <Marker
                    // onLoad={onLoad}
                    key={bus.p} 
                    position={ { lat: bus.py, lng: bus.px } }
                    />
                ))
            ))}; */}
            <Marker
                key={"asd"}
                position={marker}
            />

            <Polyline
                path={path}
                options={options}
            />


            </GoogleMap>
        </LoadScript>
        

        </div>
    );
}


export default GMap;
