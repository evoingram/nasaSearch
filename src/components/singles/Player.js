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
		const track = (
			<track
				kind="captions"
				srclang="en-US"
				label="English"
				default
				src={this.props.fileURL.filter(currentLink => {
					return currentLink.includes('srt');
				})}
			/>
		);
		console.log(
			'Checking Player fileURL = ' +
				this.props.fileURL.filter(currentLink => {
					return currentLink.includes('~orig');
				})
		);
		console.log(
			'Checking Player captions = ' +
				this.props.fileURL.filter(currentLink => {
					return currentLink.includes('srt');
				})
		);
		return (
			(this.props.mediaType == 'video' && (
				<Div>
					<Player
						poster={this.props.thumbnailURL}
						playsInline
						src={this.props.fileURL.filter(currentLink => {
							return currentLink.includes('~orig');
						})}
					>
						<source
							src={this.props.fileURL.filter(currentLink => {
								return currentLink.includes('~orig');
							})}
						/>
						<track
							kind="captions"
							src={this.props.fileURL.filter(currentLink => {
								return currentLink.includes('srt');
							})}
							srcLang="en"
							label="English"
							default
						/>
						<ControlBar>
							<ReplayControl seconds={10} order={1.1} />
							<ForwardControl seconds={30} order={1.2} />
							<CurrentTimeDisplay order={4.1} />
							<TimeDivider order={4.2} />
							<PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
							<VolumeMenuButton enabled />
							<ClosedCaptionButton order={7} enabled />
						</ControlBar>
					</Player>
				</Div>
			)) ||
			(this.props.mediaType == 'audio' && (
				<Div>
					<Player poster={this.props.thumbnailURL}>
						<source
							src={this.props.fileURL.filter(currentLink => {
								return currentLink.includes('~orig');
							})}
						/>
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
