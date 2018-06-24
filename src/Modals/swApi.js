export default class swApi {
	constructor() {
		this.rootUrl = 'https://swapi.co/api/';
	}

	searchNames(search) {
		const url = `${this.rootUrl}people/?search=${search}`;

		return window.fetch(url).then((response) => {
			if (response.ok) {
				return response.json();
			}
		}).then((responseJson) => {
			if (responseJson && responseJson.count) {
				return responseJson.results;
			}
		});
	}


}
