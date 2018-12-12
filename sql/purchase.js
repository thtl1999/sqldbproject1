module.exports = function(app,connection){

    app.get('/purchase', function(req,res){
        var uid = req.query.id;
        var sql = 'update users set ustar = ustar + 2500, purchase = purchase + 1 where uid=?;';
        var par = [uid];

        connection.query(sql,par,function(err, rows, fields) {
            if (!err)
                res.send('user ' + uid + ' get 2500 star');
            else
              console.log('Error while performing Query.', err);
          });
        
    });

};