import React from 'react';

class ObjectName extends React.Component {
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
		this.props.swApi.fetchItemName(this.props.url).then((response) => {
			console.info('Name response: ', response);
			if (response) {
				this.setState({ name: response });
			}
		});
	}

	componentWillMount() {
		this.fetchObjectName(this.props.url);
	}

	componentDidUpdate(prev) {
		if (this.props.url !== prev.url) {
			this.setState({name: ''});
			this.fetchObjectName(this.props.url);
		}
	}
}

export default ObjectName;
