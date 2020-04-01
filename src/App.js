import React from 'react';
import './css/App.css';
import './css/index.css';
import './css/magic.css';
import './css/video-react.css';
import './css/tiledSearchResults.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Sorted from './components/containers/Sorted.js';
// import APOD from './components/singles/APOD.js';
// import PlayerC from './components/singles/Player.js';
import SearchResult from './components/singles/SearchResult';
import SearchResults from './components/containers/SearchResults';
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
`;

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
		let fileInfo = new Blob([url], { type: 'video/mp4' });
		this.setState({ fileSize: fileInfo.size });
		console.log(fileInfo.size);
	};
	nextPage = () => {
		console.log('next page running');
		console.log('next page running before =' + this.props.page);
		let newPage = this.props.page + 1;
		console.log('next newPage running before =' + newPage);
		if (this.props.page > 3) {
			this.props.turnPage(1);
		} else {
			this.props.turnPage(newPage);
		}
		console.log('next this.props.page running after =' + this.props.page);
		this.searchNASALibrary();
	};
	previousPage = () => {
		console.log('previous page running');
		console.log('previous page running before =' + this.props.page);
		if (this.props.page >= 2) {
			let newPage = this.props.page - 1;
			console.log('previous newPage running before =' + newPage);
			this.props.turnPage(newPage);
			console.log('previous this.props.page running after =' + this.props.page);
		} else {
			this.props.turnPage(4);
		}
		this.searchNASALibrary();
	};

	changeSearchTerm = event => {
		console.log('search term being set');
		this.setState({ searchTerm: event.target.value });
	};

	toggleMediaFormatBoolean = () => {
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
			console.log(`image checked: ${imageCBElement.checked}`);
			if (mediaFormats.slice(-1) === ',') {
				mediaFormats.substring(0, mediaFormats.length - 1);
			}
			console.log(`searchTerm: ${this.state.searchTerm}`);
			console.log(`toggleMediaFormatBoolean page: ${this.props.page}`);
			console.log(`local mediaFormats: ${mediaFormats}`);
			this.setState({ mediaFormats: mediaFormats });
			console.log(`mediaFormats: ${this.state.mediaFormats}`);
		}
	};
	searchNASALibrary = event => {
		console.log('running searchNASALibrary');
		console.log('searchNASALibrary page running =' + this.props.page);
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
				console.log(`searchNASALibrary page running: ${this.props.page}`);
				this.setState({ mediaFormats: mediaFormats });
			}
			this.props.fetchSearchResults(mediaFormats, this.state.searchTerm, this.props.page, this.props.yearRange);
			this.setState({ areSearchResults: true });
		}
	};

	getNewestNASALibrary = () => {
		console.log('running newestNASALibrary');
		axios
			.get(this.state.newestURL)
			.then(response => {
				console.log(response);
				this.setState({ newestResults: response.data.collection.items });
			})
			.catch(error => {
				console.log(error);
			});
	};
	getPopularNASALibrary = () => {
		console.log('running popularNASALibrary');
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
		let toggleButton = document.getElementById('MostRecentPopular');
		if (this.state.currentResults === true) {
			//newest results
			toggleButton.textContent = 'Click to See Most Popular';
			this.props.fetchNewest();
			this.setState({ currentResults: false });
			// this.setState({ currentLoad: this.state.newestResults });
		} else {
			//most popular results
			toggleButton.textContent = 'Click to See Most Recent';
			this.props.fetchPopular();
			this.setState({ currentResults: true });
			// this.setState({ currentLoad: this.state.popularResults });
		}
		console.log('current results boolean = ' + this.state.currentResults);
		return (
			<Route exact path="/">
				<SearchResult currentLoad={this.props.currentLoad} />
			</Route>
		);
	};

	toggleView = () => {
		console.log('toggleView running');
		console.log('listView at beginning of toggleView toggleListView action = ' + this.props.listView);
		let toggleButton = document.getElementById('searchView');
		if (this.props.listView === true) {
			// display default view
			if (toggleButton) {
				toggleButton.textContent = 'Click for List View';
				console.log('toggleButton text content = ' + toggleButton.textContent);
			}
		} else {
			// display list view
			if (toggleButton) {
				toggleButton.textContent = 'Click for Grid View';
				console.log('toggleButton text content = ' + toggleButton.textContent);
			}
		}
		this.props.toggleListView(this.props.listView);
		// this.setState({ listView: !this.props.listView });

		console.log('listView at end of toggleView toggleListView action = ' + this.state.listView);
	};

	getSingleResult() {
		console.log('shorthand running single detail axios get');
		axios
			.get(`https://images-api.nasa.gov/search?q=${this.nasaID}`)
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
				console.log('captions URL = ' + response.location);
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

/*

		var minYear = 2000;
		var maxYear = 2019;
		var randomYear = minYear + Math.round(Math.random() * (maxYear - minYear));
		var minMonth = 1;
		var maxMonth = 12;
		var randomMonth = minMonth + Math.round(Math.random() * (maxMonth - minMonth));
		var minDay = 1;
		var maxDay = 28;
		var randomDay = minDay + Math.round(Math.random() * (maxDay - minDay));
		var randomDate = randomYear + '-' + randomMonth + '-' + randomDay;

					<APOD
						imgURL={this.state.imgURL}
						copyright={this.state.copyright}
						date={this.state.date}
						explanation={this.state.explanation}
					/>
*/
