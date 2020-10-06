import React from 'react';
import { AppBar, Toolbar, IconButton, ThemeProvider ,Typography, Button } from '@material-ui/core';
import theme from './../theme/theme'

const TopBar: React.FC = () => {

    return(
        <ThemeProvider theme={theme}>
            <AppBar position="sticky" color='primary'>
                <Toolbar variant="dense">
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    );
}

export default TopBar;