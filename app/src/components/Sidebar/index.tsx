import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, IconButton, Tabs, Tab, AppBar, Paper, InputBase, Divider, Switch, FormControlLabel } from '@material-ui/core';
import { Info, Search, ArrowRight, Cancel, ArrowRightAlt, Warning } from '@material-ui/icons';

import { searchInput, searchNoResult } from '../../store/modules/search/actions';
import { StoreState } from '../../store/createStore';

import { LinhasTypes, ParadasTypes } from './types';
import api from '../../services/api';

import "./style/sidebar.css";
import { mapCenterZoom } from '../../store/modules/mapconfig/actions';
import { BusGeo, BusLinhas } from '../GMap/types';
import { mapData } from '../../store/modules/mapdata/actions';




const Sidebar: React.FC = () => {

	const dispatch = useDispatch();

	const [paradasDetalhes, setParadasDetalhes] = useState(false);

	const [value, setValue] = useState(0);
	
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
		setParadasDetalhes(false);
		dispatch(searchNoResult({searchNoResults: false}))

	};

	const { searchValue, searchType, searchNoResults } = useSelector((state: StoreState) => state.search)
    // HANDLE THE SEARCH INPUT VALUE
    // const { searchValue } = useSelector((state: StoreState) => state.search)
    
    function handleSearchInput(searchString: string, type: string = '') {
        if (searchString !== '') {
			if (type === ''){
				if (value === 0){
					type = 'QUERY_BUSCAR_LINHA'
				} else if (value === 1) {
					type = 'QUERY_BUSCAR_PARADA'
				} else if (value === 2) {
					type = 'QUERY_DISPLAY_ALL'
				}
			}
            dispatch(searchInput({
				searchValue: searchString,
				searchType: type,
			}))
        }

	}
	
    // HANDLE SEARCH INPUT FIELD
    const [ searchInputValue, setSearchInputValue ] = useState("")
    const handleSearchInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== '') {
            setSearchInputValue(event.target.value)
        }
	}
	
	const [ posicoes, setPosicoes] = useState([]);
	const [ linhas, setLinhas] = useState([]);
	const [ paradas, setParadas] = useState([]);

	
	useEffect(() => {
		dispatch(searchNoResult({searchNoResults: false}))
		switch (searchType){

			case 'QUERY_BUSCAR_LINHA':
				api.get(`/BuscarLinha?busca=${searchValue}`).then( res => {
					if (res.data <= 0 ){
						dispatch(searchNoResult({searchNoResults: true}))
					} else {
						setLinhas(res.data)
					}
					
				})
				break
			case 'QUERY_BUSCAR_PARADA':
				api.get(`/Paradas?busca=${searchValue}`).then( res => {
					setParadas(res.data)
				})
				break
			case 'QUERY_PREVISAO_POR_PARADA':
				api.get(`/PrevisaoPorParada?CodigoParada=${searchValue}`).then( res => {
					setPosicoes(res.data.p.l);
					console.log(res.data.p)
				}).catch(err => {
					console.log(err)
				})
				break

			default:
				break
		}		
	}, [searchValue, searchType, dispatch]);

	const handleLoadCarByLinhas = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: LinhasTypes) => {
		handleSearchInput(data.cl.toString(), 'QUERY_POSICAO_POR_LINHA');
	}

	const handleLoadParadas = (data: ParadasTypes) => {
		if (value === 0) {
			handleSearchInput(data.cp.toString(), 'QUERY_PARADAS_CODIGO');
		} else {
			dispatch(mapCenterZoom({
				center: {
					lat: data.py,
					lng: data.px
				},
				zoom: 15
			}));
			console.log(data.cp.toString());
			
			handleSearchInput(data.cp.toString(), 'QUERY_PREVISAO_POR_PARADA');
			setParadasDetalhes(true);

		}
	}
	const [ overview, setOverview] = useState(false);
	const handleOverView = () => {
		
		if (overview){
			setOverview(false);
			handleSearchInput('Clean', 'CLEAN');
		} else {
			setOverview(true);
			handleSearchInput('Overview', 'QUERY_DISPLAY_ALL');
		}
	}

	const handleNewCenter = (data: BusGeo) => {
		dispatch(mapCenterZoom({
			center: {
				lat: data.py,
				lng: data.px
			},
			zoom: 16
		}));
	}

	
    return (
		<>
		
			{/* TABS */}
			<AppBar position="static" className='tabsBar'>
				<Tabs value={value} onChange={handleChange} variant="scrollable" aria-label="simple tabs example">
					<Tab label="Linhas" />
					<Tab label="Paradas" />
					<Tab label="Overview" />
				</Tabs>
			</AppBar>

			{/* SEARCH CONTAINER */}
            <div className='searchContainer' id='searchBox'  style={{display: (value === 2) ? 'none' : 'flex'}}>
				<Paper className='paper' component="form">
					<IconButton><Info/></IconButton>
					<InputBase onChange={handleSearchInputValue} id="outlined-basic" placeholder={(value === 0) ? 'Buscar Linha': 'Buscar Parada'}/>
					<IconButton onClick={() => handleSearchInput(searchInputValue)} aria-label="delete" color="primary"><Search/></IconButton>
				</Paper>
			</div>
			
			{/* LINES SEARCH LIST */}
			<div role="tabpanel" hidden={value !== 0} id={`${value}`} >
				<div className='noSearch' style={{display: ((linhas.length > 0) || searchNoResults) ? 'none' : 'flex'}}>
					<p>A categoria Linhas possibilita a consulta pelas linhas de ônibus da cidade de São Paulo.</p>
					<p>Você pode buscar pelo número da linha ou por algum termo relacionada a linha.</p>
					<div className='exemplo'>
						<p>Exemplos:</p>
						<p>São Matheus</p>
					</div>
				</div>

				<div className='nothingFound' style={{display: (searchNoResults) ? 'flex' : 'none'}} >
					<Warning/>
					<h1>Nenhuma linha foi encontrada</h1>
				</div>

				{linhas.map( (linhas : LinhasTypes) => (
					<div className='linhaContainer' key={linhas.cl}>
					<Paper className="linhaCard" onClick={(e) => handleLoadCarByLinhas(e, linhas)}>
						<div className='codigoLinha'>
							<p className='codLinha'>LINHA</p>
							<h3 className="nomeLinha" aria-label='Codigo da Linha'>{linhas.cl}</h3>
						</div>
						<div className='infoParadas'>
							<div className='detalhesParada'>
								<p className='direcaoParada' >ORIGEM</p>
								<h4 className="enderecoParada">{ (linhas.sl) ? linhas.tp : linhas.ts }</h4>
							</div>
							<IconButton className='viewLinhas'><ArrowRightAlt/></IconButton>
							<div className='detalhesParada'>
								<p className='direcaoParada' >DESTINO</p>
								<h4 className="enderecoParada">{ (linhas.sl) ? linhas.ts : linhas.tp}</h4>
							</div>
						</div>
						<IconButton className='viewLinhas'><ArrowRight/></IconButton>
					</Paper>
					</div>
				))}
    		</div>


			
			<div role="tabpanel" hidden={(value !== 1) || (paradasDetalhes)} id={`${value}`}>
				<div className='noSearch' style={{display: ((paradas.length > 0) || searchNoResults) ? 'none' : 'flex'}}>
					<p>A categoria Paradas possibilita a consulta pelos pontos de parada da cidade de São Paulo. Atualmente esta categoria contempla apenas as paradas de corredores.</p>
					<p>Você pode buscar pelo nome da parada e também no seu endereço de localização.</p>
					<div className='exemplo'>
						<p>Exemplos:</p>
						<p>Afonso</p>
						<p>Balthazar da Veiga</p>
					</div>
				</div>

				<div className='nothingFound' style={{display: (searchNoResults) ? 'flex' : 'none'}} >
					<Warning/>
					<h1>Nenhuma parada foi encontrada</h1>
				</div>

				{paradas.map( (parada : ParadasTypes) => (
					<div className='paradaContainer' key={parada.cp} >
						<Paper className="paradaCard" onClick={() => handleLoadParadas(parada)}>
							<h3 className="nomeParada">{parada.np}</h3>
							<Divider className='divider' orientation="vertical" />
							<h4 className="enderecoParada">{parada.ed}</h4>
							<IconButton className='viewLinhas'><ArrowRight/></IconButton>
						</Paper>
						
					</div>
				))}
    		</div>
			
			{/* PARADAS INFO */}
			{(paradasDetalhes) &&
			<div className='flip-horizontal-bottom previsõesParada'> 
				<IconButton className='closePrevisoes'  onClick={() => setParadasDetalhes(false)}><Cancel/></IconButton>
				{(posicoes.length > 0) &&
					posicoes.map( ( dataLinhas : BusLinhas ) => (

						<Paper key={dataLinhas.c} className='previsaoCard'> 
							<div className='infoLinha'>
								<p className='label'>Letreiro<br/><strong className='infoStrong'>{dataLinhas.c}</strong></p>
								<Divider className='divider' orientation="vertical" />
								<p className='label'>Linha<br/><strong className='infoStrong'>{dataLinhas.cl}</strong></p>
								<Divider className='divider' orientation="vertical" />
								<p className='label'>Veiculos<br/><strong className='infoVeiculos'>{dataLinhas.qv}</strong></p>
							</div>
							<div className='direcaoPrevisao'>
								<p className='enderecoPrevisao'>origen: <strong className='local'>{(dataLinhas.sl) ? dataLinhas.lt1 : dataLinhas.lt0}</strong></p>
								<IconButton className='viewLinhas'><ArrowRightAlt/></IconButton>
								<p className='enderecoPrevisao'>destino: <strong className='local'>{(dataLinhas.sl) ? dataLinhas.lt0 : dataLinhas.lt1}</strong></p>
							</div>
								
							<div className='preivsaoLinha'>
								{dataLinhas.vs.map( ( bus: BusGeo) => (
									<div key={bus.p} className='previsoes' onClick={() => handleNewCenter(bus)}>
										<div className='onibus'>
											<p className='onibusNome'>ônibus</p>
											<h3 className="codOnibus">{bus.p}</h3>
										</div>
										<Divider className='divider' orientation="vertical" />
										<div className='chegada'>
											<p className='labelPrevisao'>Previsão de chegada</p>
											<h3 className='horaPrevisao'>{bus.t}</h3>
										</div>
										<IconButton className='viewLinhas'><ArrowRight/></IconButton>
									</div>
								))}
							</div>
						</Paper>

						
					))
				}

			</div>
			}

			<div role="tabpanel" hidden={value !== 2} id={`${value}`}>
				<div>
					<Paper className='overview'>
						<p className='infoOverview'>O modo Overview permite visualizar todos os ônibus de São Paulo</p>
						<small className='infoAviso'>Devido ao grande numero de veiculos, o modo Overview pode causar travamentos e redução de desenpenho</small>
						<FormControlLabel onChange={handleOverView} control={<Switch/>} label={(overview) ? 'Desativar Overview' : 'Ativar Overview'} />
					</Paper>
				</div>
				
			</div>
		</>
    );
}

export default Sidebar;