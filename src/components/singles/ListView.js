import React from 'react';
import ColumnNewestPopular from './ColumnNewestPopular.js';
// import { connect } from 'react-redux';
// import { fetchActivity } from '../../actions';

const row = {
	display: 'flex',
	flex: '1',
	flexWrap: 'wrap',
	flexDirection: 'row',
	flexBasis: '19%',
	padding: '0%',
	margin: '0%'
};

class ListView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		console.log('listView mounted!!');
		if (this.props.numberOfColumns > 1) {
			this.setState({ numberOfColumns: 1 });
		}
	}

	render() {
		console.log('listView in ListView = ' + this.props.listView);
		console.log('number of columns = ' + this.props.numberOfColumns);
		return (
			<div className="row" style={row}>
				{this.props.numberOfColumns < 2 && (
					<ColumnNewestPopular
						newResult={this.props.newResult}
						numberOfColumns={this.props.numberOfColumns}
						nasaID={this.props.nasaID}
						mediaType={this.props.mediaType}
						imgURL={this.props.imgURL}
						explanation={this.props.explanation}
						fetchActivity={this.props.fetchActivity}
						dateCreated={this.props.dateCreated}
						listView={this.props.listView}
					/>
				)}
			</div>
		);
	}
}
export default ListView;
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

export default connect(mapStateToProps, { fetchActivity })(ListView);


*/
