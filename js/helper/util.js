var print = function(arr){
	for(var i=0; i<arr.length; i++){
		for(var attr in arr[i]){
			console.log(attr +": "+ arr[i][attr]);
		}
	}
}