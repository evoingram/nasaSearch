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

/* nasa centers list:
	JPL = http://www.jpl.nasa.gov
	HQ = http://www.nasa.gov/centers/hq/home/index.html
	KSC = http://www.nasa.gov/centers/kennedy/home/index.html
	GSFC = https://www.nasa.gov/centers/goddard/home/index.html
	ARC = http://www.nasa.gov/centers/ames/home/index.html
	AFRC = http://www.nasa.gov/centers/armstrong/home/index.html
	GRC = http://www.nasa.gov/centers/glenn/home/index.html
	GSFC = http://www.nasa.gov/centers/goddard/home/index.html
	GISS = http://www.giss.nasa.gov/
	IVV = http://www.nasa.gov/centers/ivv/home/index.html
	LRC = http://www.nasa.gov/centers/langley/home/index.html
	MSFC = http://www.nasa.gov/centers/marshall/home/index.html
	MAF = http://www.nasa.gov/centers/marshall/michoud/index.html
	ESC = http://www.nasa.gov/offices/nesc/home/
	NSC = http://www.nasa.gov/offices/nsc/home/index.html
	NSSC = http://www.nssc.nasa.gov/
	PBS = http://www.nasa.gov/centers/glenn/about/testfacilities/index.html
	SSC = http://www.nasa.gov/centers/stennis/home/index.html
	WFF = http://www.nasa.gov/centers/wallops/home/index.html
	WSTF = http://www.nasa.gov/centers/wstf/home/index.html

*/
class FileInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = () => {};
	render() {
		// file info component, lower right quadrant of info above explanation in single nasa id detail
		return (
			<Div>
				<b>nasa id:</b> <PText>{this.props.nasaID}</PText>
				<br />
				<b>keywords:</b> <PText>{this.props.keywords}</PText>
				<br />
				<b>center:</b>{' '}
				<a href={this.props.centerLink} target="_blank" rel="noopener noreferrer">
					<PText>{this.props.center}</PText>
				</a>
				<br />
				<b>date created:</b> <PText>{this.props.dateCreated}</PText>
			</Div>
		);
	}
}

export default FileInfo;
