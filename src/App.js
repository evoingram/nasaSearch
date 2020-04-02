import React from 'react';
import './css/App.css';
import './css/magic.css';
import './css/video-react.css';
import './css/tiledSearchResults.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Sorted from './components/containers/Sorted.js';
import SearchResult from './components/singles/SearchResult';
import axios from 'axios';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import {
	fetchActivity,
	fetchNewest,
	fetchPopular,
	fetchSearchResults,
	toggleListView,
	adjustYearRange,
	turnPage
} from './actions';
import { connect } from 'react-redux';

// button styling
const Button = styled.button`
	margin-top: 2%;
	margin-bottom: 2%;
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	border: none;
	padding-top: 6%;
	padding-bottom: 6%;
	font-size: 1.5rem;
	&:hover {
		background-color: #0e3579;
	}
`;

// applies height restraint to footer
const footerWidth = {
	maxHeight: '50px'
};
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			searchResults: [],
			areSearchResults: false,
			listView: false,
			dateCreated: '',
			center: 'none',
			centerLink: 'centerLink Test',
			searchTerm: '',
			mediaFormats: '',
			yearRange: [1920, 2020],
			imagecb: false,
			videocb: false,
			audiocb: false,
			newestURL: 'https://images-assets.nasa.gov/recent.json',
			newestResults: [],
			popularURL: 'https://images-assets.nasa.gov/popular.json',
			popularResults: [],
			currentResults: true,
			currentLoad: [],
			results: []
		};
	}

	componentDidMount = () => {
		this.getPopularNASALibrary();
		this.getNewestNASALibrary();
	};

	componentDidUpdate = () => {};

	getFileSize = url => {
		// gets file size
		// called on by
		let fileInfo = new Blob([url], { type: 'video/mp4' });
		this.setState({ fileSize: fileInfo.size });
	};
	nextPage = () => {
		// turns to next page, cycles through page 1-3
		// called on by Sorted.js
		let newPage = this.props.page + 1;
		if (this.props.page > 3) {
			this.props.turnPage(1);
		} else {
			this.props.turnPage(newPage);
		}
		this.searchNASALibrary();
	};
	previousPage = () => {
		// turns to previous page, cycles through page 1-3
		// called on by Sorted.js
		if (this.props.page >= 2) {
			let newPage = this.props.page - 1;
			this.props.turnPage(newPage);
		} else {
			this.props.turnPage(4);
		}
		this.searchNASALibrary();
	};

	changeSearchTerm = event => {
		// updates search term as user types it in
		// called on by
		this.setState({ searchTerm: event.target.value });
	};

	searchNASALibrary = event => {
		// uses user search input to search nasa library
		// called on by SearchResults.js
		if (this.state.searchTerm !== '' && this.state.searchTerm !== 'undefined' && this.state.searchTerm !== null) {
			let videoCBElement = document.getElementById('videocb');
			let audioCBElement = document.getElementById('audiocb');
			let imageCBElement = document.getElementById('imagecb');

			let mediaFormats = '';
			if (document.getElementById('videocb')) {
				if (videoCBElement.checked === true) {
					this.setState({ videocb: true });
					mediaFormats += 'video,';
				}
				if (imageCBElement.checked === true) {
					this.setState({ imagecb: true });
					mediaFormats += 'image,';
				}
				if (audioCBElement.checked === true) {
					this.setState({ audiocb: true });
					mediaFormats += 'audio';
				}
				if (mediaFormats.slice(-1) === ',') {
					mediaFormats.substring(0, mediaFormats.length - 1);
				}
				this.setState({ mediaFormats: mediaFormats });
			}
			this.props.fetchSearchResults(mediaFormats, this.state.searchTerm, this.props.page, this.props.yearRange);
			this.setState({ areSearchResults: true });
		}
	};

	getNewestNASALibrary = () => {
		// retrieves 'newest' results from nasa
		// called on by app.js
		axios
			.get(this.state.newestURL)
			.then(response => {
				this.setState({ newestResults: response.data.collection.items });
			})
			.catch(error => {
				console.log(error);
			});
	};
	getPopularNASALibrary = () => {
		// retrieves 'most popular' results from nasa
		// called on by app.js
		axios
			.get(this.state.popularURL)
			.then(response => {
				this.setState({ popularResults: response.data.collection.items });
			})
			.catch(error => {
				console.log(error);
			});
	};
	toggleResults = () => {
		// toggles newest/most popular
		// called on by sorted.js
		let toggleButton = document.getElementById('MostRecentPopular');
		if (this.state.currentResults === true) {
			//newest results
			toggleButton.textContent = 'Click to See Most Popular';
			this.props.fetchNewest();
			this.setState({ currentResults: false });
		} else {
			//most popular results
			toggleButton.textContent = 'Click to See Most Recent';
			this.props.fetchPopular();
			this.setState({ currentResults: true });
		}
		return (
			<Route exact path="/">
				<SearchResult currentLoad={this.props.currentLoad} />
			</Route>
		);
	};

	toggleView = () => {
		// toggles list/grid views
		// called on by Sorted.js
		let toggleButton = document.getElementById('searchView');
		if (this.props.listView === true) {
			// display default view
			if (toggleButton) {
				toggleButton.textContent = 'Click for List View';
			}
		} else {
			// display list view
			if (toggleButton) {
				toggleButton.textContent = 'Click for Grid View';
			}
		}
		this.props.toggleListView(this.props.listView);
	};

	getSingleResult() {
		// gets details of single nasa id
		// called on by Single.js
		axios
			.get(`https://images-api.nasa.gov/search?q=${this.nasaID}`)
			.then(response => {
				this.setState({
					title: response.data.collection.items[0].data[0].title,
					date: response.data.collection.items[0].data[0].date_created,
					explanation: response.data.collection.items[0].data[0].description,
					center: response.data.collection.items[0].data[0].center,
					keywords: response.data.collection.items[0].data[0].keywords,
					mediaType: response.data.collection.items[0].data[0].media_type,
					thumbnailURL: response.data.collection.items[0].links[0].href
				});
			})
			.catch(error => {
				console.log(error);
			});
		// https://images-assets.nasa.gov/image/as11-40-5874/collection.json
		axios
			.get(`https://images-assets.nasa.gov/image/${this.nasaID}/collection.json`)
			.then(response => {
				this.setState({
					fileURL: response.data[0]
				});
			})
			.catch(error => {
				console.log(error);
			});

		//https://images-assets.nasa.gov/image/as11-40-5874/metadata.json
		axios
			.get(`https://images-assets.nasa.gov/image/${this.nasaID}/metadata.json`)
			.then(response => {
				let fileFormat = response.data['File:MIMEType'];
				let fileFormatString = toString(fileFormat).substring(0, 5);
				this.setState({
					fileSize: response.data['File:FileSize'],
					fileFormat: fileFormatString
				});
			})
			.catch(error => {
				console.log(error);
			});
		// captionsURL: response.data.collection.items[0].data[0].location
		axios
			.get(`https://images-api.nasa.gov/captions/${this.nasaID}`)
			.then(response => {
				this.setState({
					captionsURL: response.location
				});
			})
			.catch(error => {
				console.log(error);
			});
	}
	render() {
		return (
			<div className="App">
				<Header
					searchNASALibrary={this.searchNASALibrary}
					changeSearchTerm={this.changeSearchTerm}
					yearRange={this.state.yearRange}
					adjustYearRange={this.adjustYearRange}
				/>
				<header className="App-header">
					<Link to="/">
						<Button id="MostRecentPopular" onClick={this.toggleResults}>
							Click to See Newest Images
						</Button>
					</Link>
					<div className="wrapperNewest" id="wrapperNewest">
						{!this.props.currentLoad && this.props.isLoading && <p>Loading...</p>}
						{this.props.currentLoad && !this.props.isLoading && (
							<Sorted
								currentLoad={this.props.currentLoad}
								getSingleResult={this.getSingleResult}
								fetchActivity={this.props.fetchActivity}
								saveNIDMT={this.saveNIDMT}
								searchResults={this.props.searchResults}
								searchNASALibrary={this.searchNASALibrary}
								listView={this.state.listView}
								toggleView={this.toggleView}
								dateCreated={this.state.dateCreated}
								centerLink={this.state.centerLink}
								yearRange={this.state.yearRange}
								adjustYearRange={this.adjustYearRange}
								nextPage={this.nextPage}
								previousPage={this.previousPage}
							/>
						)}
					</div>
				</header>
				<Footer style={footerWidth} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		error: state.error,
		currentLoad: state.currentLoad,
		imagecb: state.imagecb,
		videocb: state.videocb,
		center: state.center,
		audiocb: state.audiocb,
		yearRange: state.yearRange,
		centerLink: state.centerLink,
		dateCreated: state.dateCreated,
		listView: state.listView,
		mediaFormats: state.mediaFormats,
		searchResults: state.searchResults,
		areSearchResults: state.areSearchResults,
		page: state.page
	};
};

export default connect(mapStateToProps, {
	fetchActivity,
	fetchNewest,
	fetchPopular,
	fetchSearchResults,
	toggleListView,
	adjustYearRange,
	turnPage
})(App);
