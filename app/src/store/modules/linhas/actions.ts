import { action } from 'typesafe-actions';
import { LinhasState } from './types';

export function linhas( { linhas } : LinhasState ){
	return action('@linhas/LINHAS', {
		linhas
	})
}
