
import { TextField, IconButton, Toolbar, Divider, List, ListItem, ListItemIcon, ListItemText, Icon, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchInput } from '../../store/modules/search/actions';
import "./sidebar.css";


const Sidebar: React.FC = () => {

    // HANDLE THE SEARCH INPUT VALUE
    // const { searchValue } = useSelector((state: StoreState) => state.search)
    const dispatch = useDispatch();
    function handleSearchInput(value: string) {
        if (value !== '') {
            dispatch(searchInput({searchValue: value}))
        }
    }

    // HANDLE SEARCH INPUT FIELD
    const [ searchInputValue, setSearchInputValue ] = useState("")
    const handleSearchInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== '') {
            setSearchInputValue(event.target.value)
        }
    }


    return(

		<div>
            <div className='searchContainer'> 
                <TextField onChange={handleSearchInputValue} id="outlined-basic" size='small' variant="outlined" label="Buscar Linha" />
                <IconButton onClick={() => handleSearchInput(searchInputValue)} aria-label="delete" color="primary"><Search /></IconButton>
            </div>
			
            {/* <button type="button"> buscar </button> */}

            {/* <div className="paradaCard">
                <h3 className="nomeParada">BRASIL B/C</h3>
                <h4 className="enderecoParada">PC PORTUGAL/ R CONEGO EUGENIO LEITE</h4>
            </div> */}

            <div className="linhaCard">
                <h3 className="nomeLinha">BRASIL B/C</h3>
            </div>


			</div>
    );
}

export default Sidebar;