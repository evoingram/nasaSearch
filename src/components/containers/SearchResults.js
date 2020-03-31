import React from 'react';

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			this.props.searchResults && (
				<div className="App">
					<header className="App-header">
						<p>
							Edit <code>src/App.js</code> and save to reload.
						</p>
						<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
							Learn React
						</a>
					</header>
				</div>
			)
		);
	}
}

export default SearchResults;
