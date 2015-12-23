angular.module('app',[])

.directive('gooFlow',function(){
	return{
		restrict: 'A',

		link: function(scope,$element,$attr){
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
				width: 1200,
				height: 600,
				toolBtns: ["start round", "end round", "task round", "node", "chat", "state", "plug", "join", "fork", "recombination"],
				haveTool: true,
				haveHead: true,
				headBtns: ["new", "open", "save", "undo", "redo", "reload"], //如果haveHead=true，则定义HEAD区的按钮
				haveGroup: true,
				useOperStack: false,
				headLabel:true
			};
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
			var gooflow = $.createGooFlow($element,property)
			gooflow.setNodeRemarks(remark);
			gooflow.loadData(jsondata);
		}
	};
})
