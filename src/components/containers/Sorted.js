import React from 'react';

class Sorted extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

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
			this.props.newestResults.map(newResult => {
				console.log('newResult = ' + newResult);
				console.log('newResult data = ' + [newResult.data]);
				console.log('thumbnail link = ' + newResult.links[0].href);
				console.log('nasa id = ' + newResult.data[0].nasa_id);

				resultContainer = document.getElementById('wrapperNewest');
				rowDiv = document.createElement('div');
				rowDiv.className = 'row';
				resultContainer.appendChild(rowDiv);
				columnDiv = document.createElement('div');
				columnDiv.className = 'column';
				rowDiv.appendChild(columnDiv);
				imgDiv = columnDiv.appendChild(document.createElement('img'));
				imgDiv.src = newResult.links.href;
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
