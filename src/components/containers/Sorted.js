import React from 'react';
// import styled from 'styled-components';
import SearchResult from '../singles/SearchResult';
import RowNewestPopular from '../singles/RowNewestPopular.js';
import FilterSearchResults from '../singles/FilterSearchResults.js';
import Single from '../containers/Single';
import SearchResults from '../containers/SearchResults';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchActivity, fetchSearchResults, toggleListView, adjustYearRange, turnPage } from '../../actions';
import styled from 'styled-components';
const row = {
	display: 'flex',
	flex: '1',
	flexWrap: 'wrap',
	flexDirection: 'row',
	flexBasis: '19%',
	padding: '0%',
	margin: '0%'
};

const Button = styled.button`
	margin: 0%;
	margin-top: 2%;
	margin-bottom: 2%;
	margin-right: 2%;
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	padding-top: 20px;
	padding-bottom: 20px;
	font-size: 1.5rem;
	border: 0;
`;
const ButtonPage = styled.button`
	background-color: #15418c;
	margin: 0%;
	padding: 0;
	border: 0;
	height: 0;
	display: 'none';
`;
class Sorted extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfColumns: 1,
			yearRangeLocal: [1920, 2020]
		};
	}

	componentDidMount = () => {
		this.props.toggleView();
		/*
		if (document.getElementById('previousPageButton') !== null) {
			console.log('previous page button view toggled running');
			if (this.props.page < 2) {
				document.getElementById('previousPageButton').textContent = '';
				document.getElementById('previousPageButton').classList.add('hide');
				document.getElementById('previousPageButton').style.backgroundColor = '#15418c';
			} else {
				document.getElementById('previousPageButton').textContent = 'Previous Page';
				document.getElementById('previousPageButton').classList.add('show');
				document.getElementById('previousPageButton').classList.remove('hide');
				document.getElementById('previousPageButton').style.backgroundColor = '#15418c';
			}
		}
		*/
	};

	render() {
		console.log();
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
										dateCreated={newResult.data[0].date_created}
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
										listView={this.props.listView}
										toggleView={this.props.toggleView}
										title={newResult.data[0].title}
										centerLink={this.props.centerLink}
									/>
								))}
							</div>
						</Route>
						<Route path="/details/:nasaID">
							<Single
								fetchActivity={this.props.fetchActivity}
								nasaID={this.props.nasaID}
								singleResult={this.props.singleResult}
								mediaType={this.props.mediaType}
								getSingleResult={this.props.getSingleResult}
								centerLink={this.props.centerLink}
							/>
						</Route>
						<Route path="/search">
							<Link to="/search">
								<Button id="searchView" onClick={this.props.toggleView}>
									Click for List View
								</Button>
							</Link>

							<SearchResults
								searchResults={this.props.searchResults}
								fetchSearchResults={this.props.fetchSearchResults}
								searchNASALibrary={this.props.searchNASALibrary}
								currentLoad={this.props.currentLoad}
								fetchActivity={this.props.fetchActivity}
								listView={this.props.listView}
								toggleView={this.props.toggleView}
								numberOfColumns={this.state.numberOfColumns}
								centerLink={this.props.centerLink}
							/>
							<Button id="previousPageButton" onClick={this.props.previousPage}>
								Previous
							</Button>
							<Button onClick={this.props.nextPage}>Next</Button>
						</Route>
					</Switch>
				</div>
			);
		} else if (this.props.searchResults !== '') {
			return (
				<div>
					<Switch>
						<Route path="/search">
							<Link to="/search">
								<Button id="searchView" onClick={this.props.toggleView}>
									Click for List View
								</Button>
							</Link>
							<SearchResults
								id="searchResults"
								nasaID={this.props.nasaID}
								mediaType={this.props.mediaType}
								searchResults={this.props.searchResults}
								fetchSearchResults={this.props.fetchSearchResults}
								searchNASALibrary={this.props.searchNASALibrary}
								fetchActivity={this.props.fetchActivity}
								listView={this.props.listView}
								toggleView={this.props.toggleView}
								numberOfColumns={this.state.numberOfColumns}
								centerLink={this.props.centerLink}
							/>
							<Button id="previousPageButton" onClick={this.props.previousPage}>
								Previous
							</Button>

							<Button onClick={this.props.nextPage}>Next</Button>
						</Route>
						<Route path="/details/:nasaID">
							<Single
								nasaID={this.props.nasaID}
								singleResult={this.props.singleResult}
								mediaType={this.props.mediaType}
								getSingleResult={this.props.getSingleResult}
								fetchActivity={this.props.fetchActivity}
								toggleView={this.props.toggleView}
								centerLink={this.props.centerLink}
							/>
						</Route>
					</Switch>
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
		yearRange: state.yearRange,
		listView: state.listView,
		searchResults: state.searchResults,
		mediaType: state.mediaType,
		areSearchResults: state.areSearchResults,
		page: state.page
	};
};

export default connect(mapStateToProps, {
	fetchActivity,
	fetchSearchResults,
	toggleListView,
	adjustYearRange,
	turnPage
})(Sorted);
