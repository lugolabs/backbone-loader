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
	var sync;

	beforeEach(function () {
		sync = Backbone.sync;
		Backbone.sync = function() {};
	});

	afterEach(function () {
		Backbone.sync = sync;
	});

	describe("#loading", function() {
		it("listens to model's fetch:start", function() {

			var model = new app.LoaderModel,
				view;

			spyOn(model, 'on');

			view = new app.LoaderView({model: model});


			expect(model.on).toHaveBeenCalledWith('fetch:start', view.loading, view);

		});
	});
});

// var jasmineExtensions = {
// 	jQuerySpies = {},
// 	spyOnEvent: function(element, eventName) {
// 		var control {
// 			triggered: false
// 		};
// 	}
// }


