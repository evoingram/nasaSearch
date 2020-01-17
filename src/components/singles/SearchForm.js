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
	fontSize: '1.5rem',
	width: '50%',
	margin: '0',
	padding: '0'
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
	background-color: #15418c;
	color: white;
	font-family: 'Audiowide', cursive;
	border: none;
	padding-top: 2%;
	padding-bottom: 2%;
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
						<Button>Search NASA's multimedia library!</Button>
					</Form>
				</Div1>
			</Center>
		);
	}
}

export default SearchForm;
