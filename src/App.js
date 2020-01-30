import React from 'react';
import './css/App.css';
import './css/index.css';
import './css/magic.css';
import './css/video-react.css';
import './css/tiledSearchResults.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Sorted from './components/containers/Sorted.js';
import APOD from './components/singles/APOD.js';
import PlayerC from './components/singles/Player.js';
import axios from 'axios';
import styled from 'styled-components';

const Button = styled.button`
	margin-top: 2%;
	margin-bottom: 2%;
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	border: none;
	padding-top: 2%;
	padding-bottom: 2%;
`;
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			searchResults: [],
			searchTerm: '',
			title: '',
			imgURL: '',
			copyright: '',
			date: '',
			explanation: '',
			fileURL: 'http://images-assets.nasa.gov/video/Apollo%2011%20Overview/Apollo%2011%20Overview~preview.mp4',
			nasaID: '',
			fileSize: '',
			fileFormat: '',
			captionsFileURL: '',
			center: '',
			centerURL: '',
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
			results: [],
			keywords: [],
			secondaryC: '',
			thumbnailURL: ''
		};
	}

	getFileSize = url => {
		let fileInfo = new Blob([url], { type: 'video/mp4' });
		this.setState({ fileSize: fileInfo.size });
		console.log(fileInfo.size);
	};

	componentDidMount = () => {
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
		this.getNewestNASALibrary();
		this.getPopularNASALibrary();
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
		axios
			.get(this.state.newestURL)
			.then(response => {
				this.setState({ newestResults: response.data.collection.items });
				console.log('newest results = ' + this.state.newestResults);
				// thumbnail link = response.data.collection.items[x].data.links[0].href;
				this.setState({ results: this.state.newestResults });
				console.log('results = ' + this.state.results);
				console.log('done getting newest NASA images');
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
				console.log('done getting popular NASA images');
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
			this.setState({ currentResults: false });
			this.setState({ currentLoad: this.state.newestResults });
		} else {
			//most popular results
			toggleButton.textContent = 'Click to See Most Recent';
			this.setState({ currentResults: true });
			this.setState({ currentLoad: this.state.popularResults });
		}
		console.log('current results boolean = ' + this.state.currentResults);
	};
	/*

	newestResults={this.state.newestResults}
	popularResults={this.state.popularResults}

*/
	render() {
		return (
			<div className="App">
				<Header searchNASALibrary={this.searchNASALibrary} changeSearchTerm={this.changeSearchTerm} />
				<header className="App-header">
					<Button id="MostRecentPopular" onClick={this.toggleResults}>
						Click to See Newest Images
					</Button>
					<div className="wrapperNewest" id="wrapperNewest">
						<Sorted currentLoad={this.state.currentLoad} currentResults={this.state.currentResults} />
					</div>
					<APOD
						imgURL={this.state.imgURL}
						copyright={this.state.copyright}
						date={this.state.date}
						explanation={this.state.explanation}
					/>
				</header>
				<Footer />
			</div>
		);
	}
}

export default App;
