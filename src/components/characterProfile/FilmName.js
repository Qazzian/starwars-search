import React from 'react';

export default class FilmName extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
		};
	}

	render() {
		return (this.state && this.state.name) || null;
	}

	fetchObjectName(url) {
		this.props.swApi.fetchRequest(url).then((responseJson) => {
			if (responseJson && responseJson.title) {
				this.setState({ name: responseJson.title });
				console.info('film title: ', responseJson.title);
			}
			else {
				this.setState({ name: '' });
			}
		});
	}

	componentWillMount() {
		this.fetchObjectName(this.props.url);
	}

	componentDidUpdate(prev) {
		if (this.props.url !== prev.url) {
			this.setState({ name: '' });
			this.fetchObjectName(this.props.url);
		}
	}
}

