var app = app || {};

app.syncTimeout = 1000;

app.LoaderModel = Backbone.Model.extend({
	urlRoot: '/',

	fetch: function(options) {
		this.trigger('fetch:start');
    options = options ? _.clone(options) : {};
		var success = options.success;
		var model = this;
		options.success = function() {
			model.trigger('fetch:stop');
			if (success) success();
		};
		this.constructor.__super__.fetch.apply(this, [options]);
	},

	// emulate a server call with a delay
	sync: function(method, model, options) {
		setTimeout(function() {
			options.success({name: 'test'});
		}, app.syncTimeout);
	}

});

app.LoaderView = Backbone.View.extend({
	initialize: function() {
		this.model.on('fetch:start', this.loading, this);
		this.model.on('fetch:stop', this.stopLoading, this);
		this.model.on('change', this.render, this);
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
