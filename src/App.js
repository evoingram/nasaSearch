import React from 'react';
import './css/App.css';
import './css/index.css';
import './css/magic.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import APOD from './components/singles/APOD.js';
import PlayerC from './components/singles/Player.js';
import axios from 'axios';
import './css/video-react.css';

class App extends React.Component {
	constructor() {
		super();
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
			audiocb: true
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
		console.log(randomDate);
		console.log(
			'https://api.nasa.gov/planetary/apod?date=' + randomDate + '&api_key=' + process.env.REACT_APP_API_KEY
		);
		axios
			.get('https://api.nasa.gov/planetary/apod?date=' + randomDate + '&api_key=' + process.env.REACT_APP_API_KEY)
			.then(response => {
				this.setState({ imgURL: response.data.hdurl });
				this.setState({ copyright: response.data.copyright });
				this.setState({ date: response.data.date });
				this.setState({ explanation: response.data.explanation });
				let fileInfo = new Blob([response.data.hdurl], { type: 'video/mp4' });
				this.getFileSize(response.data.hdurl);
				this.setState({ fileSize: fileInfo.size });
				this.setState({ fileFormat: fileInfo.type });
				console.log(fileInfo.size);
				console.log(fileInfo.type);
				console.log('done contacting NASA apod');
			})
			.catch(error => {
				console.log(error);
			});
	};

	changeSearchTerm = event => {
		console.log('search term being set');
		this.setState({ searchTerm: event.target.value });
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
		console.log('https://images-api.nasa.gov/search' + '?q=' + this.state.searchTerm + '&media=' + mediaFormats);
		axios
			.get('https://images-api.nasa.gov/search' + '?q=' + this.state.searchTerm + '&media_type=' + mediaFormats)
			.then(response => {
				this.setState({ searchResults: response.data });
				console.log(this.state.searchResults);
				console.log('done contacting NASA images library');
			})
			.catch(error => {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="App">
				<Header searchNASALibrary={this.searchNASALibrary} changeSearchTerm={this.changeSearchTerm} />
				<header className="App-header">
					<PlayerC fileURL={this.state.fileURL} />
					<p>search containers will go here.</p>
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
