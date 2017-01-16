var LocalStrategy   = require('passport-local').Strategy;

module.exports = function(passport,pool) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        pool.getConnection(function(err, connection) {
            connection.query( 'SELECT * FROM users WHERE id = '+id, function(err, rows) {
                connection.release();
                done(err, rows[0]);

            });
        });




    });

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists

            pool.getConnection(function(err, connection) {

                connection.query("select * from users where email = '"+email+"'",function(err,rows){
                    //console.log(rows);
                    //console.log("above row object");

                    connection.release();

                    if (err)
                        return done(err);
                    if (rows.length) {

                        return done(null, false, req.flash('signupMessage', 'Questa email è già in uso.'));

                    } else {

                        // if there is no user with that email
                        // create the user
                        var newUserMysql = new Object();

                        newUserMysql.email    = email;
                        newUserMysql.password = password; // use the generateHash function in our user model

                        var insertQuery = "INSERT INTO users ( name, email, password, role ) values ('','" + email +"','"+ password +"','2')";
                        console.log(insertQuery);

                        pool.getConnection(function(err, connection) {
                            connection.query(insertQuery,function(err,rows){
                                if (err) {
                                    console.log(err.stack);
                                    return;
                                }
                                newUserMysql.id = rows.insertId;
                                connection.release();
                                return done(null, newUserMysql);
                            });
                        });

                    }
                });
            });



        }));

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            pool.getConnection(function(err, connection) {
                connection.query("SELECT * FROM users WHERE email = '" + email + "'",function(err,rows){
                    connection.release();
                    if (err)
                        return done(err);

                    if (!rows.length) {

                        return done(null, false, req.flash('loginMessage', 'Utente non trovato.')); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the user is found but the password is wrong
                    if (!( rows[0].password == password)){

                        return done(null, false, req.flash('loginMessage', 'Password sbagliata.')); // create the loginMessage and save it to session as flashdata
                    }


                    // all is well, return successful user
                    return done(null, rows[0]);

                });
            });






        }));

};