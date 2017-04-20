(function () {

    var url = window.location.href;
    var index = url.indexOf("#");
    var homeUrl = url.substring(0, index) + "#/home";
    var hash = url.substring(index);
    if (hash != "#/home" && hash != "#" && hash != "#/")
        window.location.href = homeUrl;

    var myapp = angular.module("myapp", ["ui.router"])
        .config(function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/home");
            $stateProvider.state("home", {//  #/home
                    url: "/home", views: {
                        "": {templateUrl: "health.html"},
                        "health@home": {templateUrl: "views/health_heartRate.html"}
                    }
                })
                .state("health", {//点击health
                    url: "/health", views: {
                        "": {templateUrl: "health.html"},
                        "health@health": {templateUrl: "views/health_heartRate.html"}
                    },
                    controller: "healthCtrl"
                })
                .state("health.heartRate", {
                    url: "/heartRate", views: {
                        "health": {templateUrl: "views/health_heartRate.html"}
                    },
                    controller: "heartRateCtrl"
                })
                .state("health.bloodPressure", {
                    url: "/bloodPressure", views: {
                        "health": {templateUrl: "views/health_bloodPressure.html"}
                    },
                    controller: "bloodPressureCtrl"
                })
                .state("health.stepNumber", {
                    url: "/stepNumber", views: {
                        "health": {templateUrl: "views/health_stepNumber.html"}
                    },
                    controller: "stepNumberCtrl"
                })
                .state("health.sleep", {
                    url: "/sleep", views: {
                        "health": {templateUrl: "views/health_sleep.html"}
                    },
                    controller: "sleepCtrl"
                })

                .state("found", {
                    url: "/found", views: {
                        "": {templateUrl: "found.html"}
                    },
                    controller: "foundCtrl"
                })
                /*
                 .state("found.charity", {
                 url: "/charity", views: {
                 "found": {templateUrl: "views/found_charity.html"}
                 },
                 controller: "charityCtrl"
                 })
                 .state("found.activity", {
                 url: "/activity", views: {
                 "found": {templateUrl: "views/found_activity.html"}
                 },
                 controller: "activityCtrl"
                 })
                 .state("found.volunteer", {
                 url: "/volunteer", views: {
                 "found": {templateUrl: "views/found_volunteer.html"}
                 },
                 controller: "volunteerCtrl"
                 })
                 .state("found.heart", {
                 url: "/heart", views: {
                 "found": {templateUrl: "views/found_heart.html"}
                 },
                 controller: "heartCtrl"
                 })
                 .state("found.share", {
                 url: "/share", views: {
                 "found": {templateUrl: "views/found_share.html"}
                 },
                 controller: "shareCtrl"
                 })
                 */

                .state("recommend", {url: "/recommend", templateUrl: "recommend.html"})

                .state("mine", {url: "/mine", templateUrl: "mine.html"})

        })
        .controller("myCtrl", function ($scope, $http) {
            var url = "api/data.json";
            $http.get(url).success(function (data) {
                //data
                $scope.Items = data.myCtrl;
                $scope.healItems = data.healthCtrl;
                $scope.foundItems = data.foundCtrl;
                $scope.recommendItems = data.recommendCtrl;

                //----myCtrl----
                $scope.init = function (index) {
                    for (var i = 0; i < $scope.Items.length; i++) {
                        $scope.Items[i].src2 = "grey"
                    }
                    $scope.Items[index].src2 = "blue";

                    addClass($scope.Items, index);

                    switch (index) {
                        case 0:
                            $scope.healAddClass(0);
                            break;
                        case 1:
                            $scope.foundAddClass(0);
                            break;
                    }
                };

                //----healthCtrl----
                var date = new Date();
                $scope.month = date.getMonth() + 1;
                $scope.date = date.getDate();

                $scope.item = "心率";//初始
                $scope.set_sref = "heartRate";
                $scope.healAddClass = function (index) {
                    addClass($scope.healItems, index);
                    $scope.item = $scope.healItems[index].text;
                    $scope.set_sref = $scope.healItems[index].name;
                };

                $scope.setHealth=function () {

                };

                //----foundCtrl----
                $scope.foundItem = "慈善";//初始
                $scope.foundAddClass = function (index) {
                    addClass($scope.foundItems, index);
                    $scope.foundItem = $scope.foundItems[index].text;
                    foundAnimate(index);
                };

                //----recommendCtrl----
                $scope.recommendItem = "";

            });
        })
        .controller("healthCtrl", function ($scope) {
        })
        .controller("heartRateCtrl", function ($scope,$http) {
            $scope.$on('$viewContentLoaded', loadJs($http,"heartRate"));
        })
        .controller("bloodPressureCtrl", function ($scope,$http) {
            $scope.$on('$viewContentLoaded', loadJs($http,"bloodPressure"));
        })
        .controller("stepNumberCtrl", function ($scope,$http) {
            $scope.$on('$viewContentLoaded', loadJs($http,"stepNumber"));
        })
        .controller("sleepCtrl", function ($scope,$http) {
            $scope.$on('$viewContentLoaded', loadJs($http,"sleep"));
        })
        .controller("foundCtrl", function ($scope,$http) {
            $scope.$on('$viewContentLoaded', loadJs($http,"found"));
        })
        .controller("recommendCtrl", function ($scope,$http) {
            $scope.$on('$viewContentLoaded', loadJs($http,"recommend"));
        })

})();

//addClass
function addClass(arr, index) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].className = "item";
    }
    arr[index].className = "item ac";
}

function loadJs(mod,m){
    var url="js/" + m + ".js";
    mod.get(url).success(function (response) {
        var _script = document.getElementById("script");
        document.body.removeChild(_script);
        var script = document.createElement("script");
        script.innerHTML = response;
        script.id = "script";
        document.body.appendChild(script);
        //console.log('加载' + m + ".js");
    })
}  

function isParent (oParent,obj){
    while(obj){
        if(obj==oParent)return true;
        obj=obj.parentNode;
    }
    return false;
}

