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
export const FETCHING_YR_SUCCESS = 'FETCHING_YR_SUCCESS';
export const FETCHING_YR_START = 'FETCHING_YR_START';
export const LISTVIEW = 'LISTVIEW';
export const TURNPAGE_START = 'TURNPAGE_START';
export const TURNPAGE_SUCCESS = 'TURNPAGE_SUCCESS';
export const UPDATE_NIDMT = 'UPDATE_NIDMT';

export const fetchActivity = (nasaID, mediaType) => dispatch => {
	// fetches api details for single nasa id
	// called on by ColumnNewestPopular.handleSingleDetailLoad,app.searchNASALibrary, SearchResult.js render
	dispatch({ type: FETCHING_ACTIVITY_START });
	axios
		.get(`https://images-api.nasa.gov/search?q=${nasaID}`)
		.then(response => {
			dispatch({
				type: FETCHING_ACTIVITY_SUCCESS,
				payload: response.data.collection.items[0]
			});

			axios
				.get(
					`https://images-assets.nasa.gov/${response.data.collection.items[0].data[0].media_type}/${nasaID}/collection.json`
				)
				.then(response => {
					dispatch({
						type: FETCHING_FILEURL_SUCCESS,
						payload: response.data
					});
				})
				.catch(error => {
					dispatch({
						type: FETCHING_FILEURL_FAILURE,
						payload: error.response
					});
					console.log(error);
				});

			axios
				.get(
					`https://images-assets.nasa.gov/${response.data.collection.items[0].data[0].media_type}/${nasaID}/metadata.json`
				)
				.then(response => {
					dispatch({
						type: FETCHING_FILEFORMAT_SUCCESS,
						payload: response
					});
				})
				.catch(error => {
					dispatch({
						type: FETCHING_FILEFORMAT_FAILURE,
						payload: error.response
					});
					console.log(error);
				});
		})
		.catch(error => {
			dispatch({
				type: FETCHING_ACTIVITY_FAILURE,
				payload: error.response
			});
			console.log(error);
		});
};

export const fetchNewest = () => dispatch => {
	// fetches nasa 'newest results' list
	// called on by app.toggleResults
	dispatch({ type: FETCHING_NEWEST_START });
	axios
		.get(`https://images-assets.nasa.gov/recent.json`)
		.then(response => {
			dispatch({
				type: FETCHING_NEWEST_SUCCESS,
				payload: response.data.collection.items
			});
		})
		.catch(error => {
			dispatch({
				type: FETCHING_NEWEST_FAILURE,
				payload: error.response
			});
			console.log(error);
		});
};

export const fetchPopular = () => dispatch => {
	// fetches nasa 'most popular results' list
	// called on by app.toggleResults
	dispatch({ type: FETCHING_POPULAR_START });
	axios
		.get(`https://images-assets.nasa.gov/popular.json`)
		.then(response => {
			// thumbnail link = response.data.collection.items[x].data.links[0].href;
			dispatch({
				type: FETCHING_POPULAR_SUCCESS,
				payload: response.data.collection.items
			});
		})
		.catch(error => {
			dispatch({
				type: FETCHING_POPULAR_FAILURE,
				payload: error.response
			});
			console.log(error);
		});
};

export const fetchSearchResults = (mediaFormats, searchTerm, page, yearRange) => dispatch => {
	// fetches search results from NASA based on user text input

	// this line makes it infinite loop for some reason
	// dispatch({ type: FETCHING_SEARCHRESULTS_START });

	// called on by app.searchNASALibrary
	axios
		.get(
			'https://images-api.nasa.gov/search' +
				'?q=' +
				searchTerm +
				'&page=' +
				page +
				'&media_type=' +
				mediaFormats +
				'&year_start=' +
				yearRange[0] +
				'&year_end=' +
				yearRange[1]
		)
		.then(response => {
			dispatch({
				type: FETCHING_SEARCHRESULTS_SUCCESS,
				payload: response.data.collection.items
			});
		})
		.catch(error => {
			dispatch({
				type: FETCHING_SEARCHRESULTS_FAILURE,
				payload: error.response
			});
			console.log(error);
		});
};

export const toggleListView = listView => dispatch => {
	// toggles listView to display list view of search results
	// called on by app.toggleView
	dispatch({ type: LISTVIEW, payload: listView });
};

export const adjustYearRange = yearRange => dispatch => {
	// adjusts year range per slider in header
	// used to search NASA (see also fetchSearchResults)
	// called on by SearchForm.handleChange

	dispatch({ type: FETCHING_YR_START });
	dispatch({ type: FETCHING_YR_SUCCESS, payload: yearRange });
};
export const turnPage = page => dispatch => {
	// turns page to next or previous for nasa results
	// called on by app.nextPage, app.previousPage
	dispatch({ type: TURNPAGE_START });
	dispatch({ type: TURNPAGE_SUCCESS, payload: page });
};
