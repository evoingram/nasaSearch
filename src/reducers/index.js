import {
	FETCHING_ACTIVITY_START,
	FETCHING_ACTIVITY_SUCCESS,
	FETCHING_ACTIVITY_FAILURE,
	FETCHING_FILEURL_START,
	FETCHING_FILEURL_SUCCESS,
	FETCHING_FILEURL_FAILURE,
	FETCHING_FILEFORMAT_START,
	FETCHING_FILEFORMAT_SUCCESS,
	FETCHING_FILEFORMAT_FAILURE
} from '../actions';

const initialState = {
	isLoading: false,
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
	thumbnailURL: ''
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCHING_ACTIVITY_START:
			return {
				...state,
				isLoading: true
			};
		case FETCHING_ACTIVITY_SUCCESS:
			return {
				...state,
				isLoading: false,
				title: action.payload.data[0].title,
				date: action.payload.data[0].date_created,
				explanation: action.payload.data[0].description,
				center: action.payload.data[0].center,
				keywords: action.payload.data[0].keywords,
				mediaType: action.payload.data[0].media_type,
				thumbnailURL: action.payload.links[0].href
			};
		case FETCHING_FILEURL_START:
			return {
				...state,
				isLoading: true
			};
		case FETCHING_FILEURL_SUCCESS:
			return {
				...state,
				isLoading: false,
				fileURL: action.payload
			};
		case FETCHING_FILEFORMAT_START:
			return {
				...state,
				isLoading: true
			};
		case FETCHING_FILEFORMAT_SUCCESS:
			return {
				...state,
				isLoading: false,
				fileSize: action.payload.data['File:FileSize'],
				fileFormat: action.payload.data['File:MIMEType'].substring(0, 5)
			};
		default:
			return state;
	}
};
