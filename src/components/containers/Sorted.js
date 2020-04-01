import React from 'react';
// import styled from 'styled-components';
import SearchResult from '../singles/SearchResult';
import RowNewestPopular from '../singles/RowNewestPopular.js';
import FilterSearchResults from '../singles/FilterSearchResults.js';
import Single from '../containers/Single';
import SearchResults from '../containers/SearchResults';
import { Route, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchActivity, fetchSearchResults, toggleListView, adjustYearRange } from '../../actions';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

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
	margin-top: 2%;
	margin-bottom: 2%;
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	border: none;
	padding-top: 20px;
	padding-bottom: 20px;
	font-size: 1.5rem;
`;
class Sorted extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfColumns: 1,
			yearRangeLocal: [1920, 2020]
		};
	}

	useStyles = makeStyles({
		root: {
			width: 300
		}
	});

	valuetext(value) {
		return `${value}`;
	}

	handleChange = (event, newValue) => {
		console.log('yearRange Sorted newValue = ' + newValue);
		// setYearRange(newValue);
		this.setState({ yearRangeLocal: newValue });
		this.setState({ yearRange: this.state.yearRangeLocal });
		this.props.adjustYearRange(newValue);
		console.log('yearRange Sorted handleChange = ' + this.state.yearRangeLocal);
		console.log('yearRange Sorted handleChange = ' + this.props.yearRange);
	};

	componentDidMount = () => {
		this.props.toggleView();
		if (
			document.getElementById('searchResults') !== null &&
			(document.getElementById('searchResults').style.display == 'inline-block' ||
				document.getElementById('searchResults').style.display == 'flex' ||
				document.getElementById('searchResults').style.display == 'block')
		) {
			document.getElementById('yearSlider').style.height = '100%';
		} else {
			if (document.getElementById('yearSlider') !== null) {
				document.getElementById('yearSlider').style.height = '0%';
			}
		}
	};

	render() {
		console.log('rendered Sorted yearRange = ' + this.props.yearRange);
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
		areSearchResults: state.areSearchResults
	};
};

export default connect(mapStateToProps, { fetchActivity, fetchSearchResults, toggleListView, adjustYearRange })(Sorted);
