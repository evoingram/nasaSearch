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

export const fetchActivity = () => dispatch => {
	dispatch({ type: FETCHING_ACTIVITY_START });
	console.log('running single detail axios get');
	axios
		.get(`https://images-api.nasa.gov/search?q=${this.props.nasaID}`)
		.then(response => {
			console.log('single detail = ' + response.data.collection.items[0].data[0]);
			// thumbnail link = response.data.collection.items[x].data.links[0].href;
			this.setState({
				title: response.data.collection.items[0].data[0].title,
				date: response.data.collection.items[0].data[0].date_created,
				explanation: response.data.collection.items[0].data[0].description,
				center: response.data.collection.items[0].data[0].center,
				keywords: response.data.collection.items[0].data[0].keywords,
				mediaType: response.data.collection.items[0].data[0].media_type,
				thumbnailURL: response.data.collection.items[0].links[0].href
			});
			dispatch({ type: FETCHING_ACTIVITY_SUCCESS, payload: response.data.collection.items[0] });
			console.log('done getting single Q NASA details');
		})
		.catch(error => {
			dispatch({ type: FETCHING_ACTIVITY_FAILURE, payload: error.response });
			console.log(error);
		});
};

export const fetchFileURL = () => dispatch => {
	dispatch({ type: FETCHING_FILEURL_START });
	console.log('running single detail FU axios get');
	// https://images-assets.nasa.gov/image/as11-40-5874/collection.json
	axios
		.get(`https://images-assets.nasa.gov/image/${this.props.nasaID}/collection.json`)
		.then(response => {
			console.log('single detail collection = ' + response.data[0]);
			this.setState({
				fileURL: response.data[0]
			});

			dispatch({ type: FETCHING_FILEURL_SUCCESS, payload: response.data[0] });
			console.log('done getting single NASA collection file URL');
		})
		.catch(error => {
			dispatch({ type: FETCHING_FILEURL_FAILURE, payload: error.response });
			console.log(error);
		});
};

export const fetchFileFormat = () => dispatch => {
	dispatch({ type: FETCHING_FILEFORMAT_START });
	console.log('running single detail FF axios get');
	//https://images-assets.nasa.gov/image/as11-40-5874/metadata.json
	axios
		.get(`https://images-assets.nasa.gov/image/${this.props.nasaID}/metadata.json`)
		.then(response => {
			console.log('single detail metadata r = ' + [response]);
			console.log('single detail metadata d = ' + JSON.stringify(response));
			console.log('single detail metadata FS = ' + response.data['File:FileSize']);
			console.log('single detail metadata FF = ' + response.data['File:MIMEType']);
			let fileFormat = response.data['File:MIMEType'];
			let fileFormatString = toString(fileFormat).substring(0, 5);
			this.setState({
				fileSize: response.data['File:FileSize'],
				fileFormat: fileFormatString
			});

			dispatch({ type: FETCHING_FILEFORMAT_SUCCESS, payload: response });
			console.log('done getting metadata');
		})
		.catch(error => {
			dispatch({ type: FETCHING_FILEFORMAT_FAILURE, payload: error.response });
			console.log(error);
		});
};
