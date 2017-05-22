// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  /*路由*/
  .config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state("home", {
        templateUrl: "home.html"
      })
      .state("music", {
        templateUrl: "music.html"
      });
  })
  /*基本布局的控制器*/
  .controller("ezCtrl",["$scope","$ionicScrollDelegate",function($scope,$ionicScollDelegate){
    $scope.items=[];
    for(var i=0;i<50;i++)
      $scope.items.push(["this is line ",i].join(""));
    $scope.gotop = function(){
      $ionicScollDelegate.scrollTop(true);
    }
    $scope.gobottom = function(){
      $ionicScollDelegate.scrollBottom(true);
    }
  }])
  .controller("refresh",function($scope){
    $scope.items = [];
    var base = 1;
    $scope.doRefresh = function() {
      for(var i=0;i<10;i++,base++)
        $scope.items.unshift(["item ",base].join(""));
      // Stop the ion-refresher from spinning
      $scope.$broadcast("scroll.refreshComplete");
    };
})
  .controller('gunCtrl',function($scope,$timeout){
    $scope.items = [];
    var base = 0;
    $scope.load_more = function(){
      $timeout(function(){
        for(var i=0;i<10;i++,base++)
          $scope.items.push(["item ",base].join(""));
        $scope.$broadcast("scroll.infiniteScrollComplete");
      },500);
    };
  })
/*tab切换的控制器*/
/*列表的控制器*/
.controller('listCtrl',function($scope){
    $scope.flag={showDelete:false,showReorder:false};
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
/*幻灯片的控制器*/
.controller('imgCtrl',function($scope){
    $scope.index = 0;
    $scope.go = function(index){
      //$ionicSlideBoxDelegate.slide(index);
    }
  })
/*复选框的控制器*/
.controller('checkCtrl',function($scope){
    $scope.items = [
      {label:"HTML5",selected:true},
      {label:"CSS3"},
      {label:"ECMAScript6"}
    ];
  })
/*单选框的控制器*/
.controller('radioCtrl',function($scope){
    $scope.items=["HTML5","ES6","CSS3"];
    $scope.ret = {choice:"CSS3"};
  })
/*模态框的控制器*/
.controller('alertCtrl',function($scope,$ionicModal){
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
    //Cleanup the modal when we are done with it!
    $scope.$on("$destroy", function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on("modal.hidden", function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on("modal.removed", function() {
      // Execute action
    });
  })
/*上拉菜单控制器*/
.controller('sideupCtrl',function($scope, $ionicActionSheet, $timeout){
    // Triggered on a button click, or some other target
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
/*定制弹出框0*/
  .controller("layerCtrl",function($scope, $ionicPopup, $timeout) {
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
/*路由机制*/

  .controller("routerCtrl",function($scope,$state,$interval,$ionicNavBarDelegate){
  $state.go("home");
  $scope.flag = {
    shouldSetTitle : false,
    shouldShowBar : true
  };
  $scope.$watch("flag.shouldSetTitle",function(nv){
    if(nv) $ionicNavBarDelegate.title("<i style='color:red'>▂▃▅▆█</i>");
    else $ionicNavBarDelegate.title("Home");
  });
  $scope.$watch("flag.shouldShowBar",function(nv){
    $ionicNavBarDelegate.showBar(nv);
  })
})

