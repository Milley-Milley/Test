requirejs.config({
	baseUrl: "js/helper",
	paths: {
		"jquery": "jquery", 
		"jqueryform": "jquery.form",
		/*"jsrender": "jsrender",*/
		"ko": "knockout",
		/*"util": "util"*/
	},
	shim: {
		/*"jquertform": {
			deps: ["jquery"]
		},*/
		/*"jsrender": {
			deps: ["jquery"]
		}*/
	}
});


require(["jquery", "jqueryform", "jsrender", "knockout", "util"], function($, _form, _re, ko, util){
//**** KnockoutJS BEGIN *****************************************************************************************************
	var students_ko = [{
		no: "10112510105",
		name: "Milk", 
		age: 18,
		hobby: "singing, reading, planting"
	},{
		no: "10112510106",
		name: "June", 
		age: 21,
		hobby: "reading, eating, go-outing"
	},{
		no: "10112510107",
		name: "Milley", 
		age: 22,
		hobby: "walking, watching, singing"
	},{
		no: "10112510108",
		name: "Nan", 
		age: 22,
		hobby: "singing, go-outing, shopping"
	},{
		no: "10112510109",
		name: "Nancy", 
		age: 20,
		hobby: "watching movies, eating"
	},{
		no: "10112510110",
		name: "Elen", 
		age: 19,
		hobby: "dancing, playing sports"
	}];

	var students_ko_c = [{
		no: "10112510105",
		details: {
			name: "Milk", 
			age: 18,
			hobby: "singing, reading, planting",
			face: "img/faces/105.jpg"
		}
	},{
		no: "10112510106",
		details: {
		name: "June", 
			age: 21,
			hobby: "reading, eating, go-outing",
			face: "img/faces/106.jpg"
		}
	},{
		no: "10112510107",
		details: {
			name: "Milley", 
			age: 22,
			hobby: "walking, watching, singing",
			face: "img/faces/107.jpg"
		}
	},{
		no: "10112510108",
		details: {
			name: "Nan", 
			age: 22,
			hobby: "singing, go-outing, shopping",
			face: "img/faces/108.jpg"
		}
	},{
		no: "10112510109",
		details: {
			name: "Nancy", 
			age: 20,
			hobby: "watching movies, eating",
			face: "img/faces/109.jpg"
		}
	},{
		no: "10112510110",
		details: {
			name: "Elen", 
			age: 19,
			hobby: "dancing, playing sports",
			face: "img/faces/110.jpg"
		}
	}];

	var ViewModel = function(){
		// Form & Table
		var self = this;
		for(var i=0; i<students_ko.length; i++){
			students_ko[i].showField = true;
			students_ko[i].editField = false;
		}
		this.people = ko.observableArray(students_ko);
		this.newPeople = {
			no: ko.observable(""),
			name: ko.observable(""),
			age: ko.observable(""),
			hobby: ko.observable(""),
		};
		this.triggerEdit = function(){
			var editObj = this;
			var index = self.people.indexOf(this);
			editObj.editField = true;
			editObj.showField = false;
			//self.people.splice(index, 1, editObj);
			self.people.remove(this);
			self.people.splice(index, 0, editObj);
		};
		this.triggerRemove = function(){
			self.people.remove(this);
		};
		this.triggerCancel = function(){
			var editObj = this;
			var index = self.people.indexOf(this);
			editObj.editField = false;
			editObj.showField = true;
			//self.people.splice(index, 1, editObj);
			self.people.remove(this);
			self.people.splice(index, 0, editObj);
		};
		this.addStudent = function(){
			this.people.push({
				no: this.newPeople.no(),
				name: this.newPeople.name(),
				age: this.newPeople.age(),
				hobby: this.newPeople.hobby(),
			});
			this.newPeople.no("");
			this.newPeople.name("");
			this.newPeople.age("");
			this.newPeople.hobby("");
		};
		// Html & Visible
		this.htmlDetails = ko.observable("<i>哈哈</i>");
		this.display = ko.observable(true);
		this.toggle = function(){
			if(this.display()){
				this.display(false);
			} else {
				this.display(true);
			}
		};
		//css & style
		this.bgColor = ko.observable("gray");
		this.turnToPink = function(){
			this.bgColor("pink");
		}
		this.turnToBlue = function(){
			this.bgColor("blue");
		}
		this.turnToGray = function(){
			this.bgColor("gray");
		}
		this.turnToWhite = function(){
			this.bgColor("white");
		}
		this.height = ko.observable("80px");
		this.heightAdd = function(){
			var h = this.height().substring(0, this.height().length-2);
			this.height(parseInt(h)+1 + "px");
		};
		this.heightSub = function(){
			var h = this.height().substring(0, this.height().length-2);
			this.height(parseInt(h)-1 + "px");
		};

		this.people_c = students_ko_c;

		this.curSrc = ko.observable("");
		this.modalVisible = ko.observable(false);
		this.closeFace = function(){
			view.modalVisible(false);
		}

		this.sourceLinkTitle = "How to configure log sources?";
		this.sourceLinkHref = "http://www.baidu.com";
		this.sourceLinkClass = ko.observable("");
		this.sourceLinkVisit = function(){
			this.sourceLinkClass("visited");
			window.open(this.sourceLinkHref);
		}
	};

	ko.components.register("student-item", {
		viewModel: function(params){
			this.details = params.value;
			var self = this;
			this.showFace = function(){
				view.curSrc(this.details.face);
				view.modalVisible(true);
			};
		},
		template: 
			"<div class='top-part'>"
                +"<div class='face-part'><img data-bind='attr: {src: details.face}, click: showFace' /></div>"
                +"<div class='detail-part'><p data-bind='text: details.name'></p><p data-bind='text: details.age'></p></div>"
            +"</div> <div class='bottom-part'><p data-bind='text: details.hobby'></p></div>"
	});

	var view = new ViewModel();
	ko.applyBindings(view);
//**** KnockoutJS END *****************************************************************************************************


//**** Common BEGIN *******************************************************************************************************
	/*var editFunction = function(obj){
		obj.closest("table").find("span.show-field").show();
		obj.closest("table").find("span.edit-field").hide();
		obj.closest("tr").find("span.show-field").hide();
		obj.closest("tr").find("span.edit-field").show();
	};

	var cancelFunction = function(obj){
		obj.closest("tr").find("span.show-field").show();
		obj.closest("tr").find("span.edit-field").hide();
	}*/
//**** Common END *********************************************************************************************************


//**** JSRender BEGIN *****************************************************************************************************
	/*var students_jr = [{
		no: "10112510107",
		name: "Milley", 
		age: 22,
		hobby: "walking watching singing"
	},{
		no: "10112510108",
		name: "Nan", 
		age: 22,
		hobby: "singing go-outing shopping"
	}];

	var load = (function(data){
		var template = _re.templates("#student-tmpl");
		$("#t-jsrender tbody").html(template.render(data));
	})(students_jr);

	$("table#t-jsrender").delegate("button.edit", "click", function(){
		editFunction($(this));
	});

	$("table#t-jsrender").delegate("button.cancel", "click", function(){
		cancelFunction($(this));
	});

	$("table#t-jsrender").delegate("input", "input keyup change", function(){
		var attrName = $(this).attr("name");
		var value = $(this).val();
		$(this).parent().prev().html(value);
		var no = $(this).closest("tr").attr("data-id");
		for(var i=0; i<students_jr.length; i++){
			if(students_jr[i].no == no){
				if(attrName == "name"){
					students_jr[i].name = value;
				} else if(attrName == "age"){
					students_jr[i].age = value;
				} else if(attrName == "hobby"){
					students_jr[i].hobby = value;
				}
			}
		}
		//print(students_jr);
	});*/
//**** JSRender END *****************************************************************************************************
});