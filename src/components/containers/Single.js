import React from 'react';
import styled from 'styled-components';
import PlayerC from '../singles/Player.js';
import Share from '../singles/Share.js';
import FilePath from '../singles/FilePath.js';
import FileInfo from '../singles/FileInfo.js';
import Explanation from '../singles/Explanation.js';
import { connect } from 'react-redux';
import { fetchActivity } from '../../actions';

const Div = styled.div`
	width: 50%;
	margin: 0%;
	padding: 0%;
`;

const firstColumn = {
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'row',
	maxWidth: '60%',
	padding: '3%',
	margin: '0%',
	marginTop: '5%',
	width: '60%'
};
const secondColumn = {
	display: 'flex',
	flexWrap: 'wrap',
	flexDirection: 'row',
	maxWidth: '30%',
	padding: '3%',
	margin: '0%',
	width: '30%'
};
const container = {
	display: 'flex',
	flexWrap: 'nowrap',
	flexDirection: 'row',
	flex: '1',
	width: '100%',
	overflow: 'hidden'
};
const DivChildren = styled.div`
	width: 100%;
`;

class Single extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	componentDidMount() {
		this.props.getSingleResult();
		console.log('center shorthand = ' + this.props.center);
		console.log('centerLink shorthand = ' + this.state.centerLink);
		if (this.props.center === 'JPL') {
			this.setState({ centerLink: 'http://www.jpl.nasa.gov' });
		}
		if (this.props.center === 'HQ') {
			this.setState({ centerLink: 'http://www.nasa.gov/centers/hq/home/index.html' });
		}
		if (this.props.center === 'KSC') {
			this.setState({ centerLink: 'http://www.nasa.gov/centers/kennedy/home/index.html' });
		}
		if (this.props.center === 'GSFC') {
			this.setState({ centerLink: 'https://www.nasa.gov/centers/goddard/home/index.html' });
		}
		if (this.props.center === 'ARC') {
			this.setState({ centerLink: 'http://www.nasa.gov/centers/ames/home/index.html' });
		}
		if (this.props.center === 'AFRC') {
			this.setState({ centerLink: 'http://www.nasa.gov/centers/armstrong/home/index.html' });
		}
		if (this.props.center === 'GRC') {
			this.setState({ centerLink: 'ttp://www.nasa.gov/centers/glenn/home/index.html' });
		}
		if (this.props.center === 'GISS') {
			this.setState({ centerLink: 'http://www.giss.nasa.gov/' });
		}
		if (this.props.center === 'IVV') {
			this.setState({ centerLink: 'http://www.nasa.gov/centers/ivv/home/index.html' });
		}
		if (this.props.center === 'LRC') {
			this.setState({ centerLink: 'http://www.nasa.gov/centers/langley/home/index.html' });
		}
		if (this.props.center === 'MSFC') {
			this.setState({ centerLink: 'http://www.nasa.gov/centers/marshall/home/index.html' });
		}
		if (this.props.center === 'MAF') {
			this.setState({
				centerLink: 'http://www.nasa.gov/centers/marshall/michoud/index.html'
			});
		}
		if (this.props.center === 'ESC') {
			this.setState({ centerLink: 'http://www.nasa.gov/offices/nesc/home/' });
		}
		if (this.props.center === 'NESC') {
			this.setState({ centerLink: 'http://www.nasa.gov/offices/nesc/home/' });
		}
		if (this.props.center === 'NSC') {
			this.setState({ centerLink: 'http://www.nasa.gov/offices/nsc/home/index.html' });
		}
		if (this.props.center === 'NSSC') {
			this.setState({ centerLink: 'http://www.nssc.nasa.gov/' });
		}
		if (this.props.center === 'PBS') {
			this.setState({
				centerLink: 'http://www.nasa.gov/centers/glenn/about/testfacilities/index.html'
			});
		}
		if (this.props.center === 'SSC') {
			this.setState({ centerLink: 'http://www.nasa.gov/centers/stennis/home/index.html' });
		}
		if (this.props.center === 'WFF') {
			this.setState({ centerLink: 'http://www.nasa.gov/centers/wallops/home/index.html' });
		}
		if (this.props.center === 'WSTF') {
			this.setState({ centerLink: 'http://www.nasa.gov/centers/wstf/home/index.html' });
		}
		console.log('shorthand centerLink end = ' + this.state.centerLink);
	}
	render() {
		return (
			this.props.nasaID !== '' &&
			this.props.mediaType !== '' && (
				<div style={container}>
					{!this.props.singleResult && !this.props.isLoading && <p>Loading...</p>}
					{this.props.singleResult && !this.props.isLoading && (
						<div>
							<div style={container}>
								<Div className="firstColumn" style={firstColumn}>
									<PlayerC
										thumbnailURL={this.props.singleResult.links[0].href}
										fileURL={this.props.fileURL}
										mediaType={this.props.mediaType}
										captionsURL={this.props.captionsURL}
									/>
									<Share fileURL={this.props.fileURL} width="100%" />
								</Div>
								<Div className="secondColumn" style={secondColumn}>
									<DivChildren>
										<FilePath
											nasaID={this.props.singleResult.data[0].nasa_id}
											title={this.props.singleResult.data[0].title}
											fileURL={this.props.fileURL}
											fileSize={this.props.fileSize}
											fileFormat={this.props.singleResult.data[0].media_type}
											centerLink={this.props.centerLink}
										/>
									</DivChildren>
									<DivChildren>
										<FileInfo
											nasaID={this.props.singleResult.data[0].nasa_id}
											fileURL={this.props.fileURL}
											keywords={this.props.singleResult.data[0].keywords.toString()}
											center={this.props.singleResult.data[0].center}
											dateCreated={this.props.singleResult.data[0].date_created.substring(0, 10)}
											centerURL={this.props.centerURL}
											explanation={this.props.singleResult.data[0].description}
											centerLink={this.state.centerLink}
										/>
									</DivChildren>
								</Div>
							</div>
							<Explanation explanation={this.props.singleResult.data[0].description} />
						</div>
					)}
				</div>
			)
		);
	}
}
const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		error: state.error,
		singleResult: state.singleResult,
		nasaID: state.nasaID,
		center: state.center,
		mediaType: state.mediaType,
		fileSize: state.fileSize,
		fileURL: state.fileURL
	};
};

export default connect(mapStateToProps, { fetchActivity })(Single);
