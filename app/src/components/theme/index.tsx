import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#FAFAFA',
        },
        secondary: {
            main: '#1de9b6',
		}
	},
	
	breakpoints: {
		values: {
		  xs: 0,
		  sm: 760,
		  md: 860,
		  lg: 1280,
		  xl: 1920,
		},
	},
});

export default theme;