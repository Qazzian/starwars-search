import React from 'react';

import FilmName from './FilmName';

import './FilmList.css';

export default class FilmList extends React.Component {
	render() {
		if (!this.props.filmList) {
			return null;
		}

		return (
			<section className="App-character-film-list">
				<h3>Appears in: </h3>
				<ul>
					{this.props.filmList.map((filmUrl) => {
						return (<li key={filmUrl}><FilmName url={filmUrl} swApi={this.props.swApi}/></li>)
					})}
				</ul>
			</section>
		)
	}
}
