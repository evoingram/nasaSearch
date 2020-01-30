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

const Single = props => {
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

	return (
		<div className="App">
			<header className="App-header">
				<Div className="firstColumn">
					<PlayerC thumbnailURL={props.thumbnailURL} fileURL={props.fileURL} />
					<Share fileURL={props.fileURL} />
				</Div>
				<Div className="secondColumn">
					<FilePath
						title={props.title}
						fileURL={props.fileURL}
						fileSize={props.fileSize}
						fileFormat={props.fileFormat}
					/>
					<FileInfo
						nasaID={props.nasaID}
						fileURL={props.fileURL}
						keywords={props.keywords}
						center={props.center}
						date={props.date}
						centerURL={props.centerURL}
						explanation={props.explanation}
					/>
				</Div>
			</header>
		</div>
	);
};

export default Single;
