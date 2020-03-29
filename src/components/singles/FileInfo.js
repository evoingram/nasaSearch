import React from 'react';

class FileInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<h2>FILE INFO COMPONENT:</h2>
				<p>
					<b>{this.props.nasaID}:</b> <button onClick={this.props.fileURL}>Download</button>{' '}
				</p>

				<p>
					<b>full-resolution URL:</b> {this.props.fileURL}
				</p>
				<p>
					<b>file size:</b> {this.props.fileSize}
				</p>
				<p>
					<b>file format:</b> {this.props.fileFormat}
				</p>
			</div>
		);
	}
}

export default FileInfo;
