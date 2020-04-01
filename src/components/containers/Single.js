import React from 'react';
import styled from 'styled-components';
import PlayerC from '../singles/Player.js';
import Share from '../singles/Share.js';
import FilePath from '../singles/FilePath.js';
import FileInfo from '../singles/FileInfo.js';
import Explanation from '../singles/Explanation.js';
import { connect } from 'react-redux';
import { fetchActivity } from '../../actions';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import axios from 'axios';

const Div = styled.div`
	width: 50%;
	margin: 0%;
	padding: 0%;
`;

const firstColumn = {
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'row',
	maxWidth: '60%',
	padding: '3%',
	margin: '0%',
	marginTop: '5%',
	width: '60%'
};
const secondColumn = {
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'row',
	maxWidth: '30%',
	padding: '3%',
	margin: '0%',
	width: '30%'
};
const container = {
	display: 'flex',
	flexWrap: 'nowrap',
	flexDirection: 'row',
	flex: '1',
	width: '100%',
	overflow: 'hidden'
};
const DivChildren = styled.div`
	width: 100%;
`;

class Single extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.getSingleResult();
	}
	render() {
		return (
			this.props.nasaID !== '' &&
			this.props.mediaType !== '' && (
				<div style={container}>
					{!this.props.singleResult && !this.props.isLoading && <p>Loading...</p>}
					{this.props.singleResult && !this.props.isLoading && (
						<div>
							<div style={container}>
								<Div className="firstColumn" style={firstColumn}>
									<PlayerC
										thumbnailURL={this.props.singleResult.links[0].href}
										fileURL={this.props.fileURL}
										mediaType={this.props.mediaType}
										captionsURL={this.props.captionsURL}
									/>
									<Share fileURL={this.props.fileURL} width="100%" />
								</Div>
								<Div className="secondColumn" style={secondColumn}>
									<DivChildren>
										<FilePath
											nasaID={this.props.singleResult.data[0].nasa_id}
											title={this.props.singleResult.data[0].title}
											fileURL={this.props.fileURL}
											fileSize={this.props.fileSize}
											fileFormat={this.props.singleResult.data[0].media_type}
										/>
									</DivChildren>
									<DivChildren>
										<FileInfo
											nasaID={this.props.singleResult.data[0].nasa_id}
											fileURL={this.props.fileURL}
											keywords={this.props.singleResult.data[0].keywords}
											center={this.props.singleResult.data[0].center}
											dateCreated={this.props.singleResult.data[0].date_created.substring(0, 10)}
											centerURL={this.props.centerURL}
											explanation={this.props.singleResult.data[0].description}
										/>
									</DivChildren>
								</Div>
							</div>
							<Explanation explanation={this.props.singleResult.data[0].description} />
						</div>
					)}
				</div>
			)
		);
	}
}
const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		error: state.error,
		singleResult: state.singleResult,
		nasaID: state.nasaID,
		mediaType: state.mediaType,
		fileSize: state.fileSize,
		fileURL: state.fileURL
	};
};

export default connect(mapStateToProps, { fetchActivity })(Single);

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
