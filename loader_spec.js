xdescribe("app.LoaderModel", function() {
	var sync;

	beforeEach(function () {
		sync = Backbone.sync;
		Backbone.sync = function() {};
	});

	afterEach(function () {
		Backbone.sync = sync;
	});

	describe("#fetch", function() {

		it("triggers fetch:start", function() {
			var loader = 	new app.LoaderModel,
				triggered = 0;

			loader.on("fetch:start", function() {
				triggered = 1;
			});

			loader.fetch();

			expect(triggered).toEqual(1);
		});
	});

});

describe("app.LoaderView", function() {
	var sync, model, view;

	beforeEach(function () {
		sync = Backbone.sync;
		Backbone.sync = function() {};

		model = new app.LoaderModel;
		view = new app.LoaderView({model: model});

		spyOn(model, 'fetch');
		spyOn(view, 'loading');
	});

	afterEach(function () {
		Backbone.sync = sync;
	});

	describe("#loading", function() {
		it("listens to model's fetch:start", function() {
			

			model.fetch();

			// console.log(view.loading);
			expect(view.loading).toHaveBeenCalled();
			// expect(model.fetch).toHaveBeenCalled();

		});
	});
});