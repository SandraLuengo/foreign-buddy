import React, { Component } from 'react'
import './BuddyPanel.scss';
export default class BuddyPanel extends Component {
    constructor(){
        super();
        this.state = {
            buddies:[],
            user:{}
        }
    }

    componentWillMount () {

        if(this.props){
            this.setState({...this.state,buddies:this.props.buddies},()=>{
                this.setState({...this.state,user:this.props.user})
            })
        }
       
    }

    render() {
        return this.state.buddies && this.state.user ?(
        <div className="buddyPanelContainer">
            {this.state.user.rol === 'user'?this.state.buddies.map((buddy,i)=>{
                return  <div key={i} className="buddyPanel">
                    <div className="BoddyPanelFirst">
                        <div className="panelElements profilePhoto"><img className="buddiesImg" src={buddy.image} alt='img'/></div>
                        <div  className="panelElements"><strong>{buddy.username} {buddy.surname}</strong></div>
                        <div className="arrowFollowing panelElements"><img alt="siguiente" src="images/icons/Adelante.svg"/></div>
                    </div>
                    <div className="descriptionBuddyPanel">{buddy.description}</div>
                    <div className="btnContact"><button name="buddy_id" id={buddy._id} value={buddy._id} onClick={e=>this.props.generateBuddy(e)}>Contact</button></div>
                </div>
            }):<p></p>}
        </div>
        ):
        <div>hola</div>
        
  }
}
