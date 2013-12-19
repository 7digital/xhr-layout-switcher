'use strict';
module.exports = function createNegotiator(opts) {
	opts = opts || {};
	return function layoutNegotiator(req, res, next) {
		res._render = res.render;
		res.render = function renderNegotiated() {
			var args = [].slice.call(arguments);

			if (req.xhr) {

				args[1] = args[1] || {};
				args[1].layout = opts.ajaxLayout || false;
			}

			return res._render.apply(res, args);
		};

		return next();
	};
};
