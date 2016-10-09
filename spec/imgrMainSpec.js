var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfig({
    spec_dir: 'spec',
    spec_files: [
        '*Spec.js'
    ],
});

var Imager = require('../static/layout/body/common_bd.ejs');
//var imager = new Imager();

console.log(Imager);
describe('makePinterestGrid', function() {
	it('makes pinterest style grid', function() {

	});
});

describe('shouldLoad', function() {
	var imager = new Imager();
	var shouldLoad = imager.shouldLoad;
	console.log(imager);
	it('makes decision to load more', function() {
		expect(shouldLoad(600, 0, 0)).toBe(false);
		expect(shouldLoad(600, 0, 400)).toBe(true);
	});
});

	
jasmine.execute();