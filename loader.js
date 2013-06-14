var app = app || {};

app.LoaderModel = Backbone.Model.extend({
	urlRoot: '/',

	fetch: function() {
		this.trigger('fetch:start');
		this.constructor.__super__.fetch.apply(this, arguments);
	}

});