import axios from 'axios';

export const FETCHING_ACTIVITY_START = 'FETCHING_ACTIVITY_START';
export const FETCHING_ACTIVITY_SUCCESS = 'FETCHING_ACTIVITY_SUCCESS';
export const FETCHING_ACTIVITY_FAILURE = 'FETCHING_ACTIVITY_FAILURE';
export const FETCHING_FILEURL_START = 'FETCHING_FILEURL_START';
export const FETCHING_FILEURL_SUCCESS = 'FETCHING_FILEURL_SUCCESS';
export const FETCHING_FILEURL_FAILURE = 'FETCHING_FILEURL_FAILURE';
export const FETCHING_FILEFORMAT_START = 'FETCHING_FILEFORMAT_START';
export const FETCHING_FILEFORMAT_SUCCESS = 'FETCHING_FILEFORMAT_SUCCESS';
export const FETCHING_FILEFORMAT_FAILURE = 'FETCHING_FILEFORMAT_FAILURE';
export const FETCHING_NEWEST_START = 'FETCHING_NEWEST_START';
export const FETCHING_NEWEST_SUCCESS = 'FETCHING_NEWEST_SUCCESS';
export const FETCHING_NEWEST_FAILURE = 'FETCHING_NEWEST_FAILURE';
export const FETCHING_POPULAR_START = 'FETCHING_POPULAR_START';
export const FETCHING_POPULAR_SUCCESS = 'FETCHING_POPULAR_SUCCESS';
export const FETCHING_POPULAR_FAILURE = 'FETCHING_POPULAR_FAILURE';

const fetchFileURL = (mediaType, nasaID) => dispatch => {
	dispatch({ type: FETCHING_FILEURL_START });
	console.log('running fetchFileURL');
	// https://images-assets.nasa.gov/image/as11-40-5874/collection.json
	axios
		.get(`https://images-assets.nasa.gov/${mediaType}/${nasaID}/collection.json`)
		.then(response => {
			console.log('fetchFileURL response.data = ' + response.data[0]);
			dispatch({ type: FETCHING_FILEURL_SUCCESS, payload: response.data[0] });
			console.log('done getting single NASA collection file URL');
		})
		.catch(error => {
			dispatch({ type: FETCHING_FILEURL_FAILURE, payload: error.response });
			console.log(error);
		});
};

const fetchFileFormat = (mediaType, nasaID) => dispatch => {
	dispatch({ type: FETCHING_FILEFORMAT_START });
	console.log('running fetchFileFormat');
	//https://images-assets.nasa.gov/image/as11-40-5874/metadata.json
	axios
		.get(`https://images-assets.nasa.gov/${mediaType}/${nasaID}/metadata.json`)
		.then(response => {
			console.log('fetchFileFormat response = ' + [response]);
			console.log('fetchFileFormat metadata response stringify = ' + JSON.stringify(response));
			console.log('fetchFileFormat FS = ' + response.data['File:FileSize']);

			dispatch({ type: FETCHING_FILEFORMAT_SUCCESS, payload: response });
			console.log('done getting metadata');
		})
		.catch(error => {
			dispatch({ type: FETCHING_FILEFORMAT_FAILURE, payload: error.response });
			console.log(error);
		});
};

export const fetchActivity = props => dispatch => {
	console.log(`running fetchActivity on ${props.nasaID}`);
	dispatch({ type: FETCHING_ACTIVITY_START });
	axios
		.get(`https://images-api.nasa.gov/search?q=${props.nasaID}`)
		.then(response => {
			console.log('fetchActivity single detail = ' + response.data.collection.items[0].data[0]);
			// thumbnail link = response.data.collection.items[x].data.links[0].href;
			dispatch({ type: FETCHING_ACTIVITY_SUCCESS, payload: response.data.collection.items[0] });

			axios
				.get(
					`https://images-assets.nasa.gov/${response.data.collection.items[0].data[0].media_type}/${response.data.collection.items[0].data[0].nasa_id}/collection.json`
				)
				.then(response => {
					console.log('fetchFileURL response.data = ' + response.data[0]);
					dispatch({ type: FETCHING_FILEURL_SUCCESS, payload: response.data[0] });
					console.log('done getting single NASA collection file URL');
				})
				.catch(error => {
					dispatch({ type: FETCHING_FILEURL_FAILURE, payload: error.response });
					console.log(error);
				});

			axios
				.get(
					`https://images-assets.nasa.gov/${response.data.collection.items[0].data[0].media_type}/${response.data.collection.items[0].data[0].nasa_id}/metadata.json`
				)
				.then(response => {
					console.log('fetchFileFormat response = ' + [response]);
					console.log('fetchFileFormat metadata response stringify = ' + JSON.stringify(response));
					console.log('fetchFileFormat FS = ' + response.data['File:FileSize']);
					dispatch({ type: FETCHING_FILEFORMAT_SUCCESS, payload: response });
				})
				.catch(error => {
					dispatch({ type: FETCHING_FILEFORMAT_FAILURE, payload: error.response });
					console.log(error);
				});
			console.log('done running fetchActivity');
		})
		.catch(error => {
			dispatch({ type: FETCHING_ACTIVITY_FAILURE, payload: error.response });
			console.log(error);
		});
};

export const fetchNewest = () => dispatch => {
	console.log(`running fetchNewest`);
	dispatch({ type: FETCHING_NEWEST_START });
	axios
		.get(`https://images-assets.nasa.gov/recent.json`)
		.then(response => {
			console.log('fetchNewest = ' + response.data.collection.items);
			// thumbnail link = response.data.collection.items[x].data.links[0].href;
			dispatch({ type: FETCHING_NEWEST_SUCCESS, payload: response.data.collection.items });
			console.log('done getting newest results');
		})
		.catch(error => {
			dispatch({ type: FETCHING_NEWEST_FAILURE, payload: error.response });
			console.log(error);
		});
};

export const fetchPopular = () => dispatch => {
	console.log(`running fetchPopular`);
	dispatch({ type: FETCHING_POPULAR_START });
	axios
		.get(`https://images-assets.nasa.gov/popular.json`)
		.then(response => {
			console.log('fetchPopular = ' + response.data.collection.items);
			// thumbnail link = response.data.collection.items[x].data.links[0].href;
			dispatch({ type: FETCHING_POPULAR_SUCCESS, payload: response.data.collection.items });
			console.log('done getting popular results');
		})
		.catch(error => {
			dispatch({ type: FETCHING_POPULAR_FAILURE, payload: error.response });
			console.log(error);
		});
};
