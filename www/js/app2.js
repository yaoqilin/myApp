/**
 * Created by hama on 2016/8/28.
 */
var app = angular.module('lzy',['ionic']);
app.controller('resh',function($scope){
    //滚动刷新
    $scope.items = [];
    var base = 1;
    $scope.doRefresh = function(){
      for(var i=0;i<10;i++,base++){
        $scope.items.unshift(['items ',base].join(""));
      }
      // Stop the ion-refresher from spinning
      $scope.$broadcast("scroll.refreshComplete");
    }
})
app.controller('tab',function($scope){
  $scope.dosometing  = function(){
    alert('我被切换了');
  }
})
app.controller('list',function($scope){
  $scope.items=["Chinese","English","German","Italian","Janapese","Sweden","Koeran","Russian","French"];
  $scope.delete_item=function(item){
    var idx = $scope.items.indexOf(item);
    $scope.items.splice(idx,1);
  };
  $scope.move_item = function(item, fromIndex, toIndex) {
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  };
})
app.controller('check',function($scope){
  $scope.items = [
    {label:"HTML5",selected:true},
    {label:"CSS3"},
    {label:"ECMAScript6"}
  ];
})
app.controller('radio',function($scope){
  $scope.items=["HTML5","ES6","CSS3"];
  $scope.ret = {choice:"CSS3"};
})
app.controller('alert',function($scope,$ionicModal){
  $ionicModal.fromTemplateUrl("my-modal.html", {
    scope: $scope,
    animation: "slide-in-up"
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
})
app.controller('sideup',function($scope, $ionicActionSheet, $timeout){
  $scope.show = function() {

    // Show the action sheet
    var hideSheet = $ionicActionSheet.show({
      titleText: "操作当前文章",
      buttons: [
        { text: "<b>分享</b>文章" },
        { text: "移动到..." }
      ],
      buttonClicked: function(index) {
        return true;
      },
      cancelText: "取消",
      cancel: function() {
        // add cancel code..
      },
      destructiveText: "删除",
      destructiveButtonClicked:function(){
      }
    });

    // For example's sake, hide the sheet after two seconds
    $timeout(function() {
      //	hideSheet();
    }, 2000);

  };
})
app.controller("layerCtrl",function($scope, $ionicPopup, $timeout) {
  $scope.status = "";

  // 显示定制弹出框
  $scope.showPopup = function() {
    $scope.data = {}

    // 调用$ionicPopup弹出定制弹出框
    $ionicPopup.show({
      template: "<input type='password' ng-model='data.wifi'>",
      title: "请输入Wi-Fi密码",
      subTitle: "密码为8位",
      scope: $scope,
      buttons: [
        { text: "取消" },
        {
          text: "<b>保存</b>",
          type: "button-positive",
          onTap: function(e) {
            return $scope.data.wifi;
          }
        }
      ]
    })
      .then(function(res) {
        $scope.status = ["Wi-Fi密码到手了",":",res].join(" ");
      });
  };

  // 确认弹出框
  $scope.showConfirm = function() {
    $ionicPopup.confirm({
      title: "定制冰激凌",
      template: "你确定要吃我的冰淇淋吗？"
    })
      .then(function(res) {
        if(res) {
          $scope.status = "凭什么吃我的冰淇淋！";
        } else {
          $scope.status = "谢谢你不吃之恩！";
        }
      });
  };

  //警告弹出框
  $scope.showAlert = function() {
    $ionicPopup.alert({
      title: "不要吃果冻",
      template: "它们可能是用旧的皮鞋帮做的！"
    })
      .then(function(res) {
        $scope.status = "感谢上帝，你没吃鞋帮！";
      });
  };

  //输入提示框
  $scope.showPrompt = function(){
    //todo....

  }
})
