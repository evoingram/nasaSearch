import React from 'react';
import styled, { keyframes } from 'styled-components';
import spaceBanner from './../img/space-banner.jpg';

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

function Footer() {
	return (
		<div>
			<ImgHeader>
				<h2>
					See more of Erica's work in{' '}
					<Link href="https://www.aquoco.co/" target="_blank">
						her portfolio.
					</Link>
				</h2>
			</ImgHeader>
		</div>
	);
}

export default Footer;
