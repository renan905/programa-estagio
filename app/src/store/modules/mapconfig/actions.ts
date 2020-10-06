import { action } from 'typesafe-actions';
import { MapConfigState } from './types';

export function mapSettings( { zoom, center, mapStyle } : MapConfigState ) {
	// RETURN = 'ACTION', PAYLOAD{}
	return action('@mapconfig/MAP_SETTINGS', {
		zoom,
		center,
		mapStyle
    })
}