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

    app.get('/adventure', function(req,res){
        var uid = req.query.id;
        var sql = 'select* from usercard;'
        connection.query(sql,function(err, ucrows, fields) {

            if (ucrows.length < 5)
            {
                res.send('not enough cards!');
                return;
            }

            sql = 'select* from cards;';
            connection.query(sql,function(err, crows, fields) {
                
                sql = 'select* from users where uid=' + uid + ';';
                connection.query(sql,function(err, urows, fields) {
                    var cooltime = 10;
                    var ndate = new Date().getTime();
                    console.log( Math.floor(ndate / 1000), urows[0].advdate);
                    if (Number(urows[0].advdate) + cooltime > Math.floor(ndate / 1000))
                    {
                        res.send('adventure cooltime');
                        return;
                    }

                    var cardpower = [];
                    for (var i=0;i<ucrows.length;i++)
                    {
                        for (var j=0;j<crows.length;j++)
                        {
                            if (ucrows[i].cid == crows[j].cid)
                            {
                                cardpower.push(Number(crows[j].att));
                            }
                            
                        }
                        
                    }

                    var picked = [];
                    for (var i=0;i<5;i++)
                    {
                        var maxpowercard = cardpower.indexOf(Math.max(...cardpower));
                        picked.push(maxpowercard);
                        cardpower[maxpowercard] = -1;
                    }

                    console.log(picked);
                    res.send(picked);

                    var sql = 'update users set advdate = ? where uid=?;';
                    var par = [Math.floor(ndate / 1000), uid];
                    connection.query(sql,par,function(err,resultrows,fields){


                    });

                });

            });

            /*
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
            */


          });
        
    });





};