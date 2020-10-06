import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Sidebar from './components/Sidebar';
import GMap from './components/GMap'
import TopBar from './components/TopBar'

import "./app.css";

function App() {


	return (
		<>
		<div className='container'>
				<TopBar/>
			

			<section className='containerMain' >

				<div className="sidebar">
					<Sidebar />
				</div>

				<div className="gmap">
					<GMap />
				</div>
			</section>
		</div>

		</>
	);
}

export default App;