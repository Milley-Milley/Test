requirejs.config({
	paths: {
		"jquery": "helper/jquery", 
		"ko": "helper/knockout",
		"data": "data/data",
		"tabs": "own/tabs",
	}
});

require(["ko", "jquery", "tabs", "data"], function(ko, $, _t, _d){

	var tabArr = ['Students', 'Teachers', 'Worders'];
	
	var ViewModel = function(){
		var t_obj = new _t(tabArr);
		var t_obj_value = t_obj.init();
		this.tabs = t_obj_value.tabs;
		this.tables = t_obj_value.tables;
		this.switchTab = t_obj.switchTab;
	};

	ko.components.register("filter-table", {
		viewModel: function(){
			var self = this;
		},
		template: $("#table-tmpl").html()
	});

	ko.applyBindings(new ViewModel());
});