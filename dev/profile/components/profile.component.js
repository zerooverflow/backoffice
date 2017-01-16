angular
    .module('BackOfficeApp')
    .component('profile',{
        controller : function(userService){
            var ctrl = this;

            ctrl.$onInit = function(){
                ctrl.roles = [
                    {
                        id: 1,
                        role : 'admin'
                    },
                    {
                        id: 2,
                        role : 'guest'
                    }
                ];


                ctrl.user = userService.getLoggedUser();
                ctrl.isAdmin = userService.isAdmin();

                angular.forEach(ctrl.roles, function(v){
                    if (v.role == ctrl.user.role) ctrl.userRole = v;
                })


            };


            ctrl.saveProfile = function(){

            };



        },
        templateUrl : 'profile/templates/profile.html'
    });
