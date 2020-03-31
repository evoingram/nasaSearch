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

class PlayerC extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			(this.props.mediaType == 'video' && (
				<div>
					<h2>PLAYER COMPONENT:</h2>
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
						</ControlBar>
					</Player>
				</div>
			)) ||
			(this.props.mediaType == 'audio' && (
				<div>
					<h2>PLAYER COMPONENT:</h2>
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
				</div>
			)) ||
			(this.props.mediaType == 'image' && (
				<div>
					<h2>IMAGE COMPONENT:</h2>
					<img src={this.props.thumbnailURL} />
				</div>
			))
		);
	}
}
export default PlayerC;
