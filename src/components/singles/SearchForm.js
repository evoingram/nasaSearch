import React from 'react';
import styled from 'styled-components';
import { Route, Link } from 'react-router-dom';
import { fetchSearchResults, adjustYearRange, turnPage } from '../../actions';
import Sorted from '../containers/Sorted.js';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// - search github users with `componentDidUpdate`

const Form = styled.form`
	width: 80%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-left: 5%;
`;
const Center = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
	margin: 0;
	padding: 0;
	padding-bottom: 3%;
`;
const Choices = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
	margin: 0;
	padding: 0;
`;
const Div1 = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const fieldLength = {
	fontSize: '2rem',
	width: '50%',
	margin: '0',
	padding: '0',
	backgroundColor: '#313332',
	color: '#B2B3A3',
	border: '5px solid #15418c'
};
const Input = styled.input`
	font-size: '2rem';
	width: '50%';
	margin: '0';
	padding: '0';
	background-color: '#313332';
	color: '#B2B3A3';
	border: '5px solid #15418c';
	&:focus {
		background-color: '#313332';
		color: '#B2B3A3';
		border: '5px solid #15418c';
	}
`;
const SearchDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	justify-content: center;
	padding: 0;
	margin: 0;
	align-items: top;
`;
const Button = styled.button`
	margin-top: 7%;
	margin-bottom: 7%;
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	border: none;
	padding-top: 7%;
	padding-bottom: 7%;
	font-size: 1rem;
	&:hover {
		background-color: #0e3579;
	}
`;
const Checks = styled.div`
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	width: 100%;
`;
const PaddingTop = styled.div`
	padding-top: 5%;
`;

class SearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			yearRangeLocal: [1920, 2020]
		};
	}

	valuetext(value) {
		return `${value}`;
	}

	handleChange = (event, newValue) => {
		console.log('yearRange Sorted newValue = ' + newValue);
		// setYearRange(newValue);
		this.setState({ yearRangeLocal: newValue });
		this.setState({ yearRange: this.state.yearRangeLocal });
		this.props.adjustYearRange(newValue);
		console.log('yearRange Sorted handleChange = ' + this.state.yearRangeLocal);
		console.log('yearRange Sorted handleChange = ' + this.props.yearRange);
	};

	render() {
		return (
			<Center>
				<Div1>
					<Form id="searchForm">
						<SearchDiv>
							<Input
								id="name"
								type="text"
								name="textfield"
								placeholder="Search"
								value={this.props.searchTerm}
								onChange={this.props.changeSearchTerm}
								style={fieldLength}
							/>
						</SearchDiv>
						<Choices>
							<Checks id="mediaFilters">
								<div id="images" className="filter">
									<input
										className="magic-checkbox"
										type="checkbox"
										name="imagecb"
										id="imagecb"
										value="option"
										defaultChecked
									/>
									<label htmlFor="imagecb"></label>
									<label className="text" htmlFor="imagecb">
										Images
									</label>
								</div>
								<div id="video" className="filter">
									<input
										className="magic-checkbox"
										type="checkbox"
										name="videocb"
										id="videocb"
										value="option"
										defaultChecked
									/>
									<label htmlFor="videocb"></label>
									<label className="text" htmlFor="videocb">
										Video
									</label>
								</div>
								<div id="audio" className="filter">
									<input
										className="magic-checkbox"
										type="checkbox"
										name="audiocb"
										id="audiocb"
										value="option"
										defaultChecked
									/>
									<label htmlFor="audiocb"></label>
									<label className="text" htmlFor="audiocb">
										Audio
									</label>
								</div>
							</Checks>
							<PaddingTop>
								<Typography id="range-slider" gutterBottom>
									Select a range from 1920 to 2020
								</Typography>
								<Slider
									min={1920}
									max={2020}
									value={this.state.yearRangeLocal}
									onChange={this.handleChange}
									valueLabelDisplay="auto"
									aria-labelledby="range-slider"
									getAriaValueText={this.valuetext}
								/>
							</PaddingTop>
							<br />
						</Choices>
						<div>
							<Link to="/search">
								<Button onClick={this.props.searchNASALibrary}>Search NASA's multimedia library</Button>
							</Link>
						</div>
					</Form>
				</Div1>
			</Center>
		);
	}
}

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		error: state.error,
		searchResults: state.searchResults,
		yearRange: state.yearRange,
		mediaType: state.mediaType,
		areSearchResults: state.areSearchResults,
		page: state.page
	};
};

export default connect(mapStateToProps, { fetchSearchResults, adjustYearRange, turnPage })(SearchForm);
