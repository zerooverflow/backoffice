angular
    .module('BackOfficeApp')
    .service('userService',function ($resource,$http,authUser) {
        var srv = this;

        var userResource = $resource('/getUser/:userId', {userId:'@id'});
        var usersEndpoint = '/getUsers';


        srv.getUser = function(userId){
            return userResource.save({userId : userId}).$promise;
        };

        srv.getUsers = function(){
            return $http.post(usersEndpoint);
        };

        srv.getLoggedUser = function(){
            return authUser.user;
        };

        srv.isAdmin = function(){
            return authUser.isAdmin;
        }



    });
