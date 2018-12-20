import React, { Component } from 'react';
import Buttom from '../Buttom';
import './HomePage.scss'

export default class HomePage extends Component {

	constructor() {
		super();
		
		this.state = {

			slideIndex : 0,
			interval:''
		}
	}

	componentDidMount = () =>{

		this.showSlides();
	}



	showSlides = () => {
		var i;
		var slides = document.getElementsByClassName("mySlides");
		var dots = document.getElementsByClassName("dot");
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";  
		}
		this.state.slideIndex++;
		if (this.state.slideIndex > slides.length) {this.state.slideIndex = 1}    
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active", "");
		}
		slides[this.state.slideIndex-1].style.display = "block";  
		dots[this.state.slideIndex-1].className += " active";
		let interval=setTimeout(this.showSlides, 2000); 
		this.setState({...this.state,interval})
	}
	
	killInterval = () => {

		console.log('entro')

		clearInterval(this.state.interval);
	}

	render() {
		return (
			<div className="homePage">
				<div className="slideshow-container">
					<div className="mySlides fade">
						<img src="/images/ilustraciones/Onboarding/Group.svg"/>
					</div>

					<div className="mySlides fade">
						<img src="/images/ilustraciones/Onboarding/Group2.svg"/>
					</div>

					<div className="mySlides fade">
						<img src="/images/ilustraciones/Onboarding/Group3.svg"/>
					</div>
				</div>

				<div className="sliderDot">
					<span className="dot"></span> 
					<span className="dot"></span> 
					<span className="dot"></span> 
				</div>
				<div className="botonosInicio">
					<Buttom clearInterval={this.killInterval} className={'Sigup'} url={'/signup'}>Sign Up</Buttom>
					<Buttom clearInterval={this.killInterval} className={'Login'} url={'/login'}>Login</Buttom>
				</div>
			</div>
		);
	}
}
