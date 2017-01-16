angular.module('BackOfficeApp')
    .component('sideBar',{
        controller : function(userService){
            var ctrl = this;


            ctrl.menuList = [
                {
                    depth : 0,
                    label : 'Bacheca',
                    icon : 'fa-tachometer',
                    link : 'dashboard',
                    visible : true
                },
                {
                    depth : 1,
                    label : 'Utenti',
                    icon : 'fa-user',
                    link : 'users',
                    visible : 'admin',
                    open : false,
                    children : [
                        {
                            label : 'Tutti gli utenti',
                            link : 'users',
                            visible : 'admin'
                        },
                        {
                            label : 'Il tuo profilo',
                            link : 'profile',
                            visible : 'admin'
                        }
                    ]
                }
            ];

            ctrl.$onInit = function () {

                angular.forEach(ctrl.menuList,function(v){
                    v.visible= userService.getLoggedUser().role == 'admin' || v.visible;
                })


            };

            ctrl.open = function (item) {
                if (item.children) {
                    item.open = !item.open;
                }
            }

        },
        templateUrl : 'common/components/sideBar/sideBar.html'
    });