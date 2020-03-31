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
export const FETCHING_SEARCHRESULTS_SUCCESS = 'FETCHING_SEARCHRESULTS_SUCCESS';
export const FETCHING_SEARCHRESULTS_START = 'FETCHING_SEARCHRESULTS_START';
export const FETCHING_SEARCHRESULTS_FAILURE = 'FETCHING_SEARCHRESULTS_FAILURE';
export const LISTVIEW = 'LISTVIEW';
export const UPDATE_NIDMT = 'UPDATE_NIDMT';
// Where does props come from? We never passed anything in!
export const fetchActivity = (nasaID, mediaType) => dispatch => {
	console.log(`running fetchActivity on ${nasaID} ${mediaType}`);
	dispatch({ type: FETCHING_ACTIVITY_START });
	axios
		.get(`https://images-api.nasa.gov/search?q=${nasaID}`)
		.then(response => {
			console.log('fetchActivity single detail = ' + response.data.collection.items[0].data[0]);
			// thumbnail link = response.data.collection.items[x].data.links[0].href;
			dispatch({ type: FETCHING_ACTIVITY_SUCCESS, payload: response.data.collection.items[0] });
			console.log(`nasa ID + media type = ${response.data.collection.items[0].data[0].media_type} ${nasaID}`);

			axios
				.get(
					`https://images-assets.nasa.gov/${response.data.collection.items[0].data[0].media_type}/${nasaID}/collection.json`
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
					`https://images-assets.nasa.gov/${response.data.collection.items[0].data[0].media_type}/${nasaID}/metadata.json`
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

export const fetchSearchResults = (mediaFormats, searchTerm, page) => dispatch => {
	console.log('----------------ACTION searchResults-----------------------');
	console.log('mediaFormats = ' + mediaFormats);
	console.log(
		'searchResults from https://images-api.nasa.gov/search' +
			'?q=' +
			searchTerm +
			'&page=' +
			page +
			'&media_type=' +
			mediaFormats
	);
	axios
		.get(
			'https://images-api.nasa.gov/search' + '?q=' + searchTerm + '&page=' + page + '&media_type=' + mediaFormats
		)
		.then(response => {
			dispatch({ type: FETCHING_SEARCHRESULTS_SUCCESS, payload: response.data.collection.items });
			console.log('searchResults = ' + response.data.collection.items);
			console.log('done searching NASA images library searchResults');
		})
		.catch(error => {
			dispatch({ type: FETCHING_SEARCHRESULTS_FAILURE, payload: error.response });
			console.log(error);
		});
	console.log('------------------searchResults---------------------');
};

export const toggleListView = listView => dispatch => {
	console.log('toggleListView Action = ' + listView);
	dispatch({ type: LISTVIEW, payload: listView });
};
