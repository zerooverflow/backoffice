module.exports = function(pool){

    var module = {};

    module.getUsers = function (req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query("SELECT name,email,role FROM users",function(error, results, fields){
                if (error) next();
                connection.release();
                res.send(results);
            });
        });
    };


    return module;
};