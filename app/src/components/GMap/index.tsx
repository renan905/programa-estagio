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



	// * NUMBER OF CARS, STOPS, LOCATION AND TIME HANDLER
	const [ metaData, setMetaData ] = useState(() => {
		return {totalCarsLoaded: 0, timeLoaded: '', totalParadas: 0, agoraNoMapa: ''}
	});
	function handleMetaData(reset: boolean = false, time: string = '', cars: boolean = false, paradas: boolean = false) {
		
		if (cars){
			
			setMetaData(prevTotal => {
				console.log(prevTotal.totalCarsLoaded)
				return {
					...prevTotal,
					totalCarsLoaded: prevTotal.totalCarsLoaded + 1
				}
			});
		}
		if (time !== '') {
			setMetaData(prevTotal => {
				return {
					...prevTotal,
					timeLoaded: time
				}
			});
		}
		if (paradas){
			setMetaData(prevTotal => {
				return {
					...prevTotal,
					totalParadas: prevTotal.totalParadas + 1
				}
			});
		}
		if (reset) {
			console.log('RESET')
			setMetaData(prevTotal => {
				return {
					...prevTotal,
					totalCarsLoaded: 0,
					totalParadas: 0
				}
			});
		}
	}
	// handleMetaData extension 
	function handleAgoraNoMapa(local: string) {
		setMetaData(prevTotal => {
			return {
				...prevTotal,
				agoraNoMapa: local
			}
		});
	}



	const { searchValue, searchType } = useSelector((state: StoreState) => state.search)
    const [ posicoes, setPosicoes] = useState([]);
	useEffect(() => {
		
		switch (searchType){
			
			// SHOW ALL BUSES
			case 'QUERY_DISPLAY_ALL':
				api.get("/Posicao").then( res => {
					handleMetaData(true, res.data.hr);
					setPosicoes(res.data.l);
					handleAgoraNoMapa("Todos os ônibus de São Paulo;")
				})
				break

			// SHOW BUSES BY LINE
			case 'QUERY_POSICAO_POR_LINHA':
				api.get(`/PosicaoPorLinha?CodigoLinha=${searchValue}`).then( res => {
					handleMetaData(true, res.data.hr);
					setPosicoes(res.data.vs);
					handleAgoraNoMapa(`Todos os ônibus da linha ${searchValue}`)
					dispatch(mapCenterZoom({
						center: {
							lat: res.data.vs[0].py,
							lng: res.data.vs[0].px
						},
						zoom: 14
					}))

				}).catch(err => {
					console.log(err)
				})

				api.get(`/ParadasPorLinha?CodigoLinha=${searchValue}`).then( res => {
					setParadas(res.data);
				}).catch(err => {
					console.log(err)
				})
				break

			// SHOW BUSES BY FORECAST ARRIVAL TIME
			case 'QUERY_PREVISAO_POR_PARADA':
				api.get(`/PrevisaoPorParada?CodigoParada=${searchValue}`).then( res => {
					handleMetaData(false, res.data.hr);
					setPosicoes(res.data.p.l);
					handleAgoraNoMapa(`Todos os ônibus em direção a ${searchValue}`)
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
					handleMetaData(true)
					setParadas(res.data)
					handleAgoraNoMapa(`Todas as paradas, ${searchValue}`)
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
		dispatch(mapData({
			metaInfo: {
				totalCars: metaData.totalCarsLoaded,
				updateTime: metaData.timeLoaded,
				totalParadas: metaData.totalParadas,
				agoraNoMapa: metaData.agoraNoMapa
			}
		}))
	}, [metaData, dispatch])

	const [ infoWindowsSelectBus, setInfoWindowsBus] = useState(() =>{
		let busMarker: BusGeo = { ta: '', a: false, p: 0, px: 0, py: 0 };
		let select = false;
		return {busMarker, select}
	});

	const [ infoWindowsSelectParadas, setInfoWindowsParadas] = useState(() =>{
		let paradasMarker: ParadasTypes = { cp: 0, np: '', ed: '', px: 0, py: 0 };
		let select = false;
		return {paradasMarker, select}
	});

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
					))
				};

				{((searchType === 'QUERY_BUSCAR_PARADA') || (searchType === 'QUERY_PREVISAO_POR_PARADA')) &&
					paradas.map( ( parada : ParadasTypes ) => (	
						<Marker
							visible={(searchType === 'QUERY_BUSCAR_PARADA') ? true : ((parada.cp.toString() === searchValue) ? true : false)}
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
