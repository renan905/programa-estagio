import { action } from "typesafe-actions";
import { MapDataState } from "./types";

export function mapData({ metaInfo }: MapDataState) {
	// RETURN = 'ACTION', PAYLOAD{}
	return action("@mapdata/MAP_DATA", {
		metaInfo,
	});
}
