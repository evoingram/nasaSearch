import React from 'react';
import { Link } from 'react-router-dom';

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
	componentDidMount() {
		this.setState({ numberOfColumns: this.props.numberOfColumns + 1 });
	}

	handleSingleDetailLoad = e => {
		console.log('e = ' + e.target.value);
		this.props.fetchActivity(this.props.nasaID, this.props.mediaType);
	};

	render() {
		console.log();
		console.log();
		return (
			<div className="column1" style={column}>
				<Link
					to={`/details/${this.props.nasaID}`}
					style={linkStyle}
					onClick={this.handleSingleDetailLoad}
					value={[this.props.nasaID, this.props.mediaType]}
				>
					<img
						src={this.props.imgURL}
						style={image}
						alt="NASA single detail"
						onClick={this.handleSingleDetailLoad}
						value={(this.props.nasaID, this.props.mediaType)}
					/>
					<div value={[this.props.nasaID, this.props.mediaType]} onClick={this.handleSingleDetailLoad}>
						{this.props.dateCreated.substring(0, 10)}
						<br />
						{this.props.title}
						<br />
						{this.props.explanation}
					</div>
				</Link>
			</div>
		);
	}
}
export default ColumnNewestPopular;
