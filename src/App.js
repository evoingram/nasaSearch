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
import axios from 'axios';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import { fetchActivity, fetchNewest, fetchPopular } from './actions';
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
`;
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			searchResults: [],
			searchTerm: '',
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
		};
		/*
			title: '',
			imgURL: '',
			copyright: '',
			date: '',
			explanation: '',
			fileURL: '',
			nasaID: '',
			fileSize: '',
			fileFormat: '',
			captionsFileURL: '',
			center: '',
			centerURL: '',
			keywords: [],
			secondaryC: '',
			mediaType: '',
			thumbnailURL: '',
			isLoading: false


		*/
	}

	getFileSize = url => {
		let fileInfo = new Blob([url], { type: 'video/mp4' });
		this.setState({ fileSize: fileInfo.size });
		console.log(fileInfo.size);
	};

	componentDidMount = () => {
		this.getPopularNASALibrary();
		this.getNewestNASALibrary();
	};
	componentDidUpdate = () => {};
	/*

				let fileInfo = new Blob([response.data.hdurl]);
				this.getFileSize(response.data.hdurl);
				this.setState({ fileSize: fileInfo.size });
				this.setState({ fileFormat: fileInfo.type });


*/
	changeSearchTerm = event => {
		console.log('search term being set');
		this.setState({ searchTerm: event.target.value });
		/*

			useEffect(() => {
				if (props.tickets !== null) {
				const results = props.tickets.filter(ticket =>
					ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					ticket.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
					ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
					ticket.category.toLowerCase().includes(searchTerm.toLowerCase())  ||
					ticket.date.toLowerCase().includes(searchTerm.toLowerCase()) 
				);
				console.log("useEffect Search Results = " + results);
				setSearchResults([...results]);
				}
			}, [searchTerm, props.tickets]);
		*/
	};

	toggleMediaFormatBoolean = () => {
		let videoCBElement = document.getElementById('videocb');
		let audioCBElement = document.getElementById('audiocb');
		let imageCBElement = document.getElementById('imagecb');
		if (!videoCBElement.checked) {
			this.setState({ videocb: false });
		}
		if (!audioCBElement.checked) {
			this.setState({ audiocb: false });
		}
		if (!imageCBElement.checked) {
			this.setState({ imagecb: false });
		}
	};

	searchNASALibrary = event => {
		event.preventDefault();
		this.toggleMediaFormatBoolean();
		console.log(this.state.searchTerm);
		let mediaFormats = '';
		if (this.state.imagecb === true) {
			mediaFormats += 'image,';
		}
		if (this.state.videocb === true) {
			mediaFormats += 'video,';
		}
		if (this.state.audiocb === true) {
			mediaFormats += 'audio';
		}
		if (mediaFormats.slice(-1) === ',') {
			mediaFormats.substring(0, mediaFormats.length - 1);
		}
		console.log(
			'https://images-api.nasa.gov/search' +
				'?q=' +
				this.state.searchTerm +
				'&page=' +
				this.state.page +
				'&media=' +
				mediaFormats
		);
		axios
			.get(
				'https://images-api.nasa.gov/search' +
					'?q=' +
					this.state.searchTerm +
					'&page=' +
					this.state.page +
					'&media_type=' +
					mediaFormats
			)
			.then(response => {
				this.setState({ searchResults: response.data.collection.items });
				console.log(this.state.searchResults);
				this.setState({ nasaID: response.data.collection.items[0].data[0].nasa_id });
				console.log('nasa id = ' + this.state.nasaID);
				console.log('done contacting NASA images library');
			})
			.catch(error => {
				console.log(error);
			});
	};

	getNewestNASALibrary = () => {
		console.log('running newestNASALibrary');
		console.log(this.state.newestURL);
		axios
			.get(this.state.newestURL)
			.then(response => {
				console.log(response);
				this.setState({ newestResults: response.data.collection.items });
				console.log('newest results = ' + this.state.newestResults);
				// thumbnail link = response.data.collection.items[x].data.links[0].href;
				// this.setState({ results: this.state.newestResults });
				// console.log('results = ' + this.state.results);
				console.log('done getting newest NASA images app function');
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
				// thumbnail link = response.data.collection.items[x].data.links[0].href;
				console.log('popular results = ' + this.state.popularResults);
				console.log('done getting popular NASA images app function');
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

	getSingleResult() {
		console.log('running single detail axios get');
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
				console.log('done getting single Q NASA details');
			})
			.catch(error => {
				console.log(error);
			});
		// https://images-assets.nasa.gov/image/as11-40-5874/collection.json
		axios
			.get(`https://images-assets.nasa.gov/image/${this.nasaID}/collection.json`)
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
			.get(`https://images-assets.nasa.gov/image/${this.nasaID}/metadata.json`)
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
				<Header searchNASALibrary={this.searchNASALibrary} changeSearchTerm={this.changeSearchTerm} />
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
							/>
						)}
					</div>
				</header>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		error: state.error,
		currentLoad: state.currentLoad
	};
};

export default connect(mapStateToProps, { fetchActivity, fetchNewest, fetchPopular })(App);

/*


		prisonList: state.prisonList,
		error: state.error,
    prisonerList: state.prisonerList,
      allPrisonLocations: state.allPrisonLocations,
		allPrisonerList: state.allPrisonerList,
	finalList: state.finalList
	




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

		axios
			.get('https://api.nasa.gov/planetary/apod?date=' + randomDate + '&api_key=' + process.env.REACT_APP_API_KEY)
			.then(response => {
				this.setState({ imgURL: response.data.hdurl });
				this.setState({ copyright: response.data.copyright });
				this.setState({ date: response.data.date });
				this.setState({ explanation: response.data.explanation });
				console.log('done contacting NASA apod');
			})
			.catch(error => {
				console.log(error);
			});
		*/
/*

	newestResults={this.state.newestResults}
	popularResults={this.state.popularResults}

					<APOD
						imgURL={this.state.imgURL}
						copyright={this.state.copyright}
						date={this.state.date}
						explanation={this.state.explanation}
					/>
*/
