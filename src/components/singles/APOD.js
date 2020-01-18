import React from 'react';
import styled from 'styled-components';
import '../../css/apod.css';

// get api info here

const NasaImage = styled.img`
	width: 60%;
`;

const NasaH1 = styled.h1`
	font-size: 2rem;
	width: 60%;
	margin-left: 20%;
	margin-top: 3%;
`;

const Nasa = styled.div`
	width: 50%;
	justify-content: center;
	text-align: center;
	align-self: center;
	margin-left: 25%;
	margin-top: 3%;
	margin-bottom: 3%;
	font-size: 1rem;
`;

class APOD extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="wrapper">
				<div className="wrapper1">
					<NasaH1>NASA Random Astronomy Photo of the Day:</NasaH1>
					<div id="nasa1" className="nasa">
						Copyright: <p className="explanation">{this.props.copyright}</p>
					</div>
					<div id="nasa2" className="nasa">
						Date: <p className="explanation">{this.props.date}</p>
					</div>
				</div>
				<div className="wrapper2">
					<div id="nasa2" className="nasa1">
						Explanation: <p className="explanation">{this.props.explanation}</p>
					</div>
					<div id="nasa3" className="nasaImg">
						<NasaImage src={this.props.imgURL} alt="NASA Astronomy Photo of the Day" />
					</div>
				</div>
			</div>
		);
	}
}

export default APOD;
