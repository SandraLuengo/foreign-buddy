import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading'
import AuthService from '../Auth/AuthService';
import ServiceServer from '../ServiceServer/ServiceService';
import NavBar from '../NavBar';
import './SpecificService.css'

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

	componentDidMount = () => {
		this.authService
		.loggedin()
		.then(user => {
				console.log(this.props)
				this.setState({ ...this.state, user, place:this.props.location.state.place }, () => {
					this.getServices();
					this.getAllFilters();
				});
		})

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

	putFilter = type => {
		
		this.serviceServer.getServicesFilter(this.state.user,this.state.place,type)
		.then(services=>{
			this.setState({...this.state,services},()=>{
				this.closeNav();
			})
		})
	}

	openMenu = () => {

		document.getElementById('filterPlaces').style.width = '250px';		
	}

	closeNav = () => {

		document.getElementById('filterPlaces').style.width = '0';
	}

	render() {
		return this.state.user && this.state.place && this.state.services &&this.state.filter?(
			<div>
				<NavBar redirect={'/place'} back={true}  style={'pink'} menuName={this.props.location.state.place}/>
				<div className="filtersServices">
					<div onClick={e=>this.openMenu()} id="filterMenuOptions" className=""><img src="/images/icons/Filtro.svg"/></div>
					<Link  to={{ pathname:'/new-service', state:{ place: this.state.place }}}>
						<div className="add"><img src="/images/icons/Agregar.svg"/></div>
					</Link>
				</div>
				<div id='filterPlaces' className="filterPlaces">
					<div class="filterItems">
					<div  onClick={e=>this.putFilter('all')} value='all'>All</div>
						{this.state.filter.map((filtro,key)=><div  onClick={e=>this.putFilter(`${filtro}`)} key={key} value={filtro}>{filtro}</div>)}
					</div>
					<div className="filterClose" onClick={e=>this.closeNav()}>X</div>
				</div>
				<div className="servicesContainer">

				{this.state.services.map((item,i)=>{
					return <div className="specificServicePlace" key={i}>
						<div className="serviceImg"><img src={item.image}/></div>
						<div className="specificInformation">
							<h2>{item.name}</h2>
							<div>{item.type}</div>
							<div>{item.address}, {item.city}</div>
						</div>
					</div>
				})}
				</div>
			</div>
		):<Loading/>;
	}
}

{/* <div>Filtro</div>
					<select name='filter' onChange={e=>this.putFilter(e)}>
						<option key='-1' value='all'>All</option>
						
					</select> */}