import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';


import Sidebar from './components/Sidebar';
import GMap from './components/GMap'
import TopBar from './components/TopBar'

import "./app.css";

function App() {


	return (
		<>
		<Grid container>
			<Grid item xs={12}>
				<div className='a'>
					<TopBar/>
				</div>
			</Grid>
			<Grid item spacing={0} xs={3}>
				<div className='b'> 
					<Sidebar />
				</div>
			</Grid>
			<Grid item xs={9}>
				<div className='c'> 
					<GMap/>
				</div>
			</Grid>
		</Grid>

		</>
	);
}

export default App;