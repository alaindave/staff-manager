import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import NavBarAdmin from '../components/NavBarAdmin';
import { Grid, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { StyledButton } from '../themes/theme';

const staffPageStyle = (theme) => ({
	content: {
		width: '100%'
	},

	grid: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '70%'
	},
	item: {
		marginTop: theme.spacing(5),
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},

	image1: {
		width: '100 %',
		height: '80px'
	},
	button1: {
		marginTop: theme.spacing(30),
		marginBottom: theme.spacing(1),
		marginLeft: theme.spacing(3),
		fontSize: '35px',
		padding: '60px',
		backgroundColor: '#3a7ea1'
	},

	button2: {
		marginTop: theme.spacing(30),
		marginBottom: theme.spacing(1),
		marginLeft: theme.spacing(20),
		fontSize: '35px',
		padding: '60px',
		backgroundColor: '#3a7ea1'
	}
});

class Staff extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		console.log('id from history', this.props.location);
	}

	render() {
		const { classes } = this.props;

		return (
			<Container className={classes.content} maxWidth="lg">
				<NavBarAdmin />
				<Grid container direction="row" alignItems="center">
					<Link
						to={{
							pathname: '/staffList'
						}}
						style={{ textDecoration: 'none' }}
					>
						<StyledButton variant="contained" className={classes.button1}>
							List of employees
						</StyledButton>
					</Link>

					<Link
						to={{
							pathname: '/addEmployee'
						}}
						style={{ textDecoration: 'none' }}
					>
						<StyledButton variant="contained" color="secondary" className={classes.button2}>
							Add a new employee
						</StyledButton>
					</Link>
				</Grid>
			</Container>
		);
	}
}

export default withStyles(staffPageStyle)(Staff);
