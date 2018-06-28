export default class Cache {
	constructor() {
		this.data = {};
	}

	hasKey(key) {
		return this.data.hasOwnProperty(key);
	}

	getKey(key) {
		if (this.hasKey(key)) {
			return this.data[key];
		}
	}

	setKey(key, value) {
		this.data[key] = value;
	}
}
