import React, { Component } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import ProfileEdit from './components/ProfileEdit';
import ProfileInterests from './components/ProfileInterests';
import Chat from './components/Chat';
import Services from './components/Services';
import NewService from './components/NewService';
import ChatWindow from './components/ChatWindow';
import Buddies from './components/Buddies';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/edit-profile" component={ProfileEdit} />
					<Route exact path="/edit-interests" component={ProfileInterests} />
					<Route path="/newChat" component={ChatWindow} />
					<Route exact path="/new-service" component={NewService}/>
					<Route exact path="/chat" component={Chat} />
					<Route exact path="/buddies" component={Buddies} />
					<Route exact path="/services" component={Services} />
				</Switch>
			</div>
		);
	}
}

export default App;
