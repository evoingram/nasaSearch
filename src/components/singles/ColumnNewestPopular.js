import React from 'react';
import { Link } from 'react-router-dom';
// import Single from '../containers/Single';
import axios from 'axios';
import { fetchActivity } from '../../actions';
import { connect } from 'react-redux';

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
		// This is the other place where we call this, again without data!
		this.props.fetchActivity(/*data*/);
	};

	render() {
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
						{this.props.explanation}
					</div>
				</Link>
			</div>
		);
	}
}
export default ColumnNewestPopular;

/*
export default ColumnNewestPopular;

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		error: state.error,
		title: state.title,
		imgURL: state.imgURL,
		copyright: state.copyright,
		date: state.date,
		explanation: state.explanation,
		fileURL: state.fileURL,
		fileSize: state.fileSize,
		fileFormat: state.fileFormat,
		captionsFileURL: state.captionsFileURL,
		center: state.center,
		keywords: state.keywords,
		secondaryC: state.secondaryC,
		mediaType: state.mediaType,
		thumbnailURL: state.thumbnailURL,
		singleResult: state.singleResult
	};
};

export default connect(mapStateToProps, { fetchActivity })(ColumnNewestPopular);

*/
