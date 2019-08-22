import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { StyledButton } from '../themes/theme';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {},
	logo: {
		marginTop: theme.spacing(1),
		height: '52px',
		width: '120px'
	},
	button: {
		margin: theme.spacing(1),
		fontWeight: 'bold',
		textTransform: 'none'
	},
	styledbutton: {
		margin: theme.spacing(1),
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3)
	},
	link: {
		textDecoration: 'none'
	},
	notice: {
		display: 'inline-block',
		fontWeight: 'bold',
		marginRight: theme.spacing(1)
	},
	appbar: {
		boxShadow: 'none',
		borderBottom: '2px solid #154275'
	},
	toolbar: {
		padding: '5px',
		right: '0',
		left: '0',
		marginRight: 'auto',
		marginLeft: 'auto',
		width: '95%'
	}
}));

function NavBarWelcome(props) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar color="primary" position="static" className={classes.appbar}>
				<Toolbar variant="regular" className={classes.toolbar}>
					<div style={{ flex: '1' }}>
						<img src={logo} className={classes.logo} alt="logo" />
					</div>

					<Link to="/login" className={classes.link}>
						<StyledButton className={classes.styledbutton} variant="contained" color="secondary">
							Sign in
						</StyledButton>
					</Link>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default NavBarWelcome;
