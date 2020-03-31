import React from 'react';
import ColumnNewestPopular from './ColumnNewestPopular.js';
import { connect } from 'react-redux';
import { toggleListView } from '../../actions';

let row = {
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

	componentDidUpdate() {
		console.log('listView mounted!!');
		console.log('componentdidUpdate number of columns = ' + this.props.numberOfColumns);
		if (this.props.listView === false || this.props.listView === 'false') {
			if (this.props.numberOfColumns === 6) {
				this.setState({ numberOfColumns: 1 });
			}
			row = {
				display: 'flex',
				flex: '1',
				flexWrap: 'wrap',
				flexDirection: 'row',
				flexBasis: '100%',
				padding: '0%',
				margin: '0%'
			};
		}
		if (this.props.listView === true || this.props.listView === 'true') {
			if (this.props.numberOfColumns > 1) {
				this.setState({ numberOfColumns: 1 });
			}
			row = {
				display: 'flex',
				flex: '1',
				flexWrap: 'wrap',
				flexDirection: 'row',
				flexBasis: '19%',
				padding: '0%',
				margin: '0%'
			};
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

// export default ListView;

const mapStateToProps = state => {
	return {
		listView: state.listView
	};
};

export default connect(mapStateToProps, { toggleListView })(ListView);
