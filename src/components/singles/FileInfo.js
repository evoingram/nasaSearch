import React from 'react';
import styled from 'styled-components';

const PText = styled.span`
	font-family: 'RobotoMono', monospace;
	font-size: 10;
	word-break: break-word;
	font-size: 11;
	width: '100%';
	flex-wrap: nowrap;
	padding-top: 5%;
	padding-bottom: 5%;
`;

const Div = styled.div`
	width: 100%;
	margin: 0%;
	padding: 0%;
`;
class FileInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Div>
				<b>nasa id:</b> <PText>{this.props.nasaID}</PText>
				<br />
				<b>keywords:</b> <PText>{this.props.keywords}</PText>
				<br />
				<b>center:</b> <PText>{this.props.center}</PText>
				<br />
				<b>date created:</b> <PText>{this.props.dateCreated}</PText>
			</Div>
		);
	}
}

export default FileInfo;
