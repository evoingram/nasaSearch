import React from 'react';
import styled from 'styled-components';
import PlayerC from '../singles/Player.js';
import Share from '../singles/Share.js';
import FilePath from '../singles/FilePath.js';
import FileInfo from '../singles/FileInfo.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Div class="firstColumn">
						<PlayerC thumbnailURL={this.props.thumbnailURL} fileURL={this.props.fileURL} />
						<Share fileURL={this.props.fileURL} />
					</Div>
					<Div class="secondColumn">
						<FilePath
							title={this.props.title}
							fileURL={this.props.fileURL}
							fileSize={this.props.fileSize}
							fileFormat={this.props.fileFormat}
							captionsFileURL={this.props.captionsFileURL}
						/>
						<FileInfo
							nasaID={this.props.nasaID}
							fileURL={this.props.fileURL}
							keywords={this.props.keywords}
							center={this.props.center}
							secondaryC={this.props.secondaryC}
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
