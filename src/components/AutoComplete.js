import React from 'react';

import './AutoComplete.css';

class AutoComplete extends React.Component {
	render() {
		if (this.props.searchResults.length > 0) {
			return this.resultList(this.props.searchResults);
		}

		return null;
	}

	resultList(results) {
		return (
			<ul className="App-autocomplete">
				{ results.map((person) => this.singleResult(person)) }
			</ul>
		);
	}

	singleResult(person) {
		return (
			<li key={ person.url }>
				<a onClick={ this.props.selectPerson }
				   href={ person.url }>
					{ person.name }</a>
			</li>
		);
	}
}

export default AutoComplete;
