import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { StyledButton } from '../themes/theme';
import NavBarWelcome from '../components/NavBar';

import axios from 'axios';

const registerPageStyle = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	title: {
		color: '#3a7ea1',
		fontWeight: 'light',
		fontSize: '30px',
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(5)
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	button: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(1)
	},
	error: {
		color: 'red'
	}
});

class Register extends Component {
	state = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		errorMessage: ''
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const adminData = {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};

		await axios
			.post('/api/admin', adminData)
			.then((response) => {
				console.log('Data received:', response.data);

				// get jwt token from header
				const token = response.headers['x-auth-token'];

				// add token and name to local storage
				window.localStorage.setItem('token', token);
				window.localStorage.setItem('adminID', response.data.id);
				window.localStorage.setItem('adminName', response.data.name);
				window.localStorage.setItem('adminEmail', response.data.email);

				// test if token is stored
				const localStorageToken = window.localStorage.getItem('token');
				console.log('token from local storage = ', localStorageToken);

				//direct user to admin page
				this.props.history.push({
					pathname: '/staff',
					state: { name: response.data.name, id: response.data._id }
				});
			})
			.catch((error) => {
				this.setState({ errorMessage: error.response.data });
				console.log(error);
			});
	};

	handleChange = (e) => {
		if (e.target.name === 'name') {
			this.setState({ name: e.target.value });
		} else if (e.target.name === 'email') {
			this.setState({ email: e.target.value });
		} else if (e.target.name === 'password') {
			this.setState({ password: e.target.value });
		} else if (e.target.name === 'confirmPassword') {
			this.setState({ confirmPassword: e.target.value });
		} else {
			this.setState({ accessCode: e.target.value });
		}
	};

	render() {
		const { classes } = this.props;
		const { name, email, password, confirmPassword, errorMessage } = this.state;

		return (
			<div className={classes.landingContainer}>
				<NavBarWelcome />
				<form onSubmit={this.handleSubmit}>
					<Grid container direction="column" alignItems="center">
						<Grid item>
							<Typography className={classes.title}>Register</Typography>
						</Grid>

						<Grid item>
							<TextField
								id="name"
								name="name"
								label="Name"
								className={classes.textField}
								value={name}
								onChange={this.handleChange}
								margin="normal"
								variant="outlined"
								type="text"
							/>
						</Grid>

						<Grid item>
							<TextField
								id="email"
								name="email"
								label="Email"
								className={classes.textField}
								value={email}
								onChange={this.handleChange}
								autoComplete="email"
								margin="normal"
								variant="outlined"
								type="email"
							/>
						</Grid>

						<Grid item>
							<TextField
								id="password"
								name="password"
								label="Password"
								className={classes.textField}
								value={password}
								onChange={this.handleChange}
								type="password"
								margin="normal"
								variant="outlined"
							/>
						</Grid>
						<Grid item>
							<TextField
								id="confirmPassword"
								name="confirmPassword"
								label="Confirm password"
								className={classes.textField}
								value={confirmPassword}
								onChange={this.handleChange}
								type="password"
								margin="normal"
								variant="outlined"
							/>
						</Grid>

						<Grid item>
							<StyledButton
								variant="contained"
								label="Submit"
								color="secondary"
								className={classes.button}
								type="submit"
								value="Sign up"
							>
								Sign up
							</StyledButton>
						</Grid>
						<Grid item className={classes.error}>
							{errorMessage}
						</Grid>
					</Grid>
				</form>
			</div>
		);
	}
}

export default withStyles(registerPageStyle)(Register);
