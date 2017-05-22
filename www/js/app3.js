/*在JS中，如果我想要使用IONIC当中的JS效果，那么我应该做的第一件事儿，启动angular*/
/*这样，我才能正确的调用出来IONIC中的效果*/


/*定义一个模块,并且在这个模块中引入ionic模块*/
var app = angular.module('lzy',['ionic']);

/*然后，进行启动时候的配置*/
app.run(function($rootScope,$state,$stateParams){
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
})

/*第三步，设置路由系统的初始化*/
app.config(['$stateProvider','$urlRouterProvider',
  function($stateProvider,$urlRouterProvider){
    //设置路由
  }]);
//启动所有的功能,启动的范围在document下.
app.controller('listCtrl',function($scope){
  $scope.items = [];
  for(var i=0;i<50;i++){
    $scope.items.push(["this is line ",i].join(""));
  }
})
//刷新的控制器
app.controller('resh',function($scope){
  $scope.items = [];
  var base = 1;
  $scope.doRefresh = function(){
    for(var i=0;i<10;i++,base++){
      $scope.items.unshift(['items ',base].join(""));
    }
    //要将刷新的动态告诉控制器
    $scope.$broadcast('scroll.refreshComplete');
  }
});
//滚动刷新的控制器
app.controller('scrollCtrl',function($scope,$timeout){
  $scope.items = [];
  var base = 1;
  $scope.name = '李志远lzy';
  $scope.more = function(){
    $timeout(function(){
      for(var i=0;i<10;i++,base++){
        $scope.items.push(["item ",base].join(""));
      }
      $scope.$broadcast("scroll.infiniteScrollComplete");
    },500)
  }
});
//tab切换的控制器
app.controller('tabCtrl',["$scope",function($scope){
  $scope.dosometing = function(){
    alert("我被点击了");
  }
}]);

//列表的控制器
app.controller('allCtrl',function($scope){
  $scope.items = ['中国','日本','泰国','新加坡','澳大利亚','悉尼'];
  $scope.delete_item = function(value){
    //首先获取到当前删除的元素的下标
    var idx = $scope.items.indexOf(value);
    //通过下标删除掉对应的元素
    $scope.items.splice(idx,1);
  };
  $scope.move_item = function(item,fromIndex,toIndex){
    //item是要进行拖拽的元素本身
    //fromIndex是元素原来的位置
    //toIndex是拖拽完之后的位置
    //请大家用splice将代码写出来
    $scope.items.splice(fromIndex, 1);
    $scope.items.splice(toIndex, 0, item);
  }
})
/*复选按钮的控制器*/
app.controller('check',function($scope){
  $scope.items = [
    {label:"HTML5",selected:true},
    {label:"CSS3"},
    {label:"PHP5"}
  ];
})
/*单选框的控制器*/
app.controller('radio',function($scope){
  $scope.items = ["HTML5","CSS3","PHP7"];
  $scope.ret  = {choice:"CSS3"}
})

/*模态框的控制器*/
app.controller('modal',function($scope,$ionicModal){
  $ionicModal.fromTemplateUrl('my-modal.html',{
    scope:$scope,
    animation:"slide-in-up"
  }).then(function(modal){
    $scope.modal = modal;
  })
  //使用字符串的形式
  //$ionicModal.fromTemplate("<div>我是内容</div>").then(function(modal){});
  $scope.openModal = function(){
    $scope.modal.show();
  }
  $scope.closeModal = function(){
    $scope.modal.hide();
  }
})

/*上拉菜单的控制器*/
app.controller('slideup',function($scope,$ionicActionSheet,$timeout){
  $scope.show = function(){
    var sheet = $ionicActionSheet.show({
      titleText:'当前的文章操作',
      buttons:[
        {text:"分享给朋友圈"},
        {text:"移动到.."}
      ],
      buttonClicked:{
        //执行一些自定义的按钮的回调函数

      },
      cancelText:"取消"
    })
  }
})
app.controller('layerCtrl',function($scope,$ionicPopup,$timeout){
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

