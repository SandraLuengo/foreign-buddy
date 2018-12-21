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
                if(this.state.user.interests.length > 1){

                this.state.user.interests.map(interest=>{
                    var element = document.getElementById(interest);
                    element.classList.toggle('interestActive');
                    return ;
                })
                }
            });
            })
            .catch(err => {
            console.log(err);
            });
    };
    addInterest = val => {
       
        var element = document.getElementById(val);
        element.classList.toggle('interestActive');
        let interestsArray = this.state.interests;
        interestsArray.push(val);
        this.setState({...this.state,interests:interestsArray},()=>{
        })
    }

    saveInterests = e => {

        let arrayInterest = Object.values(document.getElementsByClassName('interestActive')).map(item=>{
            return item.id
        })
        this.profileService
        .editInterests(arrayInterest,this.state.user)
        .then(resp=>{
            this.props.history.push('/profile');
        })
        .catch(err=>this.props.history.push('/profile'))
    }
	render() {
		return this.state.user?(
			<div>
                
                <NavBar  redirect={'/profile'} back={true}  menuName={'Likes & interests'} save={e=>this.save(e)}/>

				<div className="interests">

                    <div className="titleClass uno">What would you do on a rainy day?</div>
                    <div className="row1 interestList interests">
                        <div className="interestImaContainer" id='item1' value="item1"  onClick={e=>{this.addInterest('item1');}} ><img src="/images/intereses/Bosque.png"/></div>
                        <div className="interestImaContainer" id='item2' value="item2" onClick={e=>{this.addInterest('item2');}} ><img src="/images/intereses/Tv.png"/></div>
                        <div className="interestImaContainer" id='item3' value="item3" onClick={e=>{this.addInterest('item3');}} ><img src="/images/intereses/Pintar.png"/></div>
                        <div className="interestImaContainer" id='item4' value="item4"  onClick={e=>{this.addInterest('item4');}} ><img src="/images/intereses/Leer.png"/></div>
                    </div>
                    <div className="titleClass">Where would you go on a holiday?</div>
                    <div className="row2 interestList interests">
                        <div className="interestImaContainer" id='item5' value="item5"  onClick={e=>{this.addInterest('item5');}} ><img src="/images/intereses/Playa.png"/></div>
                        <div className="interestImaContainer" id='item6' value="item6"  onClick={e=>{this.addInterest('item6');}} ><img src="/images/intereses/Ciudad.png"/></div>
                        <div className="interestImaContainer" id='item7' value="item7" onClick={e=>{this.addInterest('item7');}} ><img src="/images/intereses/Nieve.png"/></div>
                        <div className="interestImaContainer" id='item8' value="item8"  onClick={e=>{this.addInterest('item8');}} ><img src="/images/intereses/Bosque.png"/></div>
                    </div>
                    <div className="titleClass">What food do you prefer?</div>
                    <div className="row3 interestList interests">
                        <div className="interestImaContainer" id='item9' value="item9"  onClick={e=>{this.addInterest('item9');}} ><img src="/images/intereses/Burger.png"/></div>
                        <div className="interestImaContainer" id='item10' value="item10"  onClick={e=>{this.addInterest('item10');}} ><img src="/images/intereses/Mexicana.png"/></div>
                        <div className="interestImaContainer" id='item11' value="item11"  onClick={e=>{this.addInterest('item11');}} ><img src="/images/intereses/Sushi.png"/></div>
                        <div className="interestImaContainer" id='item12' value="item12"  onClick={e=>{this.addInterest('item12');}} ><img src="/images/intereses/Pizza.png"/></div>
                    </div>
					<br/>
					<div className="botonInteressave">
                        <button className="saveInterest" onClick={e=>{this.saveInterests(e);}}>Save</button>
                        <div className="backInt"><Link to='/profile'>Completar en otro momento</Link></div>
                    </div>
                    <br/>
                    
				</div>
			</div>
		):<Loading/>;
	}
}
