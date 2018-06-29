import Cache from './Cache';

describe('Cache', () => {

	it('should be defined', (done) => {
		expect(Cache).toBeDefined();
		done();
	});

	it('should saveObjects', (done) => {
		const cache = new Cache();
		cache.setKey('test1', 'Hello World');
		expect(cache.getKey('test1')).toEqual('Hello World');
		done();
	});

	it('should return undefined if the key is not saved', (done) => {
		const cache = new Cache();
		expect(cache.getKey('test2')).toBeUndefined();
		done();
	});
});
