import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
	margin-top: 2%;
	margin-bottom: 2%;
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	border: none;
	padding-top: 20px;
	padding-bottom: 20px;
`;
class FileInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<p>
					<b>{this.props.nasaID}:</b>{' '}
					<a href={this.props.fileURL} target="_blank" download>
						<Button>Download</Button>
					</a>
				</p>

				<p>
					<b>
						<a href={this.props.fileURL}>full-resolution file</a>
					</b>
				</p>
				<p>
					<b>nasa id:</b> {this.props.nasaID}
				</p>
				<p>
					<b>keywords:</b> {this.props.keywords}
				</p>
				<p>
					<b>center:</b> {this.props.center}
				</p>
				<p>
					<b>date created:</b> {this.props.center}
				</p>
				<p>
					<b>explanation:</b> {this.props.explanation}
				</p>
			</div>
		);
	}
}

export default FileInfo;
