import React, { useState, useEffect }  from 'react';

import { Grid, CircularProgress } from '@material-ui/core';

import Sidebar from '../components/Sidebar';
import GMap from '../components/GMap'
import TopBar from '../components/TopBar'

import "./app.css";

function App() {

	return (
		<>

		<Grid container>
			<Grid item xs={12}>
				<div className='topbar'>
					<TopBar/>
				</div>
			</Grid>
			<Grid item xs={3} >
				<div className='sidebar'> 
					<Sidebar />
				</div>
			</Grid>
			<Grid item xs={9}>
				<div className='gmap'> 
					<GMap/>
				</div>
			</Grid>
		</Grid>
		</>
	);
}

export default App;