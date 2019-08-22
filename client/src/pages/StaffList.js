import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import NavBarAdmin from '../components/NavBarAdmin';
import { Typography } from '@material-ui/core';
import StaffItem from '../components/StaffItem';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';

const useStyles = (theme) => ({
	staffItem: {
		width: '500px',
		minHeight: '100px',
		boxShadow: '0px 0px 30px 5px #f0f0f0',
		borderRadius: '8px',
		paddingTop: theme.spacing(5),
		paddingLeft: theme.spacing(5),
		paddingBottom: theme.spacing(5),
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(2),
		marginLeft: theme.spacing(3),
		borderColor: '#3a7ea1',
		borderStyle: 'solid'
	},

	searchField: {
		marginLeft: theme.spacing(3),
		fontSize: '30px'
	},

	field: {
		fontWeight: 'bold'
	},

	title: {
		color: '#3a7ea1',
		fontWeight: 'lighter',
		fontSize: '40px',
		position: 'relative',
		marginBottom: '15px'
	},

	hint: {
		position: 'relative',
		fontSize: '15px',
		bottom: '20px',
		left: '15px'
	},
	profilePicture: {
		width: '100%',
		height: '100%',
		maxWidth: '120px',
		maxHeight: '120px',
		minWidth: '120px',
		minHeight: '120px',

		objectFit: 'cover',
		borderRadius: '50%',
		position: 'relative',
		bottom: '20px'
	},

	noStaff: {
		position: 'relative',
		top: '100px',
		fontWeight: 'bold',
		fontStyle: 'italic',
		color: ' #3a7ea1'
	},

	label: {
		fontSize: '20px'
	}
});

class StaffList extends Component {
	state = {
		staff: [],
		keyWord: ''
	};

	async componentDidMount() {
		await axios
			.get(`/api/staff`)
			.then((response) => {
				console.log('staff list:', response.data);
				this.setState({
					staff: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	searchHandler = (e) => {
		this.setState({
			keyWord: e.target.value
		});
	};

	searchByName = (keyWord) => {
		return (staff) => {
			return (
				staff.firstName.toLowerCase().includes(keyWord.toLowerCase()) ||
				staff.lastName.toLowerCase().includes(keyWord.toLowerCase()) ||
				!keyWord
			);
		};
	};

	generateStaff = (classes) => {
		const staff = this.state.staff.filter(this.searchByName(this.state.keyWord)).map((staff) => (
			<Grid key={staff._id} item className={classes.staffItem}>
				<Link
					to={{
						pathname: `/staffInfo/${staff._id}`,
						state: {
							firstName: staff.firstName,
							lastName: staff.lastName
						}
					}}
					style={{ textDecoration: 'none' }}
				>
					<StaffItem
						id={staff._id}
						matricule={staff.matricule}
						lastName={staff.lastName}
						firstName={staff.firstName}
						department={staff.department}
						daysOff={staff.daysOff}
						telephone={staff.telephone}
						address={staff.address}
						imageUrl={staff.imageUrl}
					/>
				</Link>
			</Grid>
		));
		return staff;
	};

	render() {
		const { classes } = this.props;

		return (
			<div>
				<NavBarAdmin />
				<div>
					<form>
						<TextField
							id="search"
							name="search"
							label="Search by name..."
							className={classes.searchField}
							value={this.state.key_word}
							onChange={this.searchHandler}
							margin="normal"
							variant="outlined"
							InputLabelProps={{
								classes: {
									root: classes.label
								}
							}}
						/>
					</form>
				</div>
				<Grid container direction="column" alignItems="center">
					{this.state.staff.length !== 0 && (
						<div>
							<Typography className={classes.title}>List of employees</Typography>
							<Typography className={classes.hint}>(Click on the boxes for more information)</Typography>
						</div>
					)}

					{this.state.staff.length !== 0 ? (
						this.generateStaff(classes)
					) : (
						<h1 className={classes.noStaff}> Nothing to display</h1>
					)}
				</Grid>
			</div>
		);
	}
}

export default withStyles(useStyles)(StaffList);
