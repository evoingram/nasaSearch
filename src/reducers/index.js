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
	FETCHING_YR_START,
	FETCHING_YR_SUCCESS,
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
	yearRange: [1920, 2020],
	fileURL: [],
	nasaID: '',
	fileSize: '',
	fileFormat: '',
	captionsFileURL: '',
	center: '',
	centerLink: '',
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
		case FETCHING_YR_START:
			return {
				...state,
				isLoading: true
			};
		case FETCHING_YR_SUCCESS:
			return {
				...state,
				yearRange: action.payload,
				isLoading: false
			};
		case FETCHING_ACTIVITY_START:
			return {
				...state,
				areSearchResults: false,
				isLoading: true,
				searchResults: []
			};
		case FETCHING_ACTIVITY_SUCCESS:
			let centerLink = '';
			if (action.payload.data[0].center === 'JPL') {
				centerLink = 'http://www.jpl.nasa.gov';
			}
			if (action.payload.data[0].center === 'HQ') {
				centerLink = 'http://www.nasa.gov/centers/hq/home/index.html';
			}
			if (action.payload.data[0].center === 'KSC') {
				centerLink = 'http://www.nasa.gov/centers/kennedy/home/index.html';
			}
			if (action.payload.data[0].center === 'GSFC') {
				centerLink = 'https://www.nasa.gov/centers/goddard/home/index.html';
			}
			if (action.payload.data[0].center === 'ARC') {
				centerLink = 'http://www.nasa.gov/centers/ames/home/index.html';
			}
			if (action.payload.data[0].center === 'AFRC') {
				centerLink = 'http://www.nasa.gov/centers/armstrong/home/index.html';
			}
			if (action.payload.data[0].center === 'GRC') {
				centerLink = 'ttp://www.nasa.gov/centers/glenn/home/index.html';
			}
			if (action.payload.data[0].center === 'GISS') {
				centerLink = 'http://www.giss.nasa.gov/';
			}
			if (action.payload.data[0].center === 'IVV') {
				centerLink = 'http://www.nasa.gov/centers/ivv/home/index.html';
			}
			if (action.payload.data[0].center === 'LRC') {
				centerLink = 'http://www.nasa.gov/centers/langley/home/index.html';
			}
			if (action.payload.data[0].center === 'MSFC') {
				centerLink = 'http://www.nasa.gov/centers/marshall/home/index.html';
			}
			if (action.payload.data[0].center === 'MAF') {
				this.setState({
					centerLink: 'http://www.nasa.gov/centers/marshall/michoud/index.html'
				});
			}
			if (action.payload.data[0].center === 'ESC') {
				centerLink = 'http://www.nasa.gov/offices/nesc/home/';
			}
			if (action.payload.data[0].center === 'NESC') {
				centerLink = 'http://www.nasa.gov/offices/nesc/home/';
			}
			if (action.payload.data[0].center === 'NSC') {
				centerLink = 'http://www.nasa.gov/offices/nsc/home/index.html';
			}
			if (action.payload.data[0].center === 'NSSC') {
				centerLink = 'http://www.nssc.nasa.gov/';
			}
			if (action.payload.data[0].center === 'PBS') {
				centerLink = 'http://www.nasa.gov/centers/glenn/about/testfacilities/index.html';
			}
			if (action.payload.data[0].center === 'SSC') {
				centerLink = 'http://www.nasa.gov/centers/stennis/home/index.html';
			}
			if (action.payload.data[0].center === 'WFF') {
				centerLink = 'http://www.nasa.gov/centers/wallops/home/index.html';
			}
			if (action.payload.data[0].center === 'WSTF') {
				centerLink = 'http://www.nasa.gov/centers/wstf/home/index.html';
			}
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
				searchResults: [],
				centerLink: centerLink
			};
		case FETCHING_FILEURL_START:
			return {
				...state,
				areSearchResults: false,
				isLoading: true,
				searchResults: []
			};
		case FETCHING_FILEURL_SUCCESS:
			/*
			console.log('fetchFileURL reducer action.payload = ' + actionArray);
			for (let x = 0; x < actionArray.length; x++) {
				console.log('fetchFileURL reducer x = ' + x);
				console.log('fetchFileURL reducer fileLink = ' + actionArray[x]);
				console.log('fetchFileURL reducer actionArray[x] = ' + actionArray[x]);
				if (actionArray[x].toString.includes('~orig')) {
					fileLink = actionArray[x];
				}
			}
			actionArray.forEach(currentFileLink => {
				console.log('fetchFileURL reducer currentFileLink forEach = ' + currentFileLink);
				if (currentFileLink.toString.includes('~orig')) {
					fileLink = currentFileLink;
				}
			});
			console.log('fetchFileURL reducer fileLink = ' + action.payload);
			*/
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
