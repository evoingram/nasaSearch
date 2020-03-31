import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import RowNewestPopular from '../singles/RowNewestPopular.js';

const Button = styled.button`
	margin-top: 2%;
	margin-bottom: 2%;
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	border: none;
	padding-top: 20px;
	padding-bottom: 20px;
`;
const row = {
	display: 'flex',
	flex: '1',
	flexWrap: 'wrap',
	flexDirection: 'row',
	flexBasis: '19%',
	padding: '0%',
	margin: '0%'
};
class SearchResults extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfColumns: 1
		};
	}

	componentDidMount = () => {
		this.props.searchNASALibrary(this.props.mediaFormats, this.props.searchTerm, this.props.page);
	};

	toggleView = () => {
		let toggleButton = document.getElementById('searchView');
		if (toggleButton.textContent === 'Click for List View') {
			// display list view
		} else {
			// display default view
		}
	};

	render() {
		console.log('currentLoad in SearchResults = ' + JSON.stringify(this.props.searchResults));
		if (
			this.props.searchResults !== [] &&
			this.props.searchResults !== 'undefined' &&
			this.props.searchResults !== null &&
			this.props.searchResults !== ''
		) {
			return (
				<div className="App">
					<Link to="/search">
						<Button id="searchView" onClick={this.toggleView}>
							Click for List View
						</Button>
					</Link>
					<div className="row" style={row}>
						{this.props.searchResults.map(newResult => (
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
							/>
						))}
					</div>
				</div>
			);
		}
	}
}

export default SearchResults;
