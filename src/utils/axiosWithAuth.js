import axios from 'axios';

// NOT IMPLEMENTED
// don't think we'll be using this, but we'll see

export const axiosWithAuth = () => {
	return axios.create({
		// config object
		baseURL: 'http://localhost:5000',
		headers: {
			Authorization: localStorage.getItem('token')
		}
	});
};
