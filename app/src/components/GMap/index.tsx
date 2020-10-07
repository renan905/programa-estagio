import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';

import { GoogleMap, InfoWindow, LoadScript, Marker, Polyline } from "@react-google-maps/api";
import { BusLinhas, BusGeo, PathPolyline, PathOptions, GMapData } from './types'


import "./map.css";
import { StoreState } from '../../store/createStore';
import { mapData } from '../../store/modules/mapdata/actions';
import mapconfig from '../../store/modules/mapconfig/reducer';
import { mapCenterZoom } from '../../store/modules/mapconfig/actions';
import { ParadasTypes } from '../Sidebar/types';

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
	
	const dispatch = useDispatch();


	// AUTO UPDATE
	const [ update, setUpdate] = useState(() => { return false});
	// useEffect(() => {
	// 	setInterval(() => {
	// 	console.log("atualizando")
	// 		setUpdate( currValue => { return currValue ? false : true});
	// 	}, 60000);
	// });

	// setTimeout(() => {
	// 	console.log("atualizando")
	// 	setUpdate( currValue => { return currValue ? false : true});
	// }, 60000);
	

	// MAP CONFIG
	const { center, mapStyle, zoom } = useSelector((state: StoreState) => state.mapconfig)


	// * NUMBER OF CARS AND TIME HANDLER
	const [ metaData, setMetaData ] = useState(() => {
		return {totalCarsLoaded: 0, timeLoaded: '', totalParadas: 0}
	});
	function handleMetaData(reset: boolean, time: string = '', paradas: number = 0) {
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

		if (paradas !== 0){
			setMetaData(prevTotal => {
				return {
					...prevTotal,
					totalParadas: paradas
				}
			});
		}

		if (reset) {
			setMetaData(prevTotal => {
				return {
					...prevTotal,
					totalCarsLoaded: 0,
					totalParadas: 0
				}
			});
		}

	}


	const { searchValue, searchType } = useSelector((state: StoreState) => state.search)
    const [ posicoes, setPosicoes] = useState([]);
	useEffect(() => {
		handleMetaData(true)
		switch (searchType){
			case 'QUERY_DISPLAY_ALL':
				api.get("/Posicao").then( res => {
					setPosicoes(res.data.l);
					handleMetaData(false, res.data.hr);

				})
			case 'QUERY_POSICAO_VEICULO_LINHA':
				api.get(`/BuscarPosicaoVeiculoLinha?linha=${searchValue}`).then( res => {
					setPosicoes(res.data.vs);
					handleMetaData(false, res.data.hr);
					dispatch(mapCenterZoom({
						center: {
							lat: res.data.vs[0].py,
							lng: res.data.vs[0].px
						},
						zoom: 13
					}))

				}).catch(err => {
					console.log(err)
				})

			default:
				break
				
		}		
	}, [searchValue, update]);


	const [ paradas, setParadas] = useState([]);
	useEffect(() => {
		handleMetaData(true)
		switch (searchType){
			case 'QUERY_POSICAO_VEICULO_LINHA':
				api.get(`/BuscarParadasVeiculoLinha?linha=${searchValue}`).then( res => {
					setParadas(res.data);
					console.log(res.data)

				}).catch(err => {
					console.log(err)
				})

			case 'QUERY_PARADAS_CODIGO_LINHA':
				api.get(`/BuscarPosicaoVeiculoLinha?linha=${searchValue}`).then( res => {
					setParadas(res.data);
					console.log(res.data);
				}).catch(err => {
					console.log(err)
				})
			default:
				break

		}		
	}, [searchValue, update]);
	
	useEffect( () => {
		updateMetaData()
	}, [metaData])

	const updateMetaData = () => {
		console.log("dispatched")
		dispatch(mapData({
			metaInfo: {
				totalCars: metaData.totalCarsLoaded,
				updateTime: metaData.timeLoaded,
				totalParadas: metaData.totalParadas
			}
		}))
	}


	const [ infoWindowsSelectBus, setInfoWindowsBus] = useState(() =>{
		let busMarker: BusGeo = {
			ta: '',
			a: false,
			p: 0,
			px: 0,
			py: 0 
		};
		let select = false;
		return {busMarker, select}
	}
	);

	const [ infoWindowsSelectParadas, setInfoWindowsParadas] = useState(() =>{
		let paradasMarker: ParadasTypes = {
			cp: 0,
			np: '',
			ed: '',
			px: 0,
			py: 0

		};
		let select = false;
		return {paradasMarker, select}
	}
	);

	const handleSelectInfoWindowBus = (bus: BusGeo, state:boolean = false) => {
		setInfoWindowsBus({busMarker: bus, select: state})
	}

	const handleSelectInfoWindowParada = (parada: ParadasTypes, state:boolean = false) => {
		setInfoWindowsParadas({paradasMarker: parada, select: state})
	}

    return (
        <div className='mapContainer'>
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_API}
        >
            <GoogleMap mapContainerStyle={mapStyle} zoom={zoom} center={center}>
                
			{(searchType === 'QUERY_DISPLAY_ALL') &&

				posicoes.map( ( busLinhas : BusLinhas ) => (
					busLinhas.vs.map( ( bus: BusGeo) => (
						<Marker
							onLoad={() => handleMetaData(false)}
							key={bus.p} 
							position={ { lat: bus.py, lng: bus.px } }
							
						/>
					))
				))
			};

			{(searchType === 'QUERY_POSICAO_VEICULO_LINHA') &&

				posicoes.map( ( bus : BusGeo ) => (
					<Marker
						onLoad={() => handleMetaData(false)}
						key={bus.p} 
						position={ { lat: bus.py, lng: bus.px } }
						onClick={() => handleSelectInfoWindowBus(bus, true) }
						icon={{
							url: '/bus-marker.svg',
							scaledSize: {height:30, width:30},
						}}
					/>
				
				))
			};

			{(searchType === 'QUERY_PARADAS_CODIGO_LINHA') &&
				posicoes.map( ( parada : ParadasTypes ) => (
					<Marker
						onLoad={() => handleMetaData(false)}
						key={parada.cp} 
						position={ { lat: parada.py, lng: parada.px } }
						onClick={() => handleSelectInfoWindowParada(parada, true) }
						icon={{
							url: '/bus-stop.svg',
							scaledSize: {height:30, width:30},
						}}
					/>
				
				))
			}

            <Polyline
                path={path}
                options={options}
            />

			{infoWindowsSelectBus.select ? (
				<InfoWindow 
				position={{lat: infoWindowsSelectBus.busMarker.py, lng:infoWindowsSelectBus.busMarker.px}}
				onCloseClick={() => handleSelectInfoWindowBus(infoWindowsSelectBus.busMarker, false)}
				>
					<div>
						<h1>acessível para pessoas com deficiência: {infoWindowsSelectBus.busMarker.a ? "SIM" : "NÃO"}</h1>
						<h1>{infoWindowsSelectBus.busMarker.p} </h1>
					</div>
				</InfoWindow>
			) : null}

			{infoWindowsSelectParadas.select ? (
				<InfoWindow 
				position={{lat: infoWindowsSelectParadas.paradasMarker.py, lng:infoWindowsSelectParadas.paradasMarker.px}}
				onCloseClick={() => handleSelectInfoWindowParada(infoWindowsSelectParadas.paradasMarker, false)}
				>
					<div>
						<h1>Nome: {infoWindowsSelectParadas.paradasMarker.cp}</h1>
						<h1>Endereço: {infoWindowsSelectParadas.paradasMarker.ed}</h1>
					</div>
				</InfoWindow>
			) : null}

            </GoogleMap>
        </LoadScript>
        

        </div>
    );
}


export default GMap;
