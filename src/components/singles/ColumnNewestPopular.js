import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const column = {
	flexBasis: '100%',
	padding: '1%',
	margin: '1%',
	width: '96%',
	maxHeight: '100%',
	fontSize: '1rem'
};
const linkStyle = {
	color: 'white',
	textDecoration: 'none'
};
const image = { maxWidth: '100%', maxHeight: '150px' };

class ColumnNewestPopular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	/*
    

    */
	componentDidMount() {
		this.setState({ numberOfColumns: this.props.numberOfColumns + 1 });
	}

	render() {
		return (
			<div className="column1" style={column}>
				<Link to={`/details-${this.props.nasaID}`} style={linkStyle}>
					<img src={this.props.imgURL} style={image} />
					<div>{this.props.explanation}</div>
				</Link>
			</div>
		);
	}
}

export default ColumnNewestPopular;
