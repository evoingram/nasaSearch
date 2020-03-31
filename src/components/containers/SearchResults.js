import React from 'react';

class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	toggleResults = () => {
		let toggleButton = document.getElementById('searchView');
		if (toggleButton.textContent === 'Click for List View') {
			// display list view
		} else {
			// display default view
		}
	};
	render() {
		return (
			this.props.searchResults && (
				<Link to="/search">
					<Button id="searchView" onClick={this.toggleView}>
						Click to See ListView
					</Button>
				</Link>
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
			) &&
			this.props.searchResults.map(newResult => (
				<RowNewestPopular
					key={newResult.data[0].nasa_id}
					className="row"
					newResult={newResult}
					numberOfColumns={this.state.numberOfColumns}
					nasaID={newResult.data[0].nasa_id}
					imgURL={newResult.links[0].href}
					mediaType={newResult.data[0].mediaType}
					explanation={
						(newResult.data[0].description
							? newResult.data[0].description.substring(0, 50)
							: newResult.data[0].description_508.substring(0, 50)) + '...'
					}
					fetchActivity={this.props.fetchActivity}
				/>
			))
		);
	}
}

export default SearchResults;
