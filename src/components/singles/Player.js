import React from 'react';
import {
	Player,
	ControlBar,
	ReplayControl,
	ForwardControl,
	CurrentTimeDisplay,
	TimeDivider,
	PlaybackRateMenuButton,
	VolumeMenuButton
} from 'video-react';

class PlayerC extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Player poster="http://images-assets.nasa.gov/video/Apollo 11 Overview/Apollo 11 Overview~thumb.jpg">
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
		);
	}
}
export default PlayerC;
