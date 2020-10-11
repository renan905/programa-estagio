import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type MapDataAction = ActionType<typeof actions>;

export interface MapDataState {
	readonly metaInfo: MetaInfo;
}

export interface MetaInfo {
	readonly totalCars: number;
	readonly updateTime: string;
	readonly totalParadas: number;
	readonly agoraNoMapa: string;
}
