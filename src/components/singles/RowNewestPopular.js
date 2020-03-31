import React from 'react';
import ColumnNewestPopular from './ColumnNewestPopular.js';
import { connect } from 'react-redux';
import { fetchActivity } from '../../actions';

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
		if (this.props.numberOfColumns === 6) {
			this.setState({ numberOfColumns: 1 });
		}
	}

	render() {
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
					/>
				)}
			</div>
		);
	}
}
export default RowNewestPopular;
/*
const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		error: state.error,
		currentLoad: state.currentLoad,
		nasaID: state.nasaID,
		mediaType: state.mediaType
	};
};

export default connect(mapStateToProps, { fetchActivity })(RowNewestPopular);


*/
