import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	margin-top: 2%;
	margin-bottom: 2%;
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	border: none;
	padding: 20px;
	font-size: 2rem;
	&:hover {
		background-color: #0e3579;
	}
`;
const PText = styled.span`
	font-family: 'RobotoMono', monospace;
	font-size: 10;
	word-break: break-word;
	font-size: 11;
	width: '100%';
	flex-wrap: nowrap;
`;

const Div = styled.div`
	width: 100%;
	margin: 0%;
	padding: 0%;
	align-content: left;
`;
const FilePath = props => {
	// filters link list to original file only
	function originalFileURLFilter(currentLink) {
		return currentLink.includes('~orig');
	}
	//upper right quadrant of info on single nasa id detail page, above fileinfo, right of picture
	return (
		<Div>
			<p>
				<a
					href={props.fileURL.filter(originalFileURLFilter)}
					target="_blank"
					rel="noopener noreferrer"
					download
				>
					<Button>Download</Button>
				</a>
			</p>
			<PText>{props.title}</PText>
			<p>
				<b>file size:</b> <PText>{props.fileSize}</PText>
			</p>
			<p>
				<b>file format:</b> <PText>{props.fileFormat}</PText>
			</p>
		</Div>
	);
};
export default FilePath;
