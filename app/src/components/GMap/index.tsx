import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import api from '../../services/api';

import { GoogleMap, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { BusLinhas, BusGeo, PathPolyline, PathOptions, GMapData } from './types'

import "./map.css";
import { StoreState } from '../../store/createStore';
import { ContactSupportOutlined } from '@material-ui/icons';
import { mapData } from '../../store/modules/mapdata/actions';



// const mapStyle = {
//     width: '100%',
//     height: '100%',
// };

// const center = {
// 	lat: -23.550520,
// 	lng: -46.633308,
// }


const GMap: React.FC = () => {

    const path = [
        { lat: -23.444654, lng: - 46.804041 },
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

	// AUTO UPDATE
	const [ update, setUpdate] = useState(() => { return false});
	useEffect(() => {
		setTimeout(() => {
			setUpdate( currValue => { return currValue ? false : true});
		}, 30000);
	});
	

	// MAP CONFIG
	const { center, mapStyle, zoom } = useSelector((state: StoreState) => state.mapconfig)

	const { searchValue } = useSelector((state: StoreState) => state.search)
    const [ posicoes, setPosicoes] = useState([]);
	useEffect(() => {
		
		
		// api.get("/Posicao").then( res => {
		// 	setPosicoes(res.data.l);
		// 	handleMetaData(false, res.data.hr);

		// })

	

		switch (searchValue){
			case 'QUERY_DISPLAY_ALL':
				// const api = axios.create({ baseURL: 'http://192.168.2.152:3333'});
				api.get("/Posicao").then( res => {
					setPosicoes(res.data.l);
					handleMetaData(true, res.data.hr);

				})
			case '2506':
				api.get(`/Posicao/Linha?codigoLinha=${searchValue}`).then( res => {
					setPosicoes(res.data.l);
					handleMetaData(true, res.data.hr);

				})
			default:
				api.get("/Posicao").then( res => {
					setPosicoes(res.data.l);
					handleMetaData(true, res.data.hr); 

				})
			// 	case 'QUERY_DISPLAY_PARADA_CORREDOR':	
			// 	case 'QUERY_DISPLAY_PARADA_LINHA':
			// 	case 'QUERY_DISPLAY_LINHA_BUSCAR':
		
		}

		
		
	}, [searchValue, update]);
	
	// * NUMBER OF CARS AND TIME HANDLER
	const [ metaData, setMetaData ] = useState(() => {
		return {totalCarsLoaded: 0, timeLoaded: ''}
	});
	function handleMetaData(reset: boolean, time: string = '') {
		// case true, set number of cats, else, set time
		if (time === ''){
			setMetaData(prevTotal => {
				return {
					...prevTotal,
					totalCarsLoaded: prevTotal.totalCarsLoaded + 1
				}
			});
		} else {
			setMetaData(prevTotal => {
				return {
					...prevTotal,
					timeLoaded: time
				}
			});
		}

		if (reset) {
			setMetaData(prevTotal => {
				return {
					...prevTotal,
					totalCarsLoaded: 0
				}
			});
		}
	}

	useEffect( () => {
		updateMetaData()
	}, [metaData])

	const dispatch = useDispatch();
	const updateMetaData = () => {
		console.log("dispatched")
		dispatch(mapData({
			metaInfo: {
				totalCars: metaData.totalCarsLoaded,
				updateTime: metaData.timeLoaded
			}
		}))
	}


    return (
        <div className='mapContainer'>
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_API}
        >
            <GoogleMap mapContainerStyle={mapStyle} zoom={zoom} center={center}>
                
            {posicoes.map( ( busLinhas : BusLinhas ) => (
                busLinhas.vs.map( ( bus: BusGeo) => (
                    <Marker
						onLoad={() => handleMetaData(false)}
						key={bus.p} 
						position={ { lat: bus.py, lng: bus.px } }
                    />
                ))
            ))};

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
