import React from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter, Route } from 'react-router-dom';

import { theme } from './themes/theme';
import Register from './pages/Register';
import Login from './pages/Login';
import Staff from './pages/Staff';
import AddEmployee from './pages/AddEmployee';
import StaffList from './pages/StaffList';
import BreaksList from './pages/BreaksList';

import DaysOff from './pages/DaysOff';

import StaffInfo from './components/StaffInfo';
import BreakInfo from './components/BreakInfo';

import AddStaffFiles from './pages/AddStaffFiles';

import './App.css';

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<Route path="/" exact component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/staff" exact component={Staff} />
				<Route path="/staff/:id/daysOff" exact component={DaysOff} />
				<Route path="/staff/:id/daysOff/list" exact component={BreaksList} />
				<Route path="/addEmployee" component={AddEmployee} />
				<Route path="/staffList" component={StaffList} />
				<Route path="/staffInfo/:id" component={StaffInfo} />
				<Route path="/breakInfo/:id" exact component={BreakInfo} />
				<Route path="/addStaffFiles/:id" component={AddStaffFiles} />
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
