import React from 'react';
// do new api call to get proper file paths

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
					<b>{this.props.nasaID}:</b>{' '}
					<a href={this.props.fileURL} download>
						<button>Download</button>
					</a>
				</p>

				<p>
					<b>
						<a href={this.props.fileURL}>full-resolution file</a>
					</b>
				</p>
				<p>
					<b>center:</b> {this.props.center}
				</p>
				<p>
					<b>explanation:</b> {this.props.explanation}
				</p>
			</div>
		);
	}
}

export default FileInfo;
