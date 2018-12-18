import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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

	componentWillMount = () => {
		this.authService
		  .loggedin()
		  .then(user => {
			this.setState({ ...this.state, user }, () => {
				this.setState({...this.state,place:this.props.location.state.place},()=>{
					this.getServices();
					this.getAllFilters();
				})
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

	putFilter = e => {
		this.serviceServer.getServicesFilter(this.state.user,this.state.place,e.target.value)
		.then(services=>{
			this.setState({...this.state,services})
		})
	}

	getAllFilters = () => {
		
		let filters=[];

		Object.values(this.state.services).map(service=>filters.push(service.type));

		let uniqueArray = filters.filter((item, pos, self)=>self.indexOf(item) == pos);

		this.setState({...this.state,filter:uniqueArray})
	}

	render() {
		return this.state.user && this.state.place && this.state.services &&this.state.filter?(
			<div>
				<Link to="/services">Places</Link>
				<br/>
				<Link to='/newPlace'>Add New</Link>
				<div>
					<div>Filtro</div>
					<select name='filter' onChange={e=>this.putFilter(e)}>
						<option key='-1' value='all'>All</option>
						{this.state.filter.map((filtro,key)=><option key={key} value={filtro}>{filtro}</option>)}
					</select>
				</div>
				{this.props.location.state.place?<h1>{this.props.location.state.place}</h1>:''}
				{this.state.services.map(item=>{
					return <div>
						<h2>{item.name}</h2>
						<div>{item.type}</div>
						<div>{item.address}, {item.city}</div>
					</div>
				})}
			</div>
		):<p>load</p>;
	}
}
