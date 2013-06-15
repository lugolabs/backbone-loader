var app = app || {};

app.LoaderModel = Backbone.Model.extend({
	urlRoot: '/',

	fetch: function() {
		console.log(44);
		this.trigger('fetch:start');
		console.log(55);
		this.constructor.__super__.fetch.apply(this, arguments);
	}

});

app.LoaderView = Backbone.View.extend({
	initialize: function() {
		this.model.on('fetch:start', this.loading, this);
	},

	loading: function() {
		this._loading = true;
	}
});