import React from 'react';
import styled from 'styled-components';

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
	margin-top: 2%;
	margin-bottom: 2%;
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	border: none;
	padding-top: 2%;
	padding-bottom: 2%;
`;
const Checks = styled.div`
	display: flex;
	flex-wrap: nowrap;
	justify-content: center;
	width: 100%;
`;
class SearchForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Center>
				<Div1>
					<Form id="searchForm">
						<SearchDiv>
							<input
								id="name"
								type="text"
								name="textfield"
								placeholder="Search"
								value={this.props.searchTerm}
								onChange={this.props.changeSearchTerm}
								style={fieldLength}
							/>
						</SearchDiv>
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
						<Button onClick={this.props.searchNASALibrary}>Search NASA's multimedia library</Button>
					</Form>
				</Div1>
			</Center>
		);
	}
}

export default SearchForm;
