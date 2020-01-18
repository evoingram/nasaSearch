import React from 'react';

class Sorted extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	/*
https://images-assets.nasa.gov/recent.json
https://images-assets.nasa.gov/video/Apollo%2011%20Overview/collection.json
https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=video
https://images.nasa.gov/

*/
	componentDidUpdate() {
		if (
			this.props.newestResults !== '' ||
			this.props.newestResults !== 'undefined' ||
			this.props.newestResults != null
		) {
			let resultContainer = document.getElementById('wrapperNewest');
			resultContainer.textContent = '';
			let rowDiv;
			let columnDiv;
			let imgDiv;
			rowDiv = document.createElement('div');
			rowDiv.className = 'row';
			resultContainer.appendChild(rowDiv);
			let y = 1;
			this.props.newestResults.map(newResult => {
				console.log('thumbnail link = ' + newResult.links[0].href);
				console.log('nasa id = ' + newResult.data[0].nasa_id);
				if (y <= 5) {
					columnDiv = document.createElement('div');
					columnDiv.className = 'column';
					columnDiv.id = 'column' + y;
					rowDiv.appendChild(columnDiv);
					imgDiv = columnDiv.appendChild(document.createElement('img'));
					imgDiv.src = newResult.links[0].href;
					y += 1;
				}
				if (y === 6) {
					y = 1;
					resultContainer = document.getElementById('wrapperNewest');
					rowDiv = document.createElement('div');
					rowDiv.className = 'row';
					resultContainer.appendChild(rowDiv);
					columnDiv = document.createElement('div');
					columnDiv.className = 'column';
					columnDiv.id = 'column' + y;
					rowDiv.appendChild(columnDiv);
					imgDiv = columnDiv.appendChild(document.createElement('img'));
					imgDiv.src = newResult.links[0].href;
					y += 1;
				}
				console.log('y = ' + y);
			});
		}
	}

	// mapped to display below
	// response.data.collection.items[x].data.links[0].href = link to preview image
	render() {
		return <p>This is loading.</p>;
	}
}

export default Sorted;
