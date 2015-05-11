'use strict';
module.exports = function createNegotiator(config) {
	config = config || {};
	return function layoutNegotiator(req, res, next) {
		var _render = res.render;
		res.render = function renderNegotiated(view, opts, fn) {
			if (!req.xhr) { return _render.apply(res, arguments); }

			opts = opts || {};

			if (typeof opts === 'function') {
				fn = opts;
				opts = {};
			}

			opts.layout = config.ajaxLayout;

			return _render.call(res, view, opts, fn);
		};

		return next();
	};
};
