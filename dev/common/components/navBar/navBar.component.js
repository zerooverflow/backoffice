angular.module('BackOfficeApp')
    .component('navBar',{
        controller : function(){
            var ctrl = this;

            ctrl.$onInit = function () {
                ctrl.menuItems = [];
            }

        },
        templateUrl : 'common/components/navbar/navBar.html',
        bindings : {
            username : '@username'
        }
    });