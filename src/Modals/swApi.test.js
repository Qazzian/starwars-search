import swApi from './swApi';

describe('swApi', () => {
	beforeEach(() => {
		fetch.resetMocks()
	});

	afterEach(() => {
	});

	it('should be defined', (done) => {
		expect(swApi).toBeDefined();
		const api = new swApi();
		expect(api).toBeDefined();
		expect(api.rootUrl).toBe('https://swapi.co/api/');
		done();
	});

	it('should fetch results', (done) => {
		const api = new swApi();
		window.fetch.mockResponseOnce(JSON.stringify(mockData));
		api.searchNames('lu').then((results) => {
			expect(results).toBeDefined();
			expect(results.length).toEqual(2);
			expect(results[0].name).toEqual('Luke Skywalker');
			done();
		})
	});


});

const mockData = {
	"count": 2,
	"next": null,
	"previous": null,
	"results": [
		{
			"name": "Luke Skywalker",
			"height": "172",
			"mass": "77",
			"hair_color": "blond",
			"skin_color": "fair",
			"eye_color": "blue",
			"birth_year": "19BBY",
			"gender": "male",
			"homeworld": "https://swapi.co/api/planets/1/",
			"films": [
				"https://swapi.co/api/films/2/",
				"https://swapi.co/api/films/6/",
				"https://swapi.co/api/films/3/",
				"https://swapi.co/api/films/1/",
				"https://swapi.co/api/films/7/"
			],
			"species": [
				"https://swapi.co/api/species/1/"
			],
			"vehicles": [
				"https://swapi.co/api/vehicles/14/",
				"https://swapi.co/api/vehicles/30/"
			],
			"starships": [
				"https://swapi.co/api/starships/12/",
				"https://swapi.co/api/starships/22/"
			],
			"created": "2014-12-09T13:50:51.644000Z",
			"edited": "2014-12-20T21:17:56.891000Z",
			"url": "https://swapi.co/api/people/1/"
		},
		{
			"name": "Luminara Unduli",
			"height": "170",
			"mass": "56.2",
			"hair_color": "black",
			"skin_color": "yellow",
			"eye_color": "blue",
			"birth_year": "58BBY",
			"gender": "female",
			"homeworld": "https://swapi.co/api/planets/51/",
			"films": [
				"https://swapi.co/api/films/5/",
				"https://swapi.co/api/films/6/"
			],
			"species": [
				"https://swapi.co/api/species/29/"
			],
			"vehicles": [],
			"starships": [],
			"created": "2014-12-20T16:45:53.668000Z",
			"edited": "2014-12-20T21:17:50.455000Z",
			"url": "https://swapi.co/api/people/64/"
		}
	]
}
