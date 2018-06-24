import React from 'react';

class SearchInput extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<input name="characterName"
				   value={this.props.search}
				   onChange={this.props.onChange}/>
		);
	}

};

export default SearchInput;
