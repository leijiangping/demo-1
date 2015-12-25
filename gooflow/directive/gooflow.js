angular.module('app', ['ui.bootstrap'])

.controller('myCtrl', ['$scope', '$modal', function($scope, $modal) {
	
		$scope.editNodes = function(element, id) {
			
			$scope.person = {name:'tom',age:18};
	
			var modalInstance = $modal.open({
				templateUrl: 'gooflow/gooflow.tpl.html',
				size: 'sm',
				controller: 'modalCtrl',
				windowClass: '',
				resolve: {
					element: function(){
						return element
					}
				}
			});
			modalInstance.result.then(function(returnStatus) {
				console.log(returnStatus);
			});
	
		}
}])

.controller('modalCtrl',['$scope','$modalInstance','element',function($scope,$modalInstance,element){
		console.log(element);
		$scope.element = $(element);
		$scope.elementText = $(element).text();
		$scope.cancel = function(){
			$modalInstance.dismiss('dismiss');
		}
		$scope.ok = function(){
			$modalInstance.close('close result');
		}
}])

.directive('gooFlow', function() {
	return {
		restrict: 'A',

		link: function(scope, $element, $attr) {
			/*
			 *property 属性说明
			 * toolBtns 左侧工具栏类型<选择指针、节点连线、组织划分框编辑开关为不可定制>
			 * haveTool 左侧工具栏是否显示，boolean类型
			 * headBtns 顶部工具栏类型
			 * haveHead 顶部工具栏是否显示，boolean类型
			 * haveGroup 组织划分框编辑开关，boolean类型
			 * useOperStack 撤销，恢复按钮的有效性，boolean类型
			 * headLabel 标题栏，boolean类型
			 * */
			var property = {
				width: 900,
				height: 600,
				toolBtns: ["start round", "end round", "task round", "node", "chat", "state", "plug", "join", "fork", "recombination"],
				haveTool: true,
				haveHead: true,
				headBtns: ["new", "open", "save", "undo", "redo", "reload"], //如果haveHead=true，则定义HEAD区的按钮
				haveGroup: true,
				useOperStack: true,
				headLabel: true
			};
			/*remark工具栏提示*/
			var remark = {
				cursor: "选择指针",
				direct: "结点连线",
				start: "入口结点",
				"end": "结束结点",
				"task": "任务结点",
				node: "自动结点",
				chat: "决策结点",
				state: "状态结点",
				plug: "附加插件",
				fork: "分支结点",
				"join": "联合结点",
				recombination: "复合结点",
				group: "组织划分框编辑开关"
			};
			/*
			 * 创建图类$.createGooFlow
			 * prams1{element}元素节点
			 * prams2{property}配置对象
			 * 
			 * 工具栏提示信息setNodeRemarks
			 * prams{remark}提示信息对象
			 * */
			var gooflow = $.createGooFlow($element, property)
			GooFlow.prototype.editNodes = scope.editNodes;//继承父级作用域的编辑editNodes
			gooflow.setNodeRemarks(remark);
			gooflow.onBtnSaveClick = function(){
				console.log(JSON.stringify(gooflow.exportData()));
			};
			/*
			 * loadDataAjax
			 * prams{para}
			 * para.type 必须 请求类型
			 * para.data 非必须  参数
			 * para.error 非必须  错误处理
			 * para.success  非必须  
			 * para.dataFilter 非必须 数据过滤
			 * 
			 * */
			var para = {
				type: 'get',
				url: 'gooflow/data.js',
				data: {},
				error: function(errorText, errorThrown) {
					console.log(errorText);
					console.log(errorThrown);
				},
				dataFilter: function() {

				},
				success: function() {

				}
			};
			gooflow.loadDataAjax(para);

		}
	};
})