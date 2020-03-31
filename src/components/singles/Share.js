import React from 'react';
import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	PinterestShareButton,
	PocketShareButton,
	RedditShareButton,
	TumblrShareButton,
	TwitterShareButton,
	WhatsappShareButton,
	EmailIcon,
	FacebookIcon,
	LinkedinIcon,
	PinterestIcon,
	PocketIcon,
	RedditIcon,
	TumblrIcon,
	TwitterIcon,
	WhatsappIcon
} from 'react-share';

class Share extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		console.log('share component url = ' + this.props.fileURL);
		return (
			this.props.fileURL && (
				<div>
					<p>Share this media:</p>
					<EmailShareButton url={this.props.fileURL}>
						<EmailIcon size={62} round={true} />
					</EmailShareButton>
					<FacebookShareButton url={this.props.fileURL}>
						<FacebookIcon size={62} round={true} />
					</FacebookShareButton>{' '}
					<LinkedinShareButton url={this.props.fileURL}>
						<LinkedinIcon size={62} round={true} />
					</LinkedinShareButton>
					<PinterestShareButton url={this.props.fileURL} media={this.props.fileURL}>
						<PinterestIcon size={62} round={true} />
					</PinterestShareButton>
					<PocketShareButton url={this.props.fileURL}>
						<PocketIcon size={62} round={true} />
					</PocketShareButton>
					<RedditShareButton url={this.props.fileURL}>
						<RedditIcon size={62} round={true} />
					</RedditShareButton>{' '}
					<TumblrShareButton url={this.props.fileURL}>
						<TumblrIcon size={62} round={true} />
					</TumblrShareButton>{' '}
					<TwitterShareButton url={this.props.fileURL}>
						<TwitterIcon size={62} round={true} />
					</TwitterShareButton>
					<WhatsappShareButton url={this.props.fileURL}>
						<WhatsappIcon size={62} round={true} />
					</WhatsappShareButton>
				</div>
			)
		);
	}
}

export default Share;
