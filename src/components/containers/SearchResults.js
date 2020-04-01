import React from 'react';
import { Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import RowNewestPopular from '../singles/RowNewestPopular.js';
import ListView from '../singles/ListView.js';
import { connect } from 'react-redux';
import { toggleListView } from '../../actions';

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
		this.state = {};
	}

	componentDidMount = () => {
		this.props.searchNASALibrary(this.props.mediaFormats, this.props.searchTerm, this.props.page);
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
			);
		}
	}
}
/*
export default SearchResults;
*/
const mapStateToProps = state => {
	return {
		listView: state.listView
	};
};

export default connect(mapStateToProps, { toggleListView })(SearchResults);
