import { MapDataAction, MapDataState } from "./types";


const initialState: MapDataState = {
	metaInfo: {
		totalCars: 0,
		totalParadas: 0,
		updateTime: "",
		agoraNoMapa: '',
	}
	
}

export default function mapdata( state = initialState, action: MapDataAction): MapDataState {
    switch (action.type) {
        case '@mapdata/MAP_DATA':
            return {
                ...state,
				metaInfo: {
					totalCars: action.payload.metaInfo.totalCars,
					updateTime: action.payload.metaInfo.updateTime,
					totalParadas: action.payload.metaInfo.totalParadas,
					agoraNoMapa: action.payload.metaInfo.agoraNoMapa
				}
			}
        default:
            return state;
    }
}