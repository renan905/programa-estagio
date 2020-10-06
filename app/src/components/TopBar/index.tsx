import React from 'react';
import { AppBar, Toolbar, Badge, ThemeProvider, Grid, Divider, Button } from '@material-ui/core';
import { Settings, DirectionsBus, Update, GolfCourse } from '@material-ui/icons' ;

import theme from './../theme/theme'
import { useSelector } from 'react-redux';
import { StoreState } from '../../store/createStore';

import './topbar.css';

const TopBar: React.FC = () => {

	// MAP CONFIG
	const { totalCars, updateTime } = useSelector((state: StoreState) => state.mapdata.metaInfo)
	
    return(
        <ThemeProvider theme={theme}>
            <AppBar className='appBarConfig' position="fixed" color='transparent'>
                <Toolbar variant="dense">
					<div className='spacer' ></div>
					<Badge className='iconStyle' color="secondary" aria-label="Número de Paradas no Mapa"  badgeContent={updateTime}>
						<GolfCourse color='secondary'/>
					</Badge>
					<Badge className='iconStyle' color="secondary"  aria-label="Hora da Ultima Atualização" badgeContent={updateTime}>
						<Update color='secondary'/>
					</Badge>
					<Badge className='iconStyle' color="secondary"  max={100000} badgeContent={totalCars}>
						<DirectionsBus aria-label="Número de Veiculos no Mapa" color='secondary'/>
					</Badge>
					<Button startIcon={<Settings />} variant='outlined' size="small">Configurações</Button>
					
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default TopBar;