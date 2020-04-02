import React from 'react';
import RowNewestPopular from '../singles/RowNewestPopular.js';
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
	&:hover {
		background-color: #0e3579;
	}
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
	};

	render() {
		// if newest/popular results exist, load this component
		// else load search results (see below)
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
			// else load this if search results exist
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
