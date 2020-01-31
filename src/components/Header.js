import React from 'react';
import styled, { keyframes } from 'styled-components';
import spaceBanner from './../img/space-banner.jpg';
import rocket from './../img/rocket.svg';
import SearchForm from './singles/SearchForm.js';

const ImgHeader = styled.header`
	background-image: url(${spaceBanner});
	width: 100%;
	color: #ffffff;
	overflow: hidden;
`;

const wobble3 = keyframes`
	0% {
        transform: rotate(180deg) translateX(90vh) translateY(0%);
	}
    25% {
        transform: rotate(180deg) translateX(50vh) translateY(-20%);
    }
    50% {
        transform: rotate(180deg) translateX(-30vh) translateY(-10%);
    }
    75% {
        transform: rotate(180deg) translateX(-30vh) translateY(-20%);
    }
    100% {
        transform: rotate(180deg) translateX(-100vh) translateY(0%);
    }
`;
const Rocket = styled.img`
	src: url(${rocket});
	justify-content: right;
	align-self: right;
	width: 10%;
	padding-top: 2%;
	color: #ffffff;
	transform: translate(-2vh, -6vh);
	animation: ${wobble3};
	animation-duration: 7s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	z-index: 99000;
	overflow: hidden;
`;

// need rocket animation sliding in and out of screen side to side

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
				<ImgHeader>
					<div id="rocket" className="rocket">
						<Rocket src={rocket} />
					</div>
					<h2>Welcome to Erica Ingram's</h2>
					<h2>NASA Multimedia Library Search React Redux Clone</h2>
					<SearchForm
						searchNASALibrary={this.props.searchNASALibrary}
						changeSearchTerm={this.props.changeSearchTerm}
					/>
				</ImgHeader>
			</div>
		);
	}
}

export default Header;
