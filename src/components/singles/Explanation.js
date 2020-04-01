import React from 'react';
import styled from 'styled-components';

const PText = styled.span`
	font-family: 'RobotoMono', monospace;
	font-size: 10;
	word-break: break-word;
	font-size: 11;
	width: '100%';
	flex-wrap: nowrap;
`;

const Div = styled.div`
	width: 90%;
	margin: 0%;
	padding: 5%;
`;
class Explanation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Div>
				<b>explanation:</b> <br />
				<PText>{this.props.explanation}</PText>{' '}
			</Div>
		);
	}
}

export default Explanation;
