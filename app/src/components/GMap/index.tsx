import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleMap, InfoWindow, LoadScript, Marker, Polyline } from "@react-google-maps/api";

import api from '../../services/api';
import { mapData } from '../../store/modules/mapdata/actions';
import mapconfig from '../../store/modules/mapconfig/reducer';
import { mapCenterZoom } from '../../store/modules/mapconfig/actions';
import { StoreState } from '../../store/createStore';

import { BusLinhas, BusGeo, PathOptions, GMapData } from './types'
import { ParadasTypes } from '../Sidebar/types';

import "./map.css";


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
	function handleMetaData(reset: boolean, time: string = '', cars: boolean = false, paradas: boolean = false) {
		// case true, set number of cats, else, set time
		if (cars){
			setMetaData(prevTotal => {
				return {
					...prevTotal,
					totalCarsLoaded: prevTotal.totalCarsLoaded + 1
				}
			});
		}
		else if (time !== '') {
			setMetaData(prevTotal => {
				return {
					...prevTotal,
					timeLoaded: time
				}
			});
		}
		else if (paradas){
			setMetaData(prevTotal => {
				return {
					...prevTotal,
					totalParadas: prevTotal.totalParadas + 1
				}
			});
		}
		else if (reset) {
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
		
		switch (searchType){
			
			// SHOW ALL CARS
			case 'QUERY_DISPLAY_ALL':
				api.get("/Posicao").then( res => {
					setPosicoes(res.data.l);
					handleMetaData(true, res.data.hr);
				})
				break
			// SHOW CARS BY LINE
			case 'QUERY_POSICAO_POR_LINHA':
				api.get(`/PosicaoPorLinha?CodigoLinha=${searchValue}`).then( res => {
					setPosicoes(res.data.vs);
					handleMetaData(true, res.data.hr);
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

				api.get(`/ParadasPorLinha?CodigoLinha=${searchValue}`).then( res => {
					console.log("Paradas QUERY_PARADAS_CODIGO_LINHA", res.data);
					setParadas(res.data);
					// handleMetaData(false, ';')
				}).catch(err => {
					console.log(err)
				})
				break
			// SHOW CARS BY FORECAST ARRIVAL TIME
			case 'QUERY_PREVISAO_POR_PARADA':
				api.get(`/PrevisaoPorParada?CodigoParada=${searchValue}`).then( res => {
					setPosicoes(res.data.p.l);
					handleMetaData(false, res.data.hr);
				}).catch(err => {
					console.log(err)
				})
				break

			default:
				break
		}		
	}, [searchValue, searchType, update, dispatch]);


	// ! PARADAS
	const [ paradas, setParadas] = useState([]);
	useEffect(() => {
		
		switch (searchType){
			case 'QUERY_BUSCAR_PARADA':
				api.get(`/Paradas?busca=${searchValue}`).then( res => {
					setParadas(res.data)
					handleMetaData(true)
					// TODO: ADD WARNING INFO WHEN STOPS COUND'T BE FOUND
					if (paradas.length > 0){
						dispatch(mapCenterZoom({
							center: {
								lat: res.data[0].py,
								lng: res.data[0].px
							},
							zoom: 15
						}))
					}
				})
				break
			default:
				break

		}		
	}, [searchValue, searchType, update, dispatch]);
	

	useEffect( () => {
		// updateMetaData()

		dispatch(mapData({
			metaInfo: {
				totalCars: metaData.totalCarsLoaded,
				updateTime: metaData.timeLoaded,
				totalParadas: metaData.totalParadas
			}
		}))
	}, [metaData, dispatch])

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
			<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API} >
				
				<GoogleMap mapContainerStyle={mapStyle} zoom={zoom} center={center}>
					
				{(searchType === 'QUERY_DISPLAY_ALL') &&
					posicoes.map( ( busLinhas : BusLinhas ) => (
						busLinhas.vs.map( ( bus: BusGeo) => (
							<Marker
								onLoad={() => handleMetaData(false, '', true , false)}
								key={bus.p} 
								position={ { lat: bus.py, lng: bus.px } }
								
							/>
						))
					))
				};

				{(searchType === 'QUERY_POSICAO_POR_LINHA') &&
					posicoes.map( ( bus : BusGeo ) => (
						<Marker
							onLoad={() => handleMetaData(false, '', true , false)}
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

				{((posicoes.length > 0) && (searchType === 'QUERY_PREVISAO_POR_PARADA')) &&
					posicoes.map( ( busLinhas : BusLinhas ) => (
						busLinhas.vs.map( ( bus: BusGeo) => (
							<Marker
								onLoad={() => handleMetaData(false, '', true , false)}
								key={bus.p} 
								position={ { lat: bus.py, lng: bus.px } }
								
							/>
						))
					))
				}

				{((paradas.length > 0) && (searchType === 'QUERY_POSICAO_POR_LINHA'))  &&
					paradas.map( ( parada : ParadasTypes ) => (
						<Marker
							onLoad={() => handleMetaData(false, '', false, true)}
							key={parada.cp} 
							position={ { lat: parada.py, lng: parada.px } }
							onClick={() => handleSelectInfoWindowParada(parada, true) }
							icon={{
								url: '/bus-stop.svg',
								scaledSize: {height:30, width:30},
							}}
						/>
						
				))};

				{((searchType === 'QUERY_BUSCAR_PARADA') || (searchType === 'QUERY_PREVISAO_POR_PARADA')) &&
					paradas.map( ( parada : ParadasTypes ) => (
						<Marker
							onLoad={() => handleMetaData(false, '', false, true)}
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

				{/* <Polyline
					path={path}
					options={options}
				/> */}

				{/* INFO WINDOWS CARS */}
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

				{/* INFO WINDOWS STOPS */}
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
