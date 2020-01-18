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
	WhatsappShareButton
} from 'react-share';

class Share extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>Share this media:</p>
					<EmailShareButton url={this.props.fileURL} />
					<FacebookShareButton url={this.props.fileURL} />
					<LinkedinShareButton url={this.props.fileURL} />
					<PinterestShareButton url={this.props.fileURL} />
					<PocketShareButton url={this.props.fileURL} />
					<RedditShareButton url={this.props.fileURL} />
					<TumblrShareButton url={this.props.fileURL} />
					<TwitterShareButton url={this.props.fileURL} />
					<WhatsappShareButton url={this.props.fileURL} />
				</header>
			</div>
		);
	}
}

export default Share;
