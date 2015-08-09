define(["jquery", "ko"], function($, ko){
	function tab(arr){
		var self = this;
		this.tabArr = [];
		this.init = function(){
			for(var i=0; i<arr.length; i++){
				self.tabArr.push({
					"tabName": arr[i],
					"actClass": ko.observable(""),
					"tabId": "tab-"+ arr[i],
					"tableId": "table-"+ arr[i]
				});
			}
			self.tabArr[0].actClass("active");
			return {
				"tabs": self.tabArr,
				"tables": self.tableArr
			};
		};
		this.switchTab = function(){
			for(var i=0; i<self.tabArr.length; i++){
				self.tabArr[i].actClass("");
			}
			this.actClass("active");
		}
	};

	return tab;
});