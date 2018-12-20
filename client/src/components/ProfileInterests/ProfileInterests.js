import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Auth/AuthService';
import ProfileService from '../ProfileServer/ProfileService';
import Loading from '../Loading';
import NavBar from '../NavBar';
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
            this.setState({ ...this.state, user },()=>{
                console.log(this.state.user.interests.length)
                if(this.state.user.interests.length>1){
                this.state.user.interests.map(interest=>{
                    var element = document.getElementsByName(interest);
                    element[0].classList.toggle('interestActive');
                    return ;
                })
                }
            });
            })
            .catch(err => {
            console.log(err);
            });
    };
    addInterest = e => {
       
        var element = document.getElementsByName(e.target.name);
        element[0].classList.toggle('interestActive');
        let interestsArray = this.state.interests;
        interestsArray.push(e.target.name);
        this.setState({...this.state,interests:interestsArray},()=>{
        })
    }

    saveInterests = e => {
        let arrayInterest = [];

        Object.values(document.getElementsByClassName('interestActive')).map(item=>arrayInterest.push(item.value))
        console.log(arrayInterest)
        this.profileService
        .editInterests(arrayInterest,this.state.user)
        .then(resp=>{
            console.log('SAVE')
            this.props.history.push('/profile');
        })
        .catch(err=>this.props.history.push('/profile'))
    }
	render() {
		return this.state.user?(
			<div>
                
                <NavBar  redirect={'/profile'} back={true}  menuName={'Likes & interests'} save={e=>this.save(e)}/>

				<div className="interests">
					<div className="interestList uno">
						<button className="" name='animals' value="animals" onClick={e=>{this.addInterest(e);}}>Animals</button>
						<button className="" name='nature' value="nature" onClick={e=>{this.addInterest(e);}}>Nature</button>
						<button className="" name='read' value="read" onClick={e=>{this.addInterest(e);}}>Read</button>
						<button className="" name='art' value="art" onClick={e=>{this.addInterest(e);}}>Art</button>
						<button className="" name='science' value="science" onClick={e=>{this.addInterest(e);}}>Science</button>
					</div>

                    <div className="titleClass">What would you do on a rainy day?</div>
                    <div className="row1">
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                    </div>
                    <div className="titleClass">Where would you go on a holiday?</div>
                    <div className="row2">
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                    </div>
                    <div className="titleClass">What food do you prefer?</div>
                    <div className="row3">
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                    </div>
                    <div className="titleClass">What activity de you do most?</div>
                    <div className="row4">
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                    </div>
                    <div className="titleClass">What would you do on a Friday night?</div>
                    <div className="row5">
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer"  onClick={e=>{this.addInterest(e);}} ><img src="/images/intereses/Burger.png"/></div>
                    </div>

					<br/>
					<button className="saveInterest" onClick={e=>{this.saveInterests(e);}}>Save</button>
                    <br/>
                    <Link to='/profile'>Completar en otro momento</Link>
				</div>
			</div>
		):<Loading/>;
	}
}
