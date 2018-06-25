import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import swApi from './Modals/swApi';

import SearchInput from './components/SearchInput';
import Autocomplete from './components/Autocomplete';

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
		this.onSelectPerson = this.onSelectPerson.bind(this);
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
					<h1 className="App-title">Star Wars Character Finder</h1>
				</header>
				<div className="App-body">
					<SearchInput search={ this.state.searchTerm } onChange={ this.onSearch }/>
					<Autocomplete searchResults={ this.state.searchResults }
								  selectPerson={ this.onSelectPerson }/>
				</div>
				<div className="App-selected">
					{this.state.selectedCharacter}
				</div>

			</section>
		);
	}

	onSearch(event) {
		const inputValue = event.target.value;
		this.setState({ searchTerm: inputValue });

		if (inputValue) {
			this.swApi.searchNames(inputValue)
				.then((foundCharacters) => {
					this.setState({ searchResults: foundCharacters });
				});
		}
		else {
			this.setState({ searchResults: [] });
		}

	}

	onSelectPerson(event) {
		event.preventDefault();
		this.setState({ selectedCharacter: event.target.href });
	}
}

export default App;
