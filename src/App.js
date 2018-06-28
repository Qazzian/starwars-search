import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import swApi from './Modals/swApi';

import SearchInput from './components/SearchInput';
import AutoComplete from './components/AutoComplete';
import CharacterProfile from './components/CharacterProfile';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			searchResults: [],
			selectedCharacter: null,
			errorMessage: '',
		};

		this.onFetchError = this.onFetchError.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onSelectPerson = this.onSelectPerson.bind(this);

		this.swApi = new swApi(this.onFetchError);
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
					<ErrorMessage message={ this.state.errorMessage }/>
					<AutoComplete searchResults={ this.state.searchResults }
								  selectPerson={ this.onSelectPerson }/>
				</div>
				<div className="App-selected">
					<CharacterProfile characterUrl={this.state.selectedCharacter} swApi={this.swApi}/>
				</div>

			</section>
		);
	}

	onSearch(event) {
		const inputValue = event.target.value;
		this.setState({
			searchTerm: inputValue,
			errorMessage: '',
		});

		if (inputValue) {
			this.swApi.searchNames(inputValue)
				.then((foundCharacters) => {
					this.setState({ searchResults: foundCharacters });
				});
		}
		else {
			this.swApi.abortRequest();
			this.setState({ searchResults: [] });
		}

	}

	onSelectPerson(event) {
		event.preventDefault();
		this.setState({ selectedCharacter: event.target.href });
	}

	onFetchError(error) {
		this.setState({
			errorMessage: 'Could not connect to the internet. Please check your network connection.',
			searchResults: [],
			selectedCharacter: null,
		});
	}
}

class ErrorMessage extends React.Component {
	render() {
		return (
			<p className="App-error">
				{ this.props.message }
			</p>
		);
	}
}

export default App;
