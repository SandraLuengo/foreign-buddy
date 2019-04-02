import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../Auth/AuthService';
import ServiceServer from '../ServiceServer/ServiceService';
import Loading from '../Loading';
import NavBar from '../NavBar';
import './NewService.css'


export default class NewService extends Component {
	constructor(){

		super();

		this.state={
			user:null,
			place:'',
			services:'',
			actualFilter:'',
			filter:[],
			company:'',
			address:'',
			city:'',
			type:'',
			redirect:false
		}

		this.authService = new AuthService();
		this.serviceServer = new ServiceServer();
	}

	//SACAR AL PADRE

	componentWillMount = () => {
		
		this.authService
		  .loggedin()
		  .then(user => {			
				this.setState({ ...this.state, user, place:this.props.location.state.place}, () => {
					this.getServices();
					this.getAllFilters();
				});
			
		  })
		  .catch(err => {
			console.log(err);
		  });
	};

	getServices = () => {
		this.serviceServer.getPlaces(this.state.user,this.state.place)
		.then(services=>{
			this.setState({...this.state,services},()=>{
				this.getAllFilters();
			})
		})
		.catch(err=>console.log(err))
	}

	getAllFilters = () => {
		
		this.serviceServer.getTypes(this.state.place)
		.then(types=>{
			this.setState({...this.state,filter:types})
		})
	}

	putFilter = e => {

		const { name, value } = e.target;
		this.setState({
		[name]: value
		});
	}

	saveService = e => {

		let city=this.state.user.rol==='user'?this.state.user.destination_city:this.state.user.buddy_city;

		this.serviceServer.newService(this.state.place,this.state.company,this.state.address,city,this.state.type)
		.then(service=>{
			
			this.setState({...this.state,redirect:true},()=>{
			})
		})

	}	

	render() {
		
		return this.state.filter && this.state.user? (
			<div>
				<NavBar redirect={`/${this.props.location.state.place}`}  placeData={this.state.place} back={true}  menuName={`Add new ${this.props.location.state.place.slice(0, -1)}`}/>
				<div className="newContainer">
					<div><input className="inputsNew" onChange={e=>this.putFilter(e)} name="company" placeholder="Company name"/></div>
					<div><input className="inputsNew" onChange={e=>this.putFilter(e)} name="address" placeholder="Adress"/></div>
					<div><input className="inputsNew" onChange={e=>this.putFilter(e)} name="city" disabled value={this.state.user.rol==='user'?this.state.user.destination_city:this.state.user.buddy_city} name="city" placeholder=""/></div>
					<div>
						{this.state.filter&&<select className="inputsNew" name='type' onChange={e=>this.putFilter(e)}>
						<option key='-1' value='all'>Select type</option>
						{this.state.filter.map((filtro,key)=><option key={key} value={filtro}>{filtro}</option>)}
					</select>}
					</div>
					<div className="btnContainer"><button className="inputsNew btn" onClick={e=>this.saveService()}>Save</button></div>
				</div>
				{this.state.redirect&&<Redirect  to={{ pathname:`/${this.state.place}`, state:{ place: this.state.place }}}/>}
				
			</div>
		):<Loading/>;
	}
}
