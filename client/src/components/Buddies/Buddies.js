import React, { Component } from 'react';
import { Redirect,Link } from 'react-router-dom';
import AuthService from '../Auth/AuthService';
import Loading from '../Loading';
import NavBar from '../NavBar';
import BuddiesService from '../BuddiesServer/BuddiesService';
import BuddyPanel from '../BuddyPanel';
import './Buddies.css'


export default class Buddies extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      redirect: false,
      buddies: '',
      type:'social'
    };
    this.authService = new AuthService();
    this.buddiesService = new BuddiesService();
  }
  logOut = () => {
    this.authService.logout().then(user => {
      this.setState({ ...this.state, redirect: true });
    });
  };

  componentDidMount () {
    this.authService
      .loggedin()
      .then(user => {
        this.setState({ ...this.state, user }, () => {
          this.buddiesService.getBuddies(user).then(buddies => {
            this.setState({ ...this.state, buddies });
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  generateBuddy = e => {
    this.buddiesService.addNewBuddy(e.target.value,this.state.user)
    .then(user=>{
      this.setState({...this.state,user},()=>{
        this.buddiesService.getBuddies(user)
        .then(buddies => {
            this.setState({ ...this.state, buddies },()=>{
              this.props.history.push('/chat');
            });
        });
      }) 
    })
    .catch(err=>console.log(err))
  }

  changeWindow = type => {
    console.log(type)
    this.setState({...this.state,type})
  }

  render() {
    return this.state.user && !this.state.redirect && this.state.buddies ? (
      <div>
        <NavBar menuName={'Buddys'} style={'pink'}/>
        <div className="buddyTypeNavBar">
          <div className="navBuddy">
            {this.state.user.rol === 'user'?<div onClick={e=>this.changeWindow('social')} className="buddyCircle"><p>Socia Buddies</p></div>:''}
            <div  onClick={e=>this.changeWindow('lead')} className="buddyCircle lead"><p>Lead Buddies</p></div>
          </div>
            {this.state.user.rol=='buddy'?<div></div>:
             <div className="underlineBuddy">
             <div className={`first ${this.state.type=='social'? 'active':'disabled'}`}></div>
             <div  className={`second ${this.state.type=='lead'? 'active':'disabled'}`}></div>
           </div>
          }
           
        </div>
        {this.state.user.rol=='buddy'?<div className="leadBuddy2"><img src="/images/ilustraciones/Proximamente.svg"/></div>:
        <div className="buddiesContainer">
        {this.state.type==='social' && this.state.buddies.length>0?  
          <BuddyPanel  generateBuddy={this.generateBuddy} buddies={this.state.buddies} user={this.state.user}/>:
           this.state.type==='social'  && this.state.buddies.length>0 ==0?
           <div className="noBuddys"><img src="/images/ilustraciones/noBuddys.svg"/></div>
          :<div className="leadBuddy"><img src="/images/ilustraciones/Proximamente.svg"/></div>
        }
      </div>
      }
        
      </div>
    ) : this.state.redirect ? (
      <Redirect to="/" />
    ) : (
      <Loading/>
    );
  }
}
