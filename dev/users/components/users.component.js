angular
    .module('BackOfficeApp')
    .component('users',{
        controller : function(userService,$stateParams){
            var ctrl = this;
            if ($stateParams.userid) {
                console.log('user id:',$stateParams.userid)
            }

            ctrl.$onInit = function(){
                userService.getUsers().then(function (users) {
                    ctrl.users = users.data;
                })
            };

        },
        templateUrl : 'users/templates/users.html'
    });