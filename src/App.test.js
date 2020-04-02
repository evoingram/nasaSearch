import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialState, reducer } from './reducers/index.js';

// jest.mock('../api');

function renderWithRedux(ui, { initialState, store = createStore(reducer, initialState) } = {}) {
	return {
		...render(<Provider store={store}>{ui}</Provider>),
		// adding `store` to the returned utilities to allow us
		// to reference it in our tests (just try to avoid using
		// this to test implementation details).
		store
	};
}

/*
test('can render with redux with defaults', () => {
	const { getByTestId, getByText } = renderWithRedux(<App />);
	const linkElement = getByText(/Welcome to Erica Ingram's NASA Multimedia Library Search React Redux Clone/i);
	expect(linkElement).toBeInTheDocument();
});
*/
test('renders welcome text', () => {
	const { getByText } = render(<App />);
	const linkElement = getByText(/Welcome to Erica Ingram's NASA Multimedia Library Search React Redux Clone/i);
	expect(linkElement).toBeInTheDocument();
});
