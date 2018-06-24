import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import swApi from './Modals/swApi';

import SearchInput from './components/SearchInput';

class App extends Component {
	constructor(props) {
		super(props);
		this.swApi = new swApi();
		this.state = {
			searchTerm: '',
			searchResults: [],
			selectedCharacter: null,
		};

		this.onSearch = this.onSearch.bind(this);
	}

	autocompleteTemplate() {
		return this.state.searchResults.map((person) => {
			return (<li>{ person.name }</li>);
		});
	}

	render() {
		return (
			<section className="App">
				<header className="App-header">
					<img src={ logo } className="App-logo" alt=""/>
					<h1 className="App-title">Star Wars Character finder</h1>
				</header>
				<div className="App-body">
					<SearchInput search={ this.state.searchTerm } onChange={ this.onSearch }/>
					{ this.state.searchResults.length ? (<ul>{ this.autocompleteTemplate() }</ul>) : '' }
				</div>

			</section>
		);
	}

	onSearch(event) {
		const inputValue = event.target.value;
		this.setState({ searchTerm: inputValue });
		this.swApi.searchNames(inputValue)
			.then((foundCharacters) => {
				this.setState({ searchResults: foundCharacters });
			});

	}
}

export default App;
