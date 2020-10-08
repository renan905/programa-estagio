import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TextField, IconButton, Tabs, Tab, AppBar } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import { searchInput } from '../../store/modules/search/actions';
import { StoreState } from '../../store/createStore';

import { LinhasTypes, ParadasTypes } from './types';
import api from '../../services/api';

import "./sidebar.css";
import { mapCenterZoom } from '../../store/modules/mapconfig/actions';
import { BusGeo, BusLinhas } from '../GMap/types';

const Sidebar: React.FC = () => {

	const [paradasDetalhes, setParadasDetalhes] = React.useState(false);

	const [value, setValue] = React.useState(0);
	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

    // HANDLE THE SEARCH INPUT VALUE
    // const { searchValue } = useSelector((state: StoreState) => state.search)
    const dispatch = useDispatch();
    function handleSearchInput(searchString: string, type: string = '') {
        if (searchString !== '') {
			
			if (type === ''){
				if (value === 0){
					type = 'QUERY_BUSCAR_LINHA'
				} else if (value === 1) {
					type = 'QUERY_BUSCAR_PARADA'
				}
			}
            dispatch(searchInput({
				searchValue: searchString,
				searchType: type
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

	const { searchValue, searchType } = useSelector((state: StoreState) => state.search)
	useEffect(() => {
		switch (searchType){
			case 'QUERY_BUSCAR_LINHA':
				api.get(`/BuscarLinha?busca=${searchValue}`).then( res => {
					setLinhas(res.data)
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
					console.log(res.data.p.l)
				}).catch(err => {
					console.log(err)
				})
				break

			default:
				break
		}		
	}, [searchValue, searchType]);

	const handleLoadCarByLinhas = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: LinhasTypes) => {
		handleSearchInput(data.cl.toString(), 'QUERY_POSICAO_POR_LINHA')
	}

	const handleLoadParadas = (data: ParadasTypes) => {
		if (value == 0) {
			handleSearchInput(data.cp.toString(), 'QUERY_PARADAS_CODIGO')
		} else {
			dispatch(mapCenterZoom({
				center: {
					lat: data.py,
					lng: data.px
				},
				zoom: 15
			}))
			console.log(data.cp.toString())
			
			handleSearchInput(data.cp.toString(), 'QUERY_PREVISAO_POR_PARADA')
			setParadasDetalhes(true)
		}
	}
	
    return (
		<>
			<AppBar position="static" className='tabsBar'>
				<Tabs value={value} onChange={handleChange} variant="scrollable" aria-label="simple tabs example">
					<Tab label="Linhas" />
					<Tab label="Paradas" />
					<Tab label="Item Three" />
				</Tabs>
			</AppBar>

            <div className='searchContainer'> 
                <TextField onChange={handleSearchInputValue} id="outlined-basic" size='small' variant="outlined" label="Buscar Linha" />
                <IconButton onClick={() => handleSearchInput(searchInputValue)} aria-label="delete" color="primary"><Search /></IconButton>
            </div>

			

			{(paradasDetalhes) &&
				<div className='flip-horizontal-bottom teste'>
					<button onClick={() =>  setParadasDetalhes(false)}>fechar</button>
					{(posicoes.length > 0) &&
						posicoes.map( ( dataLinhas : BusLinhas ) => (

							<div key={dataLinhas.c}> 
								<span>Letreiro da Linha {dataLinhas.c} - cod {dataLinhas.cl}</span>
								<span>origen {(dataLinhas.sl) ? dataLinhas.lt1 : dataLinhas.lt0} - destino {(dataLinhas.sl) ? dataLinhas.lt0 : dataLinhas.lt1}</span>
								<span>Numero de veiculos - {dataLinhas.qv} </span>
							</div>

							&& dataLinhas.vs.map( ( bus: BusGeo) => (
									<div key={bus.p}>
										<span> Onibus - {bus.p}</span>
										<span>Previsão de chegada - {bus.t}</span>
									</div>
							))
							
						))
					}

				</div>
			}
			
		
			<div role="tabpanel" hidden={value !== 0} id={'0'} aria-labelledby={'0'}>
				{linhas.map( (linhas : LinhasTypes) => (
					
					<div className="linhaCard" key={linhas.cl} onClick={(e) => handleLoadCarByLinhas(e, linhas)}>
						<h3 className="nomeLinha">{linhas.cl}</h3>
						<h4 className="enderecoParada">ORIGEM : { (linhas.sl) ? linhas.tp : linhas.ts }</h4>
						<h4 className="enderecoParada">DESTINO : { (linhas.sl) ? linhas.ts : linhas.tp}</h4>
					</div>
				) )}
    		</div>

			<div role="tabpanel" hidden={value !== 1} id={'1'} aria-labelledby={'1'}>
				{paradas.map( (parada : ParadasTypes) => (
					
					<div className="linhaCard" key={parada.cp} onClick={() => handleLoadParadas(parada)}>
						<h3 className="nomeLinha">{parada.np}</h3>
						<h4 className="enderecoParada">{parada.ed}</h4>
					</div>
				) )}
    		</div>
		</>
    );
}

export default Sidebar;