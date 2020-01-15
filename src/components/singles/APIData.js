import React from 'react';
// import styled from 'styled-components';

// get api info here

class APIData extends React.Component {
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
						<button>Search NASA files!</button>
					</Form>
				</Div1>
			</Center>
		);
	}
}

export default APIData;
