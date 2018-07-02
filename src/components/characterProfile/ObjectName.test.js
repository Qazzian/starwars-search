import React from 'react';
import ReactDOM from 'react-dom';

import ObjectName from './ObjectName';

class MockApi {
	constructor() {
		this.nextName = '';
	}

	fetchItemName() {
		return Promise.resolve(this.nextName);
	}
};

describe('ObjectName', () => {
	let mockApi;

	beforeEach(() => {
		mockApi = new MockApi();
	});

	afterEach(() => {
		mockApi = null;
	});

	it('renders without crashing', () => {
		expect(ObjectName).toBeDefined();
		mockApi.nextName = 'test1';

		const div = document.createElement('div');
		ReactDOM.render(<ObjectName url={''} swApi={mockApi}/>, div);

		// TODO work this out
		setTimeout(() => {
			expect(div.textContent).toEqual('test1');
			ReactDOM.unmountComponentAtNode(div);
		}, 10);
	});
});
