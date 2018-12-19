import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Auth/AuthService';
import ServiceServer from '../ServiceServer/ServiceService';
import Loading from '../Loading';


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
			type:''
		}

		this.authService = new AuthService();
		this.serviceServer = new ServiceServer();
	}

	//SACAR AL PADRE

	componentWillMount = () => {
		
		this.authService
		  .loggedin()
		  .then(user => {
			if(this.props.location.state.place){
				this.setState({ ...this.state, user, place:this.props.location.state.place}, () => {
					this.getServices();
					this.getAllFilters();
				});
			}
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
			this.props.history.push(`/${this.state.place}`)
		})

	}	

	render() {
		
		return this.state.filter && this.state.user? (
			<div>
				<h1>Add new {this.props.location.state.place}</h1>
				<div><input onChange={e=>this.putFilter(e)} name="company" placeholder="Company name"/></div>
				<div><input onChange={e=>this.putFilter(e)} name="address" placeholder="Adress"/></div>
				<div><input onChange={e=>this.putFilter(e)} name="city" disabled value={this.state.user.rol==='user'?this.state.user.destination_city:this.state.user.buddy_city} name="city" placeholder=""/></div>
				<div>
					{this.state.filter&&<select name='type' onChange={e=>this.putFilter(e)}>
					<option key='-1' value='all'>Select type</option>
					{this.state.filter.map((filtro,key)=><option key={key} value={filtro}>{filtro}</option>)}
				</select>}
				</div>
				<button onClick={e=>this.saveService()}>Save</button>
				<br/>
				<Link  to={{ pathname:`/${this.state.place}`, state:{ place: this.state.place }}}>Back</Link>
			</div>
		):<Loading/>;
	}
}
