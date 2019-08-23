import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import NavBarLogin from '../components/NavBarLogin';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { Typography } from '@material-ui/core';
import { StyledButton } from '../themes/theme';

const loginPageStyle = (theme) => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	title: {
		color: '#3a7ea1',
		fontWeight: 'bold',
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

class Login extends Component {
	state = {
		name: '',
		password: '',
		errorMessage: ''
	};
	handleSubmit = async (e) => {
		e.preventDefault();
		//make http request to login
		const credentials = {
			name: this.state.name,
			password: this.state.password
		};

		await axios
			.post('/api/auth', credentials)
			.then((response) => {
				console.log(response.data);

				// get jwt token from header
				const token = response.headers['x-auth-token'];

				// add token ,name and email to local storage
				window.localStorage.setItem('token', token);
				window.localStorage.setItem('adminID', response.data.id);
				window.localStorage.setItem('adminName', response.data.name);
				window.localStorage.setItem('adminEmail', response.data.email);

				//direct user to staff page
				this.props.history.push({
					pathname: '/staff',
					state: { name: response.data.name, id: response.data._id }
				});
			})
			.catch((error) => {
				console.log('ERROR:', error);
				this.setState({ errorMessage: 'Invalid user name and/or password!' });
			});
	};
	handleChange = (e) => {
		if (e.target.name === 'name') {
			this.setState({ name: e.target.value });
		} else {
			// password
			this.setState({ password: e.target.value });
		}
	};

	render() {
		const { classes } = this.props;
		const { name, password, errorMessage } = this.state;
		return (
			<div>
				<NavBarLogin />
				<form onSubmit={this.handleSubmit}>
					<Grid container direction="column" alignItems="center">
						<Grid item>
							<Typography className={classes.title}>Sign in</Typography>
						</Grid>

						<Grid item>
							<TextField
								required
								id="name"
								name="name"
								label="User name"
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
								required
								id="password"
								name="password"
								label="Password"
								className={classes.textField}
								value={password}
								onChange={this.handleChange}
								type="password"
								autoComplete="current-password"
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
								value="Sign in"
							>
								Sign in
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

export default withStyles(loginPageStyle)(Login);
