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
import SpecificService from './components/SpecificService';
import { Switch, Route } from 'react-router-dom';
import TabBar from "./components/TabBar";


class App extends Component {
	constructor(){
		super()
		this.state={
			hide:true
		}
	}

	render() {
		return (
			<div className="App">
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/edit-profile" component={ProfileEdit}  />
					<Route exact path="/edit-interests" component={ProfileInterests} />
					<Route path="/newChat" component={ChatWindow} />
					<Route exact path="/new-service" component={NewService} />
					<Route exact path="/chat" component={Chat} />
					<Route exact path="/buddies" component={Buddies} />
					<Route exact path="/place" component={Services} />
					<Route exact path="/museums" component={SpecificService} />
					<Route exact path="/local" component={SpecificService} />
					<Route exact path="/shops" component={SpecificService} />
					<Route exact path="/places" component={SpecificService} />
					<Route exact path="/restaurants" component={SpecificService} />
					{/* <Route exact path="/lead-buddy" component={Buddies} />
					<Route exact path="/social-buddy" component={Buddies} /> */}
				</Switch>
				<TabBar showHide={window.location.pathname==='/signup' || window.location.pathname==='/login' 
				||  window.location.pathname==='/'
				?'hiddenTabBar':'showTabBar'} path={window.location.pathname}/>
			</div>
		);
	}
}

export default App;
