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
			fileURL: 'http://images-assets.nasa.gov/video/Apollo 11 Overview/Apollo 11 Overview~preview.mp4',
			nasaID: '',
			fileSize: '',
			fileFormat: '',
			center: ''
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
				console.log('done contacting NASA');
			})
			.catch(error => {
				console.log(error);
			});
	};

	changeSearchTerm = () => {};

	render() {
		return (
			<div className="App">
				<Header />
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
