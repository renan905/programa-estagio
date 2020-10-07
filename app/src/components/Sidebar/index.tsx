
import { TextField, IconButton, Tabs, Tab, Box, AppBar, Typography, ListItemText, Icon, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchInput } from '../../store/modules/search/actions';

import { LinhasTypes, ParadasTypes } from './types';

import "./sidebar.css";
import api from '../../services/api';
import { StoreState } from '../../store/createStore';


const Sidebar: React.FC = () => {

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
					type = 'QUERY_PARADAS_CODIGO_LINHA'
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

	const [ linhas, setLinhas] = useState([]);
	const [ paradas, setParadas] = useState([]);

	const { searchValue, searchType } = useSelector((state: StoreState) => state.search)
	useEffect(() => {
		console.log(searchValue)
		switch (searchType){
			case 'QUERY_BUSCAR_LINHA':
				api.get(`/BuscarLinha?busca=${searchValue}`).then( res => {
					setLinhas(res.data)
					console.log("linhas carregadas")
				})

			case 'QUERY_BUSCAR_PARADA':
				api.get(`/BuscarLinha?busca=${searchValue}`).then( res => {
					setParadas(res.data)
					console.log("Paradas carregadas")
				})
			default:
				break
		}		
	}, [searchValue]);

	const handleLoadCarByLinhas = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>, data: LinhasTypes) => {
		handleSearchInput(data.cl.toString(), 'QUERY_POSICAO_VEICULO_LINHA')
	}

	const handleLoadParadas = (data: ParadasTypes) => {
		handleSearchInput(data.cp.toString(), 'QUERY_PARADAS_CODIGO')
	}
	

    return(

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