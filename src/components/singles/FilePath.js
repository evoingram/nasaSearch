import React from 'react';

const FilePath = props => {
	return (
		<div className="App">
			<header className="App-header">
				<h2>FILE PATH COMPONENT:</h2>
				<div>
					<p>
						<b>{props.nasaID}:</b> <button onClick={props.fileURL}>Download</button>{' '}
					</p>
					<p>
						<b>full-resolution Title:</b> {props.title}
					</p>

					<p>
						<b>full-resolution URL:</b> {props.fileURL}
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
