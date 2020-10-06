export interface GeoInfo {
    lat: number,
	lng: number,
}

export interface BusGeo {
    "p": number,
    "a": boolean,
    "ta": string,
    "py": number,
    "px": number,
}

export interface BusLinhas {
    "c": string,
    "cl": number,
    "sl": number,
    "lt0": string,
    "lt1": string,
    "qv": number,
    "vs": [BusGeo],
}

export interface Bus {
    "hr": string,
    "l": [BusLinhas],
}

export interface PathPolyline {
	paths: GeoInfo[]
}

export interface PathOptions {
	strokeColor: string,
	strokeOpacity: number,
	strokeWeight: number,
	fillColor: string,
	fillOpacity: number,
	clickable: boolean,
	draggable: boolean,
	editable: boolean,
	visible: boolean,
	radius: number,
	paths: PathPolyline[],
	zIndex: number
}

export interface GMapData {
	center: GeoInfo,
	zoom: number,
	mapStyle: {
		width: string,
		height: string,
	}
}