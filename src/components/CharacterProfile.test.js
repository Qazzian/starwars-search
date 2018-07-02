import React from 'react';
import ReactDOM from 'react-dom';

import CharacterProfile from './CharacterProfile';
import swApi from '../Modals/swApi';

const mockApi = {
	mockPerson: null,
	fetchPersonDetails: (url) => {
		console.info('fetch person', url);
		return Promise.resolve(mockApi.mockPerson);
	}
};

describe('CharacterProfile', () => {
	it('should be defined', (done) => {
		expect(CharacterProfile).toBeDefined();
		done();
	});

	it('should render without errors', (done) => {
		const div = document.createElement('div');
		ReactDOM.render(<CharacterProfile/>, div);
		ReactDOM.unmountComponentAtNode(div);
		done();
	});

	it('should render the profile', (done) => {
		const div = document.createElement('div');
		const mockPerson = {
			name: 'Test Name',
			gender: 'Male',
			species: 'Human',
			homeworld: 'Earth',
			films: ['f1', 'f2', 'f3']
		};
		mockApi.mockPerson = mockPerson;
		ReactDOM.render(<CharacterProfile url={'test1'} swApi={ mockApi }/>, div);
		setTimeout(() => {
			expect(div).toMatchSnapshot('CharacterProfile');
			ReactDOM.unmountComponentAtNode(div);
			done();
		}, 10);
	});
});
