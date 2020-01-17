import React from 'react';
import styled, { keyframes } from 'styled-components';
import spaceBanner from './../img/space-banner.jpg';
import rocket from './../img/rocket.svg';

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
        transform: rotate(180deg) translateX(-70vh) translateY(0%);
    }
    75% {
        transform: rotate(180deg) translateX(-110vh) translateY(-10%);
    }
    100% {
        transform: rotate(180deg) translateX(-150vh) translateY(-20%);
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
	constructor() {
		super();
		this.state = {
			searchTerm: ''
		};
	}
	render() {
		return (
			<div>
				<ImgHeader>
					<div id="rocket" class="rocket">
						<Rocket src={rocket} />
					</div>
					<h2>Welcome to Erica Ingram's</h2>
					<h2>NASA Multimedia Library Search Clone</h2>
				</ImgHeader>
			</div>
		);
	}
}

export default Header;
