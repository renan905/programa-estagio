import React from 'react';

import { Badge, Paper } from '@material-ui/core';
import { DirectionsBus, Update, GolfCourse } from '@material-ui/icons' ;

import { useSelector } from 'react-redux';
import { StoreState } from '../../store/createStore';

import './bottombar.css';

const BottomBar: React.FC = () => {

	// MAP CONFIG
	const { totalCars, updateTime, totalParadas } = useSelector((state: StoreState) => state.mapdata.metaInfo)
	const { searchType } = useSelector((state: StoreState) => state.search)

	
    return (
		<>
			<Paper className='bar'>
				<Badge className='iconStyle' color="secondary" max={100000} aria-label="Número de Paradas no Mapa"  badgeContent={ (searchType === 'QUERY_PREVISAO_POR_PARADA') ? 1 : totalParadas}>
					<GolfCourse color='secondary'/>
				</Badge>
				<Badge className='iconStyle' color="secondary"  max={100000} badgeContent={totalCars}>
					<DirectionsBus aria-label="Número de Veiculos no Mapa" color='secondary'/>
				</Badge>
				<Badge className='iconStyle' color="secondary"  aria-label="Hora da Ultima Atualização" badgeContent={(updateTime === '') ? 0 : updateTime}>
					<Update color='secondary'/>
				</Badge>
			</Paper>
		</>
    );
}

export default BottomBar;