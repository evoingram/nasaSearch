import {
	FETCHING_ACTIVITY_START,
	FETCHING_ACTIVITY_SUCCESS,
	FETCHING_ACTIVITY_FAILURE,
	FETCHING_FILEURL_START,
	FETCHING_FILEURL_SUCCESS,
	FETCHING_FILEURL_FAILURE,
	FETCHING_FILEFORMAT_START,
	FETCHING_FILEFORMAT_SUCCESS,
	FETCHING_FILEFORMAT_FAILURE,
	FETCHING_NEWEST_START,
	FETCHING_NEWEST_SUCCESS,
	FETCHING_POPULAR_START,
	FETCHING_POPULAR_SUCCESS,
	FETCHING_SEARCHRESULTS_START,
	FETCHING_SEARCHRESULTS_SUCCESS,
	FETCHING_SEARCHRESULTS_FAILURE,
	LISTVIEW,
	UPDATE_NIDMT
} from '../actions';

const initialState = {
	isLoading: false,
	areSearchResults: false,
	listView: false,
	title: '',
	imgURL: '',
	copyright: '',
	date: '',
	explanation: '',
	fileURL: '',
	nasaID: '',
	fileSize: '',
	fileFormat: '',
	captionsFileURL: '',
	center: '',
	keywords: [],
	secondaryC: '',
	mediaType: '',
	thumbnailURL: '',
	singleResult: null,
	newestResults: [],
	popularResults: [],
	currentLoad: [],
	searchResults: [],
	results: []
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_ACTIVITY_START:
			return {
				...state,
				areSearchResults: false,
				isLoading: true,
				searchResults: []
			};
		case FETCHING_ACTIVITY_SUCCESS:
			return {
				...state,
				isLoading: false,
				areSearchResults: false,
				title: action.payload.data[0].title,
				date: action.payload.data[0].date_created,
				explanation: action.payload.data[0].description,
				center: action.payload.data[0].center,
				keywords: action.payload.data[0].keywords,
				mediaType: action.payload.data[0].media_type,
				nasaID: action.payload.data[0].nasa_id,
				thumbnailURL: action.payload.links[0].href,
				singleResult: action.payload,
				searchResults: []
			};
		case FETCHING_FILEURL_START:
			return {
				...state,
				areSearchResults: false,
				isLoading: true,
				searchResults: []
			};
		case FETCHING_FILEURL_SUCCESS:
			return {
				...state,
				areSearchResults: false,
				isLoading: false,
				fileURL: action.payload,
				searchResults: []
			};
		case FETCHING_FILEFORMAT_START:
			return {
				...state,
				areSearchResults: false,
				isLoading: true,
				searchResults: []
			};
		case FETCHING_FILEFORMAT_SUCCESS:
			return {
				...state,
				areSearchResults: false,
				isLoading: false,
				fileSize: action.payload.data['File:FileSize'],
				searchResults: []
			};
		case FETCHING_NEWEST_START:
			return {
				...state,
				areSearchResults: false,
				isLoading: true,
				searchResults: []
			};
		case FETCHING_NEWEST_SUCCESS:
			return {
				...state,
				isLoading: false,
				areSearchResults: false,
				searchResults: [],
				currentLoad: action.payload
			};
		case FETCHING_POPULAR_START:
			return {
				...state,
				isLoading: true,
				searchResults: [],
				areSearchResults: false
			};
		case FETCHING_POPULAR_SUCCESS:
			return {
				...state,
				isLoading: false,
				areSearchResults: false,
				searchResults: [],
				currentLoad: action.payload
			};
		case FETCHING_SEARCHRESULTS_START:
			return {
				...state,
				areSearchResults: false,
				isLoading: true,
				currentLoad: [],
				searchResults: []
			};
		case FETCHING_SEARCHRESULTS_SUCCESS:
			return {
				...state,
				areSearchResults: true,
				isLoading: false,
				searchResults: action.payload,
				currentLoad: action.payload
			};
		case LISTVIEW:
			return {
				...state,
				listView: !action.payload
			};
		case UPDATE_NIDMT:
			return {
				...state,
				isLoading: false,
				nasaID: action.payload[0],
				mediaType: action.payload[1]
			};

		default:
			return state;
	}
};
