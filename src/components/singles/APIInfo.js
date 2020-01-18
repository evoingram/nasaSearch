import React from 'react';

class APIInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<p>
					<b>NASA ID: </b> {this.props.nasaID}
				</p>

				<p>
					<b>Center: </b> <a href={this.props.fileURL}>{this.props.center}</a>
				</p>

				<p>
					<b>date created: </b> {this.props.dateCreated}
				</p>
				<p>
					<b>description: </b> {this.props.description}
				</p>
			</div>
		);
	}
}

export default APIInfo;
