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

		it("triggers fetch:stop", function() {
			var loader = 	new app.LoaderModel,
				triggered = 0,
				complete = false;

			loader.on("fetch:stop", function() {
				triggered = 1;
			});

			runs(function() {
				loader.fetch();
				setTimeout(function() {
					complete = true;
				}, app.syncTimeout + 10);
			});

			waitsFor(function() {
				return complete;
			}, 'Fetch', app.syncTimeout + 20);

			runs(function() {
				expect(triggered).toEqual(1);
			});

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

		it("listens to model's fetch:stop with stopLoading", function() {
			expect(model.on).toHaveBeenCalledWith('fetch:stop', view.stopLoading, view);
		});

		it("listens to model's change with render", function() {
			expect(model.on).toHaveBeenCalledWith('change', view.render, view);
		});
	});
});



