import { ActionType } from 'typesafe-actions';
import * as actions from './actions';

export type LinhasAction = ActionType<typeof actions>;

export interface LinhasState {
	linhas: linha[];
}	

export interface linha {
	codigo: number,
	circular: boolean,
	sentido: number,
	terminalPrincipal: string,
	terminalSegundario: string
}