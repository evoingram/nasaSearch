import React from 'react';
import styled from 'styled-components';
import PlayerC from '../singles/Player.js';
import Share from '../singles/Share.js';
import FilePath from '../singles/FilePath.js';
import FileInfo from '../singles/FileInfo.js';
import { connect } from 'react-redux';
import { fetchActivity } from '../../actions';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import axios from 'axios';

const Div = styled.div`
	width: 50%;
	margin: 0%;
	padding: 0%;
`;

const Single = props => {
	/*		this.state = {
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

	/*
	singleResult.data[0].media_type
	isLoading: false,
	title: singleResult.data[0].title,
	date: singleResult.data[0].date_created,
	explanation: singleResult.data[0].description,
	center: singleResult.data[0].center,
	keywords: singleResult.data[0].keywords,
	mediaType: singleResult.data[0].media_type,
	thumbnailURL: singleResult.links[0].href,
	singleResult: singleResult
*/
	return (
		<div className="App">
			{!props.fileURL && !props.isLoading && <p>Loading...</p>}
			{props.fileURL && !props.isLoading && (
				<div className="App-header">
					<Div className="firstColumn">
						<PlayerC thumbnailURL={props.singleResult.links[0].href} fileURL={props.fileURL} />
						<Share fileURL={props.fileURL} />
					</Div>
					<Div className="secondColumn">
						<FilePath
							title={props.singleResult.data[0].title}
							fileURL={props.fileURL}
							fileSize={props.fileSize}
							fileFormat={props.singleResult.data[0].media_type}
						/>
						<FileInfo
							nasaID={props.nasaID}
							fileURL={props.fileURL}
							keywords={props.singleResult.data[0].keywords}
							center={props.singleResult.data[0].center}
							date={props.singleResult.data[0].date_created}
							centerURL={props.centerURL}
							explanation={props.singleResult.data[0].description}
						/>
					</Div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		error: state.error,
		singleResult: state.singleResult
	};
};

export default connect(mapStateToProps, { fetchActivity })(Single);
