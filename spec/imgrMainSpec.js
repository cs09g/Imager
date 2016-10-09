var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig({
    spec_dir: 'spec',
    spec_files: [
        '*Spec.js'
    ],
});

var imgrMain = require('../static/js/imgrMain.js');

describe('makePinterestGrid', function() {
	it('makes pinterest style grid', function() {

	});
});

describe('shouldLoad', function() {
	var shouldLoad = imgrMain.shouldLoad;

	it('makes decision to load more', function() {
		expect(shouldLoad(600, 0, 0)).toBe(false);
		expect(shouldLoad(600, 0, 400)).toBe(true);
	});
});

	
jasmine.execute();