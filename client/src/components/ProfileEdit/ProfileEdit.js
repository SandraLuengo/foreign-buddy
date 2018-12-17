import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Auth/AuthService";
import ProfileService from "../ProfileServer/ProfileService";
import languages from "../../languages.json";
import TabBar from "../TabBar";
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
                console.log(user)
                let day=this.state.user.age.split('-')[0];
                let month=this.state.user.age.split('-')[1];
                let year=this.state.user.age.split('-')[2];
                this.setState({...this.state,day,month,year})
            });
            })

            .catch(err => {
            console.log(err);
            });
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
            console.log(this.state.description)
            this.state.description=this.state.user.description;
        }
        this.profileService.editProfileData(this.state.user,this.state.description,age,this.state.spoken_languages1,this.state.spoken_languages2,this.state.friends).then(user=>{
                console.log('entro');
                this.props.history.push('/profile');
        })
    }

	render() {
		return this.state.user ?(
			<div>
				<Link to='profile'>Back</Link>
                <div className="photo">
                    <img src={this.state.user.image}/>
                    <br/>
                    <input type="file" onChange={e=>{this.editPhoto(e)}}/>
                </div>

                <div className="descriptionEdit">
                    <p>About</p>
                    <textarea name='description' onChange={e=>{this.handleChange(e)}}>{this.state.user.description}</textarea>
                </div>

                <div className="birth">
                    <p>Birth</p>
                    <input type="text" value={this.state.day} name="day" placeholder="Day"  onChange={e => this.handleChange(e)} />
					<input type="text" value={this.state.month} name="month" placeholder="Month"  onChange={e => this.handleChange(e)} />
					<input type="text" value={this.state.year} name="year" placeholder="Year"  onChange={e => this.handleChange(e)} />
                </div>

                <div className="languagesEdit">
                    <p>Languages</p>
                    <select
                        onChange={e => this.handleChange(e)}
                        name="spoken_languages1"
                        size="1"
                        >
                        <option value={this.state.user.spoken_languages[0]}>{this.state.user.spoken_languages[0]}</option>
                        {languages.map(language => {
                            return <option value={language.name}> {language.name} </option>;
                        })}
                    </select>
                    <select
                        onChange={e => this.handleChange(e)}
                        name="spoken_languages2"
                        size="1"
                        >
                        <option value={this.state.user.spoken_languages[1]}>{this.state.user.spoken_languages[1]}</option>
                        {languages.map(language => {
                            return <option value={language.name}> {language.name} </option>;
                        })}
                    </select>
                </div>
                {this.state.user.rol=='user'?<div>
                    <p>I like to make friends with</p>
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
                <div className="welcomBody">
                <TabBar />
                </div>
			</div>
		):<p>load</p>;
	}
}
