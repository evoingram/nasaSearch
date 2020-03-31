import React, { useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.button`
	margin-top: 2%;
	margin-bottom: 2%;
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	border: none;
	padding: 20px;
`;
const FilePath = props => {
	useEffect(() => {
		console.log('Checking, nasaID = ' + props.nasaID);
		console.log('Checking, fileURL = ' + props.fileURL);
		console.log('Checking, fileSize = ' + props.fileSize);
	});
	return (
		<div className="App">
			<header className="App-header">
				<div>
					<p>
						<a href={props.fileURL} target="_blank" download>
							<Button>Download</Button>
						</a>
					</p>
					<p>{props.title}</p>

					<p>
						<b>
							<a href={props.fileURL}>full-resolution file</a>
						</b>
					</p>
					<p>
						<b>file size:</b> {props.fileSize}
					</p>
					<p>
						<b>file format:</b> {props.fileFormat}
					</p>
				</div>
			</header>
		</div>
	);
};
export default FilePath;
