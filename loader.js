var app = app || {};

app.LoaderModel = Backbone.Model.extend({
	urlRoot: '/',

	fetch: function() {
		this.trigger('fetch:start');
		this.constructor.__super__.fetch.apply(this, arguments);
	},

	// emulate a server call with a delay
	sync: function(method, model, options) {
		setTimeout(function() {
			options.success({name: 'test'});
		}, 1000);
	}

});

app.LoaderView = Backbone.View.extend({
	initialize: function() {
		this.model.on('fetch:start', this.loading, this);
		this.model.on('change', this.render, this);
		this.model.on('change', this.stopLoading, this);
	},

	loading: function() {
		this._loader = this._loader || $('#loader-progress');
		this._loader.html('loading ...');
	},

	stopLoading: function() {
		if (this._loader) this._loader.empty()
	},

	render: function() {
		this._container = this._container || $('#loader-content')
		this._container.html('Name: ' + this.model.get('name'));
		return this;
	}
});
