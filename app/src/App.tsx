import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

// import MapBox from './components/MapBox';
import Sidebar from './components/Sidebar';
import GM from './components/GMap'
import TopBar from './components/TopBar'
// import MyMap from './components/MapBox/dire'

import "./app.css";



function App() {


	return (
		<>
		<TopBar />
		<div className="container">
			<Sidebar />
			<GM />
		</div>
		</>
	);
}

export default App;