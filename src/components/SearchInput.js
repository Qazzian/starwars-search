import React from 'react';

import './SearchInput.css';

class SearchInput extends React.Component {
	render() {
		return (
			<input
				className="SearchInput"
				name="characterName"
				value={ this.props.search }
				onChange={ this.props.onChange }/>
		);
	}
};

export default SearchInput;
