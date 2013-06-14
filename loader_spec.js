describe("app.LoaderModel", function() {
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

