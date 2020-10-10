import React from 'react';

import { Badge, FormControlLabel, Switch } from '@material-ui/core';
import { DirectionsBus, Update, GolfCourse } from '@material-ui/icons' ;

import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store/createStore';

import './topbar.css';
import { searchAutoUpdate } from '../../store/modules/search/actions';

const TopBar: React.FC = () => {

	// MAP CONFIG
	const { totalCars, updateTime, totalParadas, agoraNoMapa } = useSelector((state: StoreState) => state.mapdata.metaInfo)
	const { searchType, searchUpdate } = useSelector((state: StoreState) => state.search)

	const dispatch = useDispatch();
	const handleSearchUpdadeState = () => {
		dispatch(searchAutoUpdate({
			searchUpdate: (searchUpdate) ? false : true
		}))
	}

	
    return(
		<>

			<div className='infoAreas'>
				<div className='agoraNoMapa'>
					<h3 className='label'>Agora no mapa: <strong className='local'>{(agoraNoMapa === '') ? 'São Paulo' : agoraNoMapa}</strong></h3>
				</div>
				<Badge className='iconStyle' color="secondary" max={100000} aria-label="Número de Paradas no Mapa"  badgeContent={ (searchType === 'QUERY_PREVISAO_POR_PARADA') ? 1 : totalParadas}>
					<GolfCourse color='secondary'/>
				</Badge>
				<Badge className='iconStyle' color="secondary"  max={100000} badgeContent={totalCars}>
					<DirectionsBus aria-label="Número de Veiculos no Mapa" color='secondary'/>
				</Badge>
				<Badge className='iconStyle' color="secondary"  aria-label="Hora da Ultima Atualização" badgeContent={(updateTime === '') ? 0 : updateTime}>
					<Update color='secondary'/>
				</Badge>
				<FormControlLabel className='iconStyle' onChange={handleSearchUpdadeState} control={<Switch/>} label={(searchUpdate) ? 'Desativar AutoUpdate' : 'Ativar AutoUpdate'} />


			</div>
		</>
    );
}

export default TopBar;