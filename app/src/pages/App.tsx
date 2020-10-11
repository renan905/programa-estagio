import React from "react";

import { Grid } from "@material-ui/core";

import Sidebar from "../components/Sidebar";
import GMap from "../components/GMap";
import TopBar from "../components/TopBar";
import BottomBar from "../components/BottomBar";

import "./app.css";

function App() {
	return (
		<>
			<Grid container>
				<Grid item lg={12} md={12} sm={12} xs={12}>
					<div className="topbar">
						<TopBar />
					</div>
				</Grid>
				<Grid item lg={3} md={4} sm={5} xs={12}>
					<div className="sidebar">
						<Sidebar />
					</div>
				</Grid>
				<Grid item lg={9} md={8} sm={7} xs={12}>
					<div className="gmap">
						<GMap />
					</div>
				</Grid>
				<Grid item xs={12}>
					<div className="bottombar">
						<BottomBar />
					</div>
				</Grid>
			</Grid>
		</>
	);
}

export default App;
