'use strict';
var assert = require('chai').assert;
var iSpy = require('i-spy');
var createNegotiator = require('../');

describe('middleware', function () {

	describe('partialNegotiation', function () {

		it('replaces render on the response', function (done) {
			var fakeResponse = { render: function () {} };
			var fakeRequest = { xhr: true };
			var middleware = createNegotiator();

			var nextSpy = iSpy.createSpy(function () {
				assert.equal(fakeResponse.render.name, 'renderNegotiated');
				done();
			});

			middleware(fakeRequest, fakeResponse, nextSpy);
		});

		it('renders full page when request is not XHR', function (done) {
			var fakeResponse = { render: iSpy.createSpy() };
			var fakeRequest = { xhr: false };
			var middleware = createNegotiator();

			middleware(fakeRequest, fakeResponse, function () {});

			fakeResponse.render('some-view', {});
			assert.ok(fakeResponse._render.wasCalled());
			assert.equal(fakeResponse._render.calls[0][0], 'some-view');
			assert.deepEqual(fakeResponse._render.calls[0][1], {});
			done();
		});

		it('renders partial page when request is XHR', function (done) {
			var fakeResponse = { render: iSpy.createSpy() };
			var fakeRequest = { xhr: true };
			var middleware = createNegotiator();

			middleware(fakeRequest, fakeResponse, function () {});

			fakeResponse.render('some-view');
			assert.ok(fakeResponse._render.wasCalled());
			assert.equal(fakeResponse._render.calls[0][0], 'some-view');
			assert.deepEqual(fakeResponse._render.calls[0][1], {
				layout: false
			});
			done();
		});

		it('renders using supplied layout  when request is XHR', function (done) {
			var fakeResponse = { render: iSpy.createSpy() };
			var fakeRequest = { xhr: true };
			var middleware = createNegotiator({
				ajaxLayout: 'foo'
			});

			middleware(fakeRequest, fakeResponse, function () {});

			fakeResponse.render('some-view', { layout: 'bar' });
			assert.ok(fakeResponse._render.wasCalled());
			assert.equal(fakeResponse._render.calls[0][0], 'some-view');
			assert.deepEqual(fakeResponse._render.calls[0][1], {
				layout: 'foo'
			});
			done();
		});
	});

});
