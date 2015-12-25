angular.module('myApp', ['ui.bootstrap']);
angular.module('myApp').controller('myController',
	function($scope, $modal, $log) {
		if (localStorage.getItem('confirmProNameDlg') == null) {
			confirmProName('preview');
		}
		function confirmProName(state) {
				console.log("xxxxxxxxxxxxx");
				$scope.open = function() {
					var modalInstance = $modal.open({
						templateUrl: 'confirmProName.modal.tpl.html',
						controller: 'ModalInstanceCtrl',
						size: 'sm'
					});

					modalInstance.result.then(function(returnStatus) {
						localStorage.setItem('confirmProNameDlg', 'isShow');
						if(!returnStatus){
							t(state);
							return;
						}
						alert('changgui');
					});
					function t(state){
						alert(state);
					}
				};
		}
	});

angular.module('myApp').controller('ModalInstanceCtrl',
	function($scope, $modalInstance) {
		$scope.confirm = function() {
			$modalInstance.close(true);
		};
		$scope.cancel = function() {
			$scope.status = false;
			$modalInstance.close(false);
			$modalInstance.dismiss('cancel');
		};
		if($("#productionName").text() == '我的新作品'||$("#productionName").text().substr(1,2) == '克隆'){
                if (localStorage.getItem('confirmProNameDlg') == null) {
                    $scope.openModal('preview');
                    return;
                }
            }
		$scope.openModal = function(state) {
                    var modalInstance = $modal.open({
                        templateUrl: 'design/template/confirmProName.modal.tpl.html',
                        controller: 'ModalInstanceCtrl',
                        size: 'sm',
                        windowClass:'confirmProNameDlg'
                    });

                    modalInstance.result.then(function(returnStatus) {
                        localStorage.setItem('confirmProNameDlg', 'isShow');
                        if(!returnStatus){
                            $("#productionName").focus();
                            $(".mytitle").css('border','1px solid #f00');
                            return;
                        }
                        previewOrPublish(state);
                    });

                    function previewOrPublish(state){
                        var productionWrapper = pageContextService.getProduction();
                        var production = productionWrapper.production;
                        if(state == 'preview'){

                            production.name = $('#productionName').text();
                            if ($.trim(production.name).length <= 0) {
                                tipsService.error("保存成功", 2000);
                                return;
                            }
                            var viewProFlag = production.preview;
                            var url = utility.absURL() + viewProFlag;
                            productionMgr.previewProduction(production).then(function(json) {
                                if (json.isSucc) {
                                    window.open(url);
                                }
                            });


                        }else{
                            $scope.save(function() {
                                productionMgr.publishProduction(production).then(function(json) {
                                    if (json.isSucc) {
                                        var modalInstance = $modal.open({
                                            templateUrl: 'design/template/publish.modal.tpl.html',
                                            controller: 'publishDlgCtrl',
                                            windowClass: 'publishDlg',
                                            size: 'lg',
                                            resolve: {
                                                items: function() {
                                                    return {
                                                        uuid: production.uuid
                                                    };
                                                }
                                            }
                                        });
                                    } else {
                                        tipsService.message(json.msg, 2000, json.isSucc);
                                    }
                                });
                            });
                        }
                    }
                };
	});