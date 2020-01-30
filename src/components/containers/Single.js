import React from 'react';
import styled from 'styled-components';
import PlayerC from '../singles/Player.js';
import Share from '../singles/Share.js';
import FilePath from '../singles/FilePath.js';
import FileInfo from '../singles/FileInfo.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

const Div = styled.div`
	width: 50%;
	margin: 0%;
	padding: 0%;
`;

class Single extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	/*
this.state = {
			searchResults: [],
			searchTerm: '',
			imgURL: '',
			copyright: '',
			date: '',
			explanation: '',
			fileURL: 'http://images-assets.nasa.gov/video/Apollo%2011%20Overview/Apollo%2011%20Overview~preview.mp4',
			nasaID: '',
			fileSize: '',
			fileFormat: '',
			center: '',
			imagecb: true,
			videocb: true,
			audiocb: true,
			page: 1,
			newestURL: 'https://images-assets.nasa.gov/recent.json',
			newestResults: [],
			popularURL: 'https://images-assets.nasa.gov/popular.json',
			popularResults: [],
			currentResults: true,
			currentLoad: [],
			results: []
			thumbnailURL: ''
			images-assets.nasa.gov/video/ESPACIO A TIERRA Jan-24-20/ESPACIO A TIERRA Jan-24-20~orig.mp4
		};

	*/

	componentDidMount() {
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
					center: response.data.collection.items[0].data[0].center,
					keywords: response.data.collection.items[0].data[0].keywords,
					mediaType: response.data.collection.items[0].data[0].media_type,
					thumbnailURL: response.data.collection.items[0].links[0].href
				});
				console.log('done getting single Q NASA details');
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

				console.log('done getting single NASA collection file URL');
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

				console.log('done getting metadata');
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Div className="firstColumn">
						<PlayerC thumbnailURL={this.props.thumbnailURL} fileURL={this.props.fileURL} />
						<Share fileURL={this.props.fileURL} />
					</Div>
					<Div className="secondColumn">
						<FilePath
							title={this.props.title}
							fileURL={this.props.fileURL}
							fileSize={this.props.fileSize}
							fileFormat={this.props.fileFormat}
						/>
						<FileInfo
							nasaID={this.props.nasaID}
							fileURL={this.props.fileURL}
							keywords={this.props.keywords}
							center={this.props.center}
							date={this.props.date}
							centerURL={this.props.centerURL}
							explanation={this.props.explanation}
						/>
					</Div>
				</header>
			</div>
		);
	}
}

export default Single;
