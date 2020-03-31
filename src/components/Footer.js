import React from 'react';
import styled from 'styled-components';
// , { keyframes }
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
						||
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
			</ImgHeader>
		</div>
	);
}

export default Footer;
