import React from 'react';
import styled, { keyframes } from 'styled-components';
import spaceBanner from './../img/space-banner.jpg';
import astronaut from './../img/astronaut.svg';

const ImgHeader = styled.header`
	background-image: url(${spaceBanner});
	width: 100%;
	color: #ffffff;
	overflow: hidden;
`;
const Link = styled.a`
	color: #ffffff;
	text-decoration: none;

	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		color: #ffffff;
		text-decoration: none;
	}
`;
const paddingTop = {
	paddingTop: '5%',
	paddingBottom: '5%'
};
const paddingBottom = {
	marginBottom: '-10%'
};

const wobble3 = keyframes`
	0% {
        transform: rotate(-45deg) translateX(36vh) translateY(24vh);
	}
    25% {
        transform: rotate(-35deg) translateX(32vh) translateY(22vh);
    }
    50% {
        transform: rotate(-45deg) translateX(30vh) translateY(21vh);
    }
    75% {
        transform: rotate(-35deg) translateX(32vh) translateY(21vh);
    }
    100% {
        transform: rotate(-45deg) translateX(36vh) translateY(24vh);
    }
`;
const Astronaut = styled.img`
	src: url(${astronaut});
	justify-content: right;
	align-self: right;
	width: 10%;
	padding-top: 2%;
	color: #ffffff;
	transform: translate(-2vh, -30vh);
	animation: ${wobble3};
	animation-duration: 7s;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	z-index: 99000;
	overflow: hidden;
`;
function Footer() {
	return (
		<div>
			<ImgHeader>
				<h2 style={paddingBottom}>
					<div style={paddingTop}>
						{' '}
						<Link href="http://www.ericaingram.com/" target="_blank">
							See more of Erica's work in her portfolio.
						</Link>
					</div>
					<div>
						{' '}
						<Link
							href="http://www.nasa.gov/audience/formedia/features/MP_Photo_Guidelines.html"
							target="_blank"
						>
							NASA's Usage Guidelines
						</Link>
					</div>
					<div>
						{' '}
						|{' '}
						<Link href="http://www.nasa.gov/FOIA/index.html" target="_blank">
							FOIA
						</Link>{' '}
						|{' '}
						<Link href="https://www.nasa.gov/about/contact/index.html" target="_blank">
							Contact NASA
						</Link>{' '}
						|
					</div>
				</h2>
				<div id="astronaut" className="astronaut">
					<Astronaut src={astronaut} />
				</div>
			</ImgHeader>
		</div>
	);
}

export default Footer;
