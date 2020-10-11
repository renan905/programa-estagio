import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type MapConfigAction = ActionType<typeof actions>;

export interface MapConfigState {
	readonly center: GeoInfo;
	readonly zoom: number;
	readonly mapStyle?: {
		readonly width: string;
		readonly height: string;
	};
}

export interface GeoInfo {
	readonly lat: number;
	readonly lng: number;
}
