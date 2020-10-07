import { LinhasAction, LinhasState } from "./types";


const initialState: LinhasState = {
	linhas:[ {
		codigo: 0,
		circular: false,
		sentido: 0,
		terminalPrincipal: '',
		terminalSegundario: ''
	}]
}


export default function linhas( state = initialState, action: LinhasAction): LinhasState {
    switch (action.type) {
        case '@linhas/LINHAS':
            return {
                ...state,
				linhas: action.payload.linhas
            }
        default:
            return state;
    }
}