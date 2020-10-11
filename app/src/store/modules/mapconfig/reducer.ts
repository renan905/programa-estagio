import { MapConfigAction, MapConfigState } from "./types";

const initialState: MapConfigState = {
	center: {
		lat: -23.55052,
		lng: -46.633308,
	},
	zoom: 14,
	mapStyle: {
		width: "100%",
		height: "100%",
	},
};

export default function mapconfig(
	state = initialState,
	action: MapConfigAction
): MapConfigState {
	switch (action.type) {
		case "@mapconfig/MAP_SETTINGS":
			return {
				...state,
				zoom: action.payload.zoom,
				center: action.payload.center,
			};
		case "@mapconfig/MAP_CENTER_ZOOM":
			return {
				...state,
				zoom: action.payload.zoom,
				center: action.payload.center,
			};

		default:
			return state;
	}
}
