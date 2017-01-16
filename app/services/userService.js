module.exports = function(app,db) {

    app.post('/getUser',isLoggedIn ,function(req, res) {
        res.send({ user : req.user})
    });

    app.post('/getUsers',isLoggedIn ,db.getUsers);



};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(401).end();
}