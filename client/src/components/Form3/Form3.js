import React, { Component } from 'react';
import Buttom from '../Buttom';
import './Form3.css';
import languages from '../../languages.json';
import countries from '../../countries.json';

export default class Form3 extends Component {
	constructor() {
		super();
		this.state={
			cities:[]
		}
	}
	getCities = e => {

		let cities = countries[`${e.target.value}`];
		let cities_name = [];
		Object.values(cities).map(item=>{
			cities_name.push(item.city);
		});
		this.setState({...this.state,cities:cities_name});
		
	};

	getSelectData = e => {
		this.getCities(e)
		this.props.handleChange(e)
	}

	render() {
		return (
			<div className='form3'>
        FORM 3
		{/* ordenar alfabeticamente */}
				<select onChange={e=>this.getSelectData(e)} size='1' name="destination_country">
					<option key={-1} value=""> Destination Country </option>
					{Object.keys(countries).map((countries,index) => {
						return <option key={index}  value={countries}>{countries}</option>;
					})}
				</select>
				<select onChange={e => this.props.handleChange(e)} size='1' name="destination_city">
					<option key={-1} value=""> Destination City </option>
					{(this.state.cities)?
						this.state.cities.map(city=>{
							return <option value={city}>{city}</option>
						})
					
					: ''}
					
				</select>
			    <select onChange={e => this.props.handleChange(e)} size='1' name="origin_country">
					<option key={-1} value=""> Origin Country </option>
					{Object.keys(countries).map((countries,index) => {
						return <option key={index}  value={countries}>{countries}</option>;
					})}
				</select>
				<select onChange={e => this.props.addLanguage(e)}  name="spoken_languages" size='1'>
					<option value="">Select your language</option>
					{languages.map(language => {
						return <option value={language.name}>{language.name}</option>;
					})}
				</select>
				<select onChange={e => this.props.addLanguage(e)}  name="spoken_languages" size='1'>
					<option value="">Select your language</option>
					{languages.map(language => {
						return <option value={language.name}>{language.name}</option>;
					})}
				</select>
				<button onClick={() => this.props.changeForm('end')}>
          Enviar
				</button>
			</div>
		);
	}
}
