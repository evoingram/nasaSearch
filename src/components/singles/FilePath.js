import React, { useEffect } from 'react';
// do new api call to get proper file paths

const FilePath = props => {
	useEffect(() => {
		console.log('Checking, nasaID = ' + props.nasaID);
		console.log('Checking, fileURL = ' + props.fileURL);
		console.log('Checking, fileSize = ' + props.fileSize);
	});
	return (
		<div className="App">
			<header className="App-header">
				<h2>FILE PATH COMPONENT:</h2>
				<div>
					<p>
						<b>{props.nasaID}:</b>{' '}
						<a href={props.fileURL} download>
							<button>Download</button>
						</a>
					</p>
					<p>
						<b>full-resolution Title:</b> {props.title}
					</p>

					<p>
						<b>
							<a href={props.fileURL}>full-resolution file</a>
						</b>
					</p>
					<p>
						<b>file size:</b> {props.fileSize}
					</p>
					<p>
						<b>file format:</b> {props.fileFormat}
					</p>
				</div>
			</header>
		</div>
	);
};
export default FilePath;
