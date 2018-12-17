import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Auth/AuthService';
import ProfileService from '../ProfileServer/ProfileService';
import TabBar from '../TabBar';
import './ProfileInterests.css';

export default class ProfileInterests extends Component {
    
	constructor(){
        super();

        this.state = {
            user: null,
            redirect: false,
            interests:[]
        };

        this.authService = new AuthService();
        this.profileService = new ProfileService();
    }
    
    componentWillMount = () => {
        this.authService
            .loggedin()
            .then(user => {
            this.setState({ ...this.state, user });
            })
            .catch(err => {
            console.log(err);
            });
    };
    editInterests = e =>{
        document.querySelector('.interestList').className='interestListActive';
        document.querySelector('.saveInterest').style.display = "block";
    }

    addInterest = e => {
        var element = document.getElementsByName(e.target.name);
        element[0].classList.toggle("interestActive");
        let interestsArray = this.state.interests;
        interestsArray.push(e.target.name);
        this.setState({...this.state,interests:interestsArray})
    }

    saveInterests = e => {
        this.profileService
        .editInterests(this.state.interests,this.state.user)
        .then(resp=>console.log('guardado correctamente en la bbdd'))
        .catch(err=>console.log(err))
    }
	render() {
		return this.state.user?(
			<div>
                <Link to='profile'>Back</Link>
				<div className="interests">
					<div className="interestList">
						<button className="" name='animals' value="animals" onClick={e=>{this.addInterest(e);}}>Animals</button>
						<button className="" name='nature' value="nature" onClick={e=>{this.addInterest(e);}}>Nature</button>
						<button className="" name='read' value="read" onClick={e=>{this.addInterest(e);}}>Read</button>
						<button className="" name='art' value="art" onClick={e=>{this.addInterest(e);}}>Art</button>
						<button className="" name='science' value="science" onClick={e=>{this.addInterest(e);}}>Science</button>
					</div>
					<br/>
					<button onClick={e=>{this.editInterests(e);}}>Edit</button>
					<button className="saveInterest" onClick={e=>{this.saveInterests(e);}}>Save</button>
				</div>
				<div className="welcomBody">
					<TabBar />
				</div>
			</div>
		):<p>load</p>;
	}
}
