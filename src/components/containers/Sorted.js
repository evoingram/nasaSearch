import React from 'react';

class Sorted extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			results: this.props.newestResults
		};
	}
	componentDidMount() {
		if (this.props.newestResults !== '') {
			this.setState({ results: this.props.newestResults });
			console.log(this.state.results);
		}
	}

	// mapped to display below
	// response.data.collection.items[x].data.links[0].href = link to preview image
	render() {
		return (
			<div className="row">
				<div className="column">
					<img src={this.props.newResult.data.links[0].href} />
				</div>
			</div>
		);
	}
}

export default Sorted;
