import React from 'react';
import {
	Player,
	ControlBar,
	ReplayControl,
	ForwardControl,
	CurrentTimeDisplay,
	TimeDivider,
	PlaybackRateMenuButton,
	VolumeMenuButton,
	ClosedCaptionButton
} from 'video-react';
import styled from 'styled-components';

const Div = styled.div`
	width: 100%;
	margin: 0%;
	padding: 0%;
`;
const Img = styled.img`
	width: 100%;
`;
class PlayerC extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			(this.props.mediaType == 'video' && (
				<Div>
					<Player poster={this.props.thumbnailURL}>
						<source src={this.props.fileURL} />
						<track kind="captions" src={this.props.captionsURL} srcLang="en" label="English" default />
						<ControlBar>
							<ReplayControl seconds={10} order={1.1} />
							<ForwardControl seconds={30} order={1.2} />
							<CurrentTimeDisplay order={4.1} />
							<TimeDivider order={4.2} />
							<PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
							<VolumeMenuButton enabled />
							<ClosedCaptionButton enabled />
						</ControlBar>
					</Player>
				</Div>
			)) ||
			(this.props.mediaType == 'audio' && (
				<Div>
					<Player poster={this.props.thumbnailURL}>
						<source src={this.props.fileURL} />
						<ControlBar>
							<ReplayControl seconds={10} order={1.1} />
							<ForwardControl seconds={30} order={1.2} />
							<CurrentTimeDisplay order={4.1} />
							<TimeDivider order={4.2} />
							<PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
							<VolumeMenuButton enabled />
						</ControlBar>
					</Player>
				</Div>
			)) ||
			(this.props.mediaType == 'image' && (
				<Div>
					<Img src={this.props.thumbnailURL} />
				</Div>
			))
		);
	}
}
export default PlayerC;
