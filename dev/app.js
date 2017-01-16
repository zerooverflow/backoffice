angular
    .module('BackOfficeApp',['ui.router','ngResource'])
    .provider('authUser',function(){
        var userData = {
            isAdmin : false
        };

        this.init = function(data){
            angular.merge(userData, data);
            userData.isAdmin = data.user.role == 'admin'
        };

        this.$get = function () {
            return userData;
        };
    })
    .config(function($stateProvider,$urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        var profileState = {
            name: 'profile',
            url: '/profile',
            template: '<profile></profile>'
        };

        var homeState = {
            name: 'dashboard',
            url: '/',
            templateUrl: 'pages/dashboard.html'
        };

        var userState = {
            name: 'user',
            url: '/user/:userid',
            template: '<user></user>'
        };

        var usersState = {
            name: 'users',
            url: '/users',
            template: '<users></users>'
        };

        $stateProvider.state(profileState);
        $stateProvider.state(homeState);
        $stateProvider.state(usersState);
        $stateProvider.state(userState);
    });

angular.element(document).ready(function () {
    $.post('/getUser', function (data) {

        angular.module('BackOfficeApp').config(['authUserProvider', function (authUserProvider) {
            authUserProvider.init(data);
        }]);

        angular.bootstrap(document, ['BackOfficeApp']);
    });
});