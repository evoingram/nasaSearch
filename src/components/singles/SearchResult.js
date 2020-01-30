import React from 'react';
import RowNewestPopular from './RowNewestPopular.js';
import { fetchActivity } from '../../actions';

const wrapper = {
	display: 'flex',
	flex: '1',
	flexWrap: 'wrap',
	flexDirection: 'row',
	flexBasis: '19%',
	padding: '0%',
	margin: '0%'
};
class SearchResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numberOfColumns: 1
		};
	}

	render() {
		return (
			<div className="App">
				<div className="App-header" style={wrapper}>
					{this.props.currentLoad.map(newResult => (
						<RowNewestPopular
							key={newResult.data[0].nasa_id}
							className="row"
							newResult={newResult}
							numberOfColumns={this.state.numberOfColumns}
							nasaID={newResult.data[0].nasa_id}
							imgURL={newResult.links[0].href}
							explanation={
								(newResult.data[0].description
									? newResult.data[0].description.substring(0, 50)
									: newResult.data[0].description_508.substring(0, 50)) + '...'
							}
							fetchActivity={this.props.fetchActivity}
							onClick={this.props.fetchActivity}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default SearchResult;
