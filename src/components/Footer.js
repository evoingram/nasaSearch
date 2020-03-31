import React from 'react';
import styled from 'styled-components';
// , { keyframes }
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

const wobble3 = keyframes`
	0% {
        transform: rotate(180deg) translateX(90vh) translateY(0%);
	}
    25% {
        transform: rotate(180deg) translateX(50vh) translateY(-20%);
    }
    50% {
        transform: rotate(180deg) translateX(90vh) translateY(-10%);
    }
    75% {
        transform: rotate(180deg) translateX(50vh) translateY(-20%);
    }
    100% {
        transform: rotate(180deg) translateX(90vh) translateY(0%);
    }
`;
const Astronaut = styled.img`
	src: url(${astronaut});
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
function Footer() {
	return (
		<div>
			<ImgHeader>
				<h2>
					<div>
						{' '}
						<Link href="https://www.ericaingram.com/" target="_blank">
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
						||{' '}
						<Link href="http://www.nasa.gov/FOIA/index.html" target="_blank">
							FOIA
						</Link>{' '}
						||{' '}
						<Link href="https://www.nasa.gov/about/contact/index.html" target="_blank">
							Contact NASA
						</Link>{' '}
						||
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
