import React from 'react';

import './CharacterProfile.css';

import ObjectName from './characterProfile/ObjectName';
import FilmList from './characterProfile/FilmList';

class CharacterProfile extends React.Component {
	constructor(props) {
		super(props);

		this.swApi = props.swApi;

		this.state = {
			characterProfile: null,
		}
	}

	render() {

		if (!this.state.characterProfile) {
			return null;
		}

		return (
			<article className="App-character-profile">
				<h2>{this.state.characterProfile.name}</h2>
				<div>
					<p className="App-character-profile__species-gender">
						<span>{this.state.characterProfile.gender}</span>
						{' '}
						<span><ObjectName url={this.state.characterProfile.species} swApi={this.swApi}/></span>

					</p>
					<p>Born: {this.state.characterProfile.birth_year}</p>
					<p>Home world: <ObjectName url={this.state.characterProfile.homeworld} swApi={this.swApi}/></p>
					<FilmList filmList={this.state.characterProfile.films} swApi={this.swApi}/>
				</div>
			</article>
		);
	}

	componentDidMount() {

	}

	componentDidUpdate(prev) {
		if (this.props.characterUrl !== prev.characterUrl) {
			this.getCharacterData();
		}
	}

	getCharacterData() {
		this.swApi.fetchPersonDetails(this.props.characterUrl).then((responses) => {
			console.info('fetchPersonDetails response:', responses);
			this.setState({characterProfile: responses});
		})
	}
}

export default CharacterProfile;
