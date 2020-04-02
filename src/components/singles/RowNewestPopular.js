import React from 'react';
import ColumnNewestPopular from './ColumnNewestPopular.js';
import { connect } from 'react-redux';
import { toggleListView } from '../../actions';

const row = {
	display: 'flex',
	flex: '1',
	flexWrap: 'wrap',
	flexDirection: 'row',
	flexBasis: '19%',
	padding: '0%',
	margin: '0%'
};

class RowNewestPopular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		// resets columns to 1 at new row to facilitate grid view
		if (this.props.numberOfColumns === 6) {
			this.setState({ numberOfColumns: 1 });
		}
	}

	render() {
		// organizes results into several per row in grid form
		return (
			<div className="row" style={row}>
				{this.props.numberOfColumns <= 5 && (
					<ColumnNewestPopular
						newResult={this.props.newResult}
						numberOfColumns={this.props.numberOfColumns}
						nasaID={this.props.nasaID}
						mediaType={this.props.mediaType}
						imgURL={this.props.imgURL}
						explanation={this.props.explanation}
						fetchActivity={this.props.fetchActivity}
						listView={this.props.listView}
						dateCreated={this.props.dateCreated}
						title={this.props.title}
					/>
				)}
			</div>
		);
	}
}
const mapStateToProps = state => {
	return {
		listView: state.listView
	};
};

export default connect(mapStateToProps, { toggleListView })(RowNewestPopular);
