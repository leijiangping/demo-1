var app = angular.module('app', []);

app.controller('myCtrl', ['$scope','$sce', function($scope,$sce){
	$scope.name = 'beggar';
	$scope.age = 18;
	var html = '<div>'+
					'<button>hello1</button>'+
					'<button>hello2</button>'+
				'</div>';
	/*	$sce
		所谓sce即“Strict Contextual Escaping”的缩写。
		翻译成中文就是“严格的上下文模式”也可以理解为安全绑定
		此处绑定的html需要angular进行安全判定，只有通过angular安全判定的才可以进行绑定
	*/ 
	$scope.html = $sce.trustAsHtml(html);
	$scope.foo = function(arg){
		alert(arg);
	}
	$scope.selected = false;
	$scope.classState = true;
	$scope.copy = function(){
		alert('copy');
	}
	$scope.string = '1,2,3,4';
	$scope.arr = [
		{
			index:1,
			src:''
		},
		{
			index:2,
			src:''
		},
		{
			index:3,
			src:''
		},
		{
			index:4,
			src:''
		}
			];
}])