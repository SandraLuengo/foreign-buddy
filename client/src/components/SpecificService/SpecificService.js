import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from "../Loading"
import AuthService from '../Auth/AuthService';
import ServiceServer from '../ServiceServer/ServiceService';

export default class SpecificService extends Component {
	constructor(){
		super();
		this.state={
			user:null,
			place:'',
			services:'',
			filter:''
		}

		this.authService = new AuthService();
		this.serviceServer = new ServiceServer();
	}

	//SACAR AL PADRE

	componentWillMount = () => {
		this.authService
		  .loggedin()
		  .then(user => {
			this.setState({ ...this.state, user, place:this.props.location.state.place }, () => {
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
		this.serviceServer.getServicesFilter(this.state.user,this.state.place,e.target.value)
		.then(services=>{
			this.setState({...this.state,services})
		})
	}


	render() {
		return this.state.user && this.state.place && this.state.services &&this.state.filter?(
			<div>
				<Link to="/place">Places</Link>
				<br/>
				<Link  to={{ pathname:'/new-service', state:{ place: this.state.place }}}>Add New</Link>
				
				<div>
					<div>Filtro</div>
					<select name='filter' onChange={e=>this.putFilter(e)}>
						<option key='-1' value='all'>All</option>
						{this.state.filter.map((filtro,key)=><option key={key} value={filtro}>{filtro}</option>)}
					</select>
				</div>
				{this.props.location.state.place?<h1>{this.props.location.state.place}</h1>:''}
				{this.state.services.map((item,i)=>{
					return <div key={i}>
						<h2>{item.name}</h2>
						<div>{item.type}</div>
						<div>{item.address}, {item.city}</div>
					</div>
				})}
			</div>
		):<Loading/>;
	}
}
