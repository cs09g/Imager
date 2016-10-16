var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig({
    spec_dir: 'spec',
    spec_files: [
        '*Spec.js'
    ],
});

describe('makePinterestGrid', function() {
	it('makes pinterest style grid', function() {

	});
});

describe('shouldLoad', function() {
	var imager = new Imager();
	var shouldLoad = imager.shouldLoad;
	
	it('makes decision to load more', function() {
		expect(shouldLoad(600, 0, 0)).toBe(false);
		expect(shouldLoad(600, 0, 400)).toBe(true);
	});
});

	
jasmine.execute();
