import Cache from './Cache';

export default class swApi {
	constructor(errorHandler) {
		this.rootUrl = 'https://swapi.co/api/';
		this.errorHandler = errorHandler;
		this.cache = new Cache();
	}

	fetchRequest(url, options = {}) {
		if (this.cache.hasKey(url)) {
			return Promise.resolve(this.cache.getKey(url));
		}

		return window.fetch(url, options).then((response) => {
			if (response.ok && response.status === 200) {
				const jsonPromise = response.json()
				jsonPromise.then((jsonResponse) => {
					this.cache.setKey(url, jsonResponse);
				});
				return jsonPromise;
			}
			else {
				throw new Error(`Connection Error: ${response.status}`);
			}
		});
	}

	searchNames(search) {
		this.abortRequest();
		const url = `${this.rootUrl}people/?search=${search}`;
		const options = {
			signal: this.createAbortSignal(),
		};

		return this.fetchRequest(url, options).then((responseJson) => {
			if (responseJson && responseJson.results) {
				this.cacheResponseList(responseJson.results);
				return responseJson.results;
			}
			else {
				return [];
			}
		}).catch((error) => {
			return this.handleErrorResponse(error);
		});
	}

	abortRequest() {
		if (this.abortController) {
			this.abortController.abort();
			delete this.abortController;
		}
	}

	createAbortSignal() {
		this.abortController = new window.AbortController();
		return this.abortController.signal;
	}

	handleErrorResponse(error) {
		switch (error.code) {
			case 20:
				return [];
			default:
				if (typeof this.errorHandler === 'function') {
					this.errorHandler(error);
					return [];
				}
				break
		}
	}

	fetchPersonDetails(personUrl) {
		return this.fetchRequest(personUrl).then((responseJson) => {
			const characterData = responseJson;

			return characterData;
		});
	}

	fetchItemNames(urls) {
		const urlList = !Array.isArray(urls) ? [urls] : urls;

		Promise.all(urlList.map((url) => {
			return this.fetchItemName(url);
		}));
	}

	fetchItemName(url) {
		if (typeof url !== 'String' || url === 'unknown') {
			return Promise.resolve('unknown');
		}
		return this.fetchRequest(url).then((responseJson) => {
			if (responseJson && responseJson.name) {
				return responseJson.name;
			}
			return '';
		});
	}

	cacheResponseList(responseList) {
		responseList.forEach((item) => {
			this.cache.setKey(item.url, item);
		})
	}
}
