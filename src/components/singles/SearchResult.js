import React from 'react';
import ColumnNewestPopular from './ColumnNewestPopular.js';
import RowNewestPopular from './RowNewestPopular.js';

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
							className="row"
							numberOfColumns={this.state.numberOfColumns}
							nasaID={newResult.data[0].nasa_id}
							imgURL={newResult.links[0].href}
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

export default SearchResult;
