import React, { Component } from 'react';
import AuthService from '../Auth/AuthService';
import ProfileService from '../ProfileServer/ProfileService';
import languages from '../../languages.json';
import Loading from '../Loading';
import NavBar from '../NavBar';
import './ProfileEdit.css';

export default class ProfileEdit extends Component {
	constructor(){
        super();

        this.state = {
            user: null,
            redirect: false,
            interests:[],
            day:'',
            month:'',
            year:'',
            file:'',
            current:'',
            spoken_languages1:'',
            spoken_languages2:'',
            description:'',
            friends:'',
            edit:''
        };

        this.authService = new AuthService();
        this.profileService = new ProfileService();
    }
    
    componentWillMount = () => {
        this.authService
            .loggedin()
            .then(user => {
            this.setState({ ...this.state, user },()=>{
                let day=this.state.user.age.split('-')[0];
                let month=this.state.user.age.split('-')[1];
                let year=this.state.user.age.split('-')[2];
                this.setState({...this.state,day,month,year})
            });
            })
            .catch();
    };

    editPhoto = e => {
        this.setState({...this.state,
			file: e.target.files[0]
		});   
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({
        [name]: value
        });
    }

    save = e => {
        console.log('guardo')
        e.preventDefault();
        if(this.state.file){
            this.profileService.postPhoto(this.state.file,this.state.user._id,this.state.user.rol).then((user)=>{
                const newUser = {
                    ...this.state.user,
                    image: user.image
                }
                this.setState({...this.state, user:newUser});
            });
        }  
        let age = `${this.state.day}-${this.state.month}-${this.state.year}`;
        
        if(!this.state.spoken_languages1){
            this.state.spoken_languages1=this.state.user.spoken_languages[0];
        }
        if(!this.state.spoken_languages2){
            this.state.spoken_languages2=this.state.user.spoken_languages[1];
        }
         if(!this.state.friends){
            this.state.friends=this.state.user.buddy_gender;
        }
        if(!this.state.description){
            this.state.description=this.state.user.description;
        }
        this.profileService.editProfileData(this.state.user,this.state.description,age,this.state.spoken_languages1,this.state.spoken_languages2,this.state.friends).then(user=>{
          
                this.props.history.push('/profile');
        })
        .catch()
    }

	render() {
		return this.state.user ?(
			<div>
                <NavBar arrow={'Done'} style2={'pink'} redirect={'/profile'} back={true}  menuName={'Edit Profile'} save={e=>this.save(e)}/>
                <div className="editProfileContainer">
                    <div className="photo">
                        <div className="profilePhotoContainer"><img src={this.state.user.image} alt=''/></div>
                        <div class="upload-btn-wrapper">
                            <button class="btnGiorgio"></button>
                            <input onChange={e=>{this.editPhoto(e)}} type="file"/>
                        </div>
                    </div>

                    <div className="descriptionEdit">
                        <div className="titulitos">About me</div>
                        <textarea name='description' onChange={e=>{this.handleChange(e)}} defaultValue={this.state.user.description}></textarea>
                    </div>

                    <div className="birth">
                        <p className="titulitos">Birth</p>
                        <div className="ageContainer">
                            <input type="text" value={this.state.day} name="day" placeholder="Day"  onChange={e => this.handleChange(e)} />
                            <input type="text" value={this.state.month} name="month" placeholder="Month"  onChange={e => this.handleChange(e)} />
                            <input type="text" value={this.state.year} name="year" placeholder="Year"  onChange={e => this.handleChange(e)} />
                        </div>
                    </div>

                    <div className="languagesEdit">
                        <p className="titulitos">Languages</p>
                        <select
                            onChange={e => this.handleChange(e)}
                            name="spoken_languages1"
                            size="1"
                            >
                            <option value={this.state.user.spoken_languages[0]}>{this.state.user.spoken_languages[0]}</option>
                            {languages.map((language, i) => {
                                return <option key={i} value={language.name}> {language.name} </option>;
                            })}
                        </select>
                        <select
                            onChange={e => this.handleChange(e)}
                            name="spoken_languages2"
                            size="1"
                            >
                            <option value={this.state.user.spoken_languages[1]}>{this.state.user.spoken_languages[1]}</option>
                            {languages.map((language, i) => {
                                return <option key={i} value={language.name}> {language.name} </option>;
                            })}
                        </select>
                    </div>
                    {this.state.user.rol === 'user'?<div className="friendsProfile">
                        <p  className="titulitos">I like to make friends with</p>
                        <select name="friends" onChange={e => this.handleChange(e)}>
                            <option>{this.state.user.buddy_gender}</option>
                            <option>Girls and Boys</option>
                            <option>Girls</option>
                            <option>Boys</option>
                        </select>
                    </div>:<p></p>}
                    
                    <div>
                        <br/>
                        <button type="submit" onClick={e=>this.save(e)}>Save</button>
                    </div>
                </div>
			</div>
		):<Loading/>;
	}
}
