import React from 'react';
// import styled from 'styled-components';
import SearchResult from '../singles/SearchResult';
import RowNewestPopular from '../singles/RowNewestPopular.js';
import Single from '../containers/Single';
import SearchResults from '../containers/SearchResults';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchActivity, fetchSearchResults } from '../../actions';

const row = {
	display: 'flex',
	flex: '1',
	flexWrap: 'wrap',
	flexDirection: 'row',
	flexBasis: '19%',
	padding: '0%',
	margin: '0%'
};

class Sorted extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfColumns: 1
		};
	}

	/*
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
const ALink = styled.a`
	color: white;
	text-decoration: none;
`;
https://images-assets.nasa.gov/recent.json
https://images-assets.nasa.gov/video/Apollo%2011%20Overview/collection.json
https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=video
https://images.nasa.gov/

*/
	/*	
	componentDidUpdate() {
		if (
			this.props.currentLoad !== [] ||
			this.props.currentLoad !== 'undefined' ||
			this.props.currentLoad !== null
		) {
			let resultContainer = document.getElementById('wrapperNewest');
			resultContainer.textContent = '';
			let rowDiv;
			let columnDiv;
			let imgDiv;
			let shortDescriptionDiv;
			let shortDescription;
			let searchDescription;
			let detailsURL;
			let detailsLinkDiv;
			rowDiv = document.createElement('div');
			rowDiv.className = 'row';
			resultContainer.appendChild(rowDiv);
			let y = 1;
			console.log('current results DidUpdate = ' + this.props.currentResults);
			console.log('current load DidUpdate = ' + this.props.currentLoad);
			this.props.currentLoad.map(newResult => {
				console.log('thumbnail link = ' + newResult.links[0].href);
				detailsURL = '/details-' + newResult.data[0].nasa_id;
				console.log('nasa id = ' + newResult.data[0].nasa_id);
				console.log('nasa description = ' + newResult.data[0].description_508);
				searchDescription = newResult.data[0].description_508;
				if (searchDescription === undefined) {
					searchDescription = newResult.data[0].description;
				}
				if (searchDescription === 'undefined') {
					searchDescription = '';
				}
				if (searchDescription.length > 50) {
					shortDescription = searchDescription.substring(0, 50) + '...';
				} else {
					shortDescription = searchDescription + '...';
				}
				if (y <= 5) {
					columnDiv = document.createElement('div');
					columnDiv.className = 'column';
					columnDiv.id = 'column' + y;
					rowDiv.appendChild(columnDiv);
					detailsLinkDiv = columnDiv.appendChild(document.createElement('a'));
					detailsLinkDiv.href = detailsURL;
					detailsLinkDiv.style.color = 'white';
					detailsLinkDiv.style.textDecoration = 'none';
					imgDiv = detailsLinkDiv.appendChild(document.createElement('img'));
					imgDiv.src = newResult.links[0].href;
					shortDescriptionDiv = detailsLinkDiv.appendChild(document.createElement('div'));
					shortDescriptionDiv.textContent = shortDescription;
					shortDescriptionDiv.style.fontSize = '1rem';
					y += 1;
				}
				if (y === 6) {
					y = 1;
					resultContainer = document.getElementById('wrapperNewest');
					rowDiv = document.createElement('div');
					rowDiv.className = 'row';
					resultContainer.appendChild(rowDiv);
					columnDiv = document.createElement('div');
					columnDiv.className = 'column';
					columnDiv.id = 'column' + y;
					rowDiv.appendChild(columnDiv);
					detailsLinkDiv = columnDiv.appendChild(document.createElement('a'));
					detailsLinkDiv.style.color = 'white';
					detailsLinkDiv.style.textDecoration = 'none';
					detailsLinkDiv.href = detailsURL;
					imgDiv = detailsLinkDiv.appendChild(document.createElement('img'));
					imgDiv.src = newResult.links[0].href;
					shortDescriptionDiv = detailsLinkDiv.appendChild(document.createElement('div'));
					shortDescription = newResult.data[0].description;
					shortDescription = shortDescription.substring(0, 50);
					shortDescriptionDiv.textContent = shortDescription;
					shortDescriptionDiv.style.fontSize = '1rem';
					y += 1;
				}
				console.log('y = ' + y);
			});
		}
	}
*/
	// mapped to display below
	// response.data.collection.items[x].data.links[0].href = link to preview image

	render() {
		console.log('currentLoad in SearchResult = ' + JSON.stringify(this.props.currentLoad));
		if (
			this.props.currentLoad !== [] &&
			this.props.currentLoad !== 'undefined' &&
			this.props.currentLoad !== null
		) {
			return (
				<div>
					<Switch>
						<Route exact path="/">
							<div className="row" style={row}>
								{this.props.currentLoad.map(newResult => (
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
										searchResults={this.props.searchResults}
										fetchSearchResults={this.props.fetchSearchResults}
										searchNASALibrary={this.props.searchNASALibrary}
									/>
								))}
							</div>
						</Route>
						<Route path="/details/:nasaID">
							<Single
								nasaID={this.props.nasaID}
								singleResult={this.props.singleResult}
								mediaType={this.props.mediaType}
								getSingleResult={this.props.getSingleResult}
							/>
						</Route>
						<Route path="/search">
							<SearchResults
								searchResults={this.props.searchResults}
								fetchSearchResults={this.props.fetchSearchResults}
								searchNASALibrary={this.props.searchNASALibrary}
								currentLoad={this.props.currentLoad}
							/>
						</Route>
					</Switch>
				</div>
			);
		} else if (this.props.searchResults !== '') {
			return (
				<div>
					<Route path="/search">
						<SearchResults
							searchResults={this.props.searchResults}
							fetchSearchResults={this.props.fetchSearchResults}
							searchNASALibrary={this.props.searchNASALibrary}
						/>
					</Route>
				</div>
			);
		}
		return <p>This is loading.</p>;
	}
}

// infinite loop if you pass into fetchActivity  ([newResult.data[0].nasa_id,newResult.data[0].mediaType])

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		error: state.error,
		singleResult: state.singleResult,
		currentLoad: state.currentLoad,
		results: state.results,
		nasaID: state.nasaID,
		searchResults: state.searchResults,
		mediaType: state.mediaType,
		areSearchResults: state.areSearchResults
	};
};

export default connect(mapStateToProps, { fetchActivity, fetchSearchResults })(Sorted);
