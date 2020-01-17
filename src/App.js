import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.css';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			searchTerm: ''
		};
	}

	changeSearchTerm = () => {};

	render() {
		return (
			<div className="App">
				<Header />
				<header className="App-header">
					<p>search containers will go here.</p>
				</header>
				<Footer />
			</div>
		);
	}
}

export default App;
