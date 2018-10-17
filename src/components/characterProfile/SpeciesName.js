import React from 'react';

class SpeciesName extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
		};
	}

	render() {
		return (this.state && this.state.name) || null;
	}

	fetchObjectName(urls) {
		this.props.swApi.fetchItemNames(this.props.urls).then((response) => {
			if (response) {
				this.setState({ name: response });
			}
		});
	}

	componentWillMount() {
		this.fetchObjectName(this.props.urls);
	}

	componentDidUpdate(prev) {
		if (this.props.urls !== prev.urls) {
			this.setState({name: ''});
			this.fetchObjectName(this.props.urls);
		}
	}
}

export default SpeciesName;
