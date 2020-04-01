import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import RowNewestPopular from '../singles/RowNewestPopular.js';
import ListView from '../singles/ListView.js';
import { connect } from 'react-redux';
import { toggleListView, adjustYearRange, turnPage } from '../../actions';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const Button = styled.button`
	margin-top: 2%;
	margin-bottom: 2%;
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	border: none;
	padding-top: 20px;
	padding-bottom: 20px;
	font-size: 2rem;
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
			yearRangeLocal: [1920, 2020]
		};
	}

	componentDidMount = () => {
		this.props.searchNASALibrary(this.props.mediaFormats, this.props.searchTerm, this.props.page);
		/*
		if (
			document.getElementById('previousPageButton') !== null &&
			document.getElementById('previousPageButton') !== 'undefined'
		) {
			console.log('previous page button view toggled running');
			if (this.props.page < 2 && this.props.page >= 0) {
				document.getElementById('previousPageButton').classList.toggle('show');
				document.getElementById('previousPageButton').classList.toggle('hide');
				document.getElementById('previousPageButton').textContent = '';
				document.getElementById('previousPageButton').style.backgroundColor = '#15418c';
			} else {
				document.getElementById('previousPageButton').textContent = 'Previous Page';
				document.getElementById('previousPageButton').classList.toggle('show');
				document.getElementById('previousPageButton').classList.toggle('hide');
				document.getElementById('previousPageButton').style.backgroundColor = '#15418c';
			}
		}*/
	};

	render() {
		console.log();
		if (
			this.props.searchResults !== [] &&
			this.props.searchResults !== 'undefined' &&
			this.props.searchResults !== null &&
			this.props.searchResults !== ''
		) {
			return (
				<div>
					<div className="row" style={row}>
						{this.props.searchResults.map(newResult => (
							<ListView
								key={newResult.data[0].nasa_id}
								className="row"
								newResult={newResult}
								numberOfColumns={this.props.numberOfColumns}
								fetchActivity={this.props.fetchActivity}
								nasaID={newResult.data[0].nasa_id}
								imgURL={newResult.links[0].href}
								dateCreated={newResult.data[0].date_created}
								mediaType={newResult.data[0].mediaType}
								explanation={
									(newResult.data[0].description
										? newResult.data[0].description.substring(0, 50)
										: newResult.data[0].description_508.substring(0, 50)) + '...'
								}
								dateCreated={newResult.data[0].date_created.substring(0, 10)}
								fetchActivity={this.props.fetchActivity}
								listView={this.props.listView}
								title={newResult.data[0].title}
							/>
						))}
					</div>
				</div>
			);
		}
	}
}
/*
export default SearchResults;
*/
const mapStateToProps = state => {
	return {
		listView: state.listView,
		yearRange: state.yearRange,
		page: state.page
	};
};

export default connect(mapStateToProps, { toggleListView, adjustYearRange, turnPage })(SearchResults);
