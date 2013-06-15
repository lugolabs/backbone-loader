describe("app.LoaderModel", function() {
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
	describe("#initialize", function() {
		var model, view;

		beforeEach(function() {
			model = new app.LoaderModel;
			spyOn(model, 'on');
			view = new app.LoaderView({model: model});
		});

		afterEach(function() {
			model = null;
			view = null;
		});

		it("listens to model's fetch:start", function() {
			expect(model.on).toHaveBeenCalledWith('fetch:start', view.loading, view);
		});

		it("listens to model's change with render", function() {
			expect(model.on).toHaveBeenCalledWith('change', view.render, view);
		});

		it("listens to model's change with stopLoading", function() {
			expect(model.on).toHaveBeenCalledWith('change', view.stopLoading, view);
		});
	});
});



