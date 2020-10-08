import React from 'react';

import { Badge, Button } from '@material-ui/core';
import { Settings, DirectionsBus, Update, GolfCourse } from '@material-ui/icons' ;

import { useSelector } from 'react-redux';
import { StoreState } from '../../store/createStore';

import './topbar.css';

const TopBar: React.FC = () => {

	// MAP CONFIG
	const { totalCars, updateTime, totalParadas } = useSelector((state: StoreState) => state.mapdata.metaInfo)
	
    return(
		<>
			<Badge className='iconStyle' color="secondary" max={100000} aria-label="Número de Paradas no Mapa"  badgeContent={totalParadas}>
				<GolfCourse color='secondary'/>
			</Badge>
			<Badge className='iconStyle' color="secondary"  aria-label="Hora da Ultima Atualização" badgeContent={updateTime}>
				<Update color='secondary'/>
			</Badge>
			<Badge className='iconStyle' color="secondary"  max={100000} badgeContent={totalCars}>
				<DirectionsBus aria-label="Número de Veiculos no Mapa" color='secondary'/>
			</Badge>
			<Button startIcon={<Settings />} disabled variant='outlined' size="small">Configurações</Button>
		</>
    );
}

export default TopBar;