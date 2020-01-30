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
	/*
    

    */
	componentDidMount() {
		this.setState({ numberOfColumns: this.props.numberOfColumns + 1 });
	}

	handleSingleDetailLoad = props => {
		console.log('running single detail axios get');
		axios
			.get(`https://images-api.nasa.gov/search?q=${this.props.nasaID}`)
			.then(response => {
				console.log('single detail = ' + response.data.collection.items[0].data[0]);
				// thumbnail link = response.data.collection.items[x].data.links[0].href;
				this.setState({
					title: response.data.collection.items[0].data[0].title,
					date: response.data.collection.items[0].data[0].date_created,
					explanation: response.data.collection.items[0].data[0].description,
					nasaID: response.data.collection.items[0].data[0].nasa_id,
					center: response.data.collection.items[0].data[0].center,
					keywords: response.data.collection.items[0].data[0].keywords,
					mediaType: response.data.collection.items[0].data[0].media_type,
					thumbnailURL: response.data.collection.items[0].links[0].href
				});
				console.log('done getting single NASA details');
			})
			.catch(error => {
				console.log(error);
			});
		// https://images-assets.nasa.gov/image/as11-40-5874/collection.json
		axios
			.get(`https://images-assets.nasa.gov/image/${this.props.nasaID}/collection.json`)
			.then(response => {
				console.log('single detail collection = ' + response.data[0]);
				this.setState({
					fileURL: response.data[0]
				});

				console.log('done getting single NASA details');
			})
			.catch(error => {
				console.log(error);
			});

		//https://images-assets.nasa.gov/image/as11-40-5874/metadata.json
		axios
			.get(`https://images-assets.nasa.gov/image/${this.props.nasaID}/metadata.json`)
			.then(response => {
				console.log('single detail metadata r = ' + [response]);
				console.log('single detail metadata d = ' + JSON.stringify(response));
				console.log('single detail metadata FS = ' + response.data['File:FileSize']);
				console.log('single detail metadata FF = ' + response.data['File:MIMEType']);
				let fileFormat = response.data['File:MIMEType'];
				let fileFormatString = toString(fileFormat).substring(0, 5);
				this.setState({
					fileSize: response.data['File:FileSize'],
					fileFormat: fileFormatString
				});

				console.log('done getting single NASA details');
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="column1" style={column}>
				<Link to={`/details-${this.props.nasaID}`} style={linkStyle} onClick={this.props.fetchActivity}>
					<img src={this.props.imgURL} style={image} alt="NASA single detail" onClick={fetchActivity} />
					<div onClick={fetchActivity}>{this.props.explanation}</div>
				</Link>
			</div>
		);
	}
}

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
