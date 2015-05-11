'use strict';
var assert = require('chai').assert;
var iSpy = require('i-spy');
var createNegotiator = require('./');

describe('XHR Layout Switcher', function () {
	var req, res, render;
	beforeEach(function () {
		req = {};
		render = iSpy.createSpy();
		res = { render: render };
	});

	describe('for an AJAX request', function () {
		beforeEach(function () { req.xhr = true; });

		it('renders AJAX layout with a view name', function () {
			var middleware = createNegotiator({ ajaxLayout: 'foo' });

			middleware(req, res, function () {});
			res.render('some-view');

			assert.lengthOf(render.calls, 1, 'render');
			assert.equal(render.calls[0][0], 'some-view', 'view');
			assert.deepEqual(render.calls[0][1], { layout: 'foo' }, 'options');
			assert.isUndefined(render.calls[0][2], 'callback');
		});

		it('renders AJAX layout with a view name and options', function () {
			var middleware = createNegotiator({ ajaxLayout: 'foo' });

			middleware(req, res, function () {});
			res.render('some-view', {});

			assert.lengthOf(render.calls, 1, 'render');
			assert.equal(render.calls[0][0], 'some-view', 'view');
			assert.deepEqual(render.calls[0][1], { layout: 'foo' }, 'options');
			assert.isUndefined(render.calls[0][2], 'callback');
		});

		it('renders AJAX layout with a view name and a callback', function () {
			var middleware = createNegotiator({ ajaxLayout: 'foo' });
			var fn = function () {};

			middleware(req, res, function () {});
			res.render('some-view', fn);

			assert.lengthOf(render.calls, 1, 'render');
			assert.equal(render.calls[0][0], 'some-view', 'view');
			assert.deepEqual(render.calls[0][1], { layout: 'foo' }, 'options');
			assert.equal(render.calls[0][2], fn, 'callback');
		});

		it('renders AJAX layout with a view name, options and a callback', function () {
			var middleware = createNegotiator({ ajaxLayout: 'foo' });
			var fn = function () {};

			middleware(req, res, function () {});
			res.render('some-view', {}, fn);

			assert.lengthOf(render.calls, 1, 'render');
			assert.equal(render.calls[0][0], 'some-view', 'view');
			assert.deepEqual(render.calls[0][1], { layout: 'foo' }, 'options');
			assert.equal(render.calls[0][2], fn, 'callback');
		});
	});

	describe('for a non-AJAX request', function () {
		beforeEach(function () { req.xhr = false; });

		it('renders without switching layout', function () {
			var middleware = createNegotiator();

			middleware(req, res, function () {});
			res.render('some-view', {});

			assert.lengthOf(render.calls, 1, 'render');
			assert.equal(render.calls[0][0], 'some-view', 'view');
			assert.deepEqual(render.calls[0][1], {}, 'options');
			assert.isUndefined(render.calls[0][2], 'callback');
		});
	});
});
