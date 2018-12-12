module.exports = function(app,connection){

    app.post('/userlist', function(req,res){
        var username = req.body.uname;
        var sql = 'insert into users (uname, umoney, ustar, advdate, purchase)\
        value(?, ?, ?, ?, ?);';
        var par = [username, 0, 0, 1286668800, 0];

        connection.query(sql, par,function(err, rows, fields) {
            if (!err)
                res.send('registed');
            else
              console.log('Error while performing Query.', err);
          });

    });

    app.get('/userlist', function(req,res){
        var sql = 'select* from users;'

        connection.query(sql,function(err, rows, fields) {
            var userinfo = '';
            for(var i=0;i<rows.length;i++)
            {
                var udate = new Date(0);
                udate.setUTCSeconds(rows[i].advdate);
                var datestring = udate.toISOString();
                userinfo = userinfo + '<b>UID</b>: ' + rows[i].uid + ' <b>Nickname</b>: ' + rows[i].uname;
                userinfo = userinfo + ' <b>Gold</b>: ' + rows[i].umoney + ' <b>Star</b>: ' + rows[i].ustar;
                userinfo = userinfo + ' Purchase count: ' + rows[i].purchase + ' Last Adventure: ';
                userinfo = userinfo + datestring + '<p>';
            }


            if (!err)
                res.send(userinfo);
            else
              console.log('Error while performing Query.', err);
          });
        
    });





};