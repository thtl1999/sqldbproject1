module.exports = function(app,connection){

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    app.get('/LBlist', function(req,res){
        var sql = 'select* from lootboxes;'
        connection.query(sql,function(err, rows, fields) {
            var boxinfo = '';
            for(var i=0;i<rows.length;i++)
            {
                boxinfo = boxinfo + '<b>LootBox ID: </b>: ' + rows[i].lid + ' <b>★★★★: </b>: ' + rows[i].r4p + '%';
                boxinfo = boxinfo + ' <b>★★★: </b>' + rows[i].r3p + '%' + ' <b>★★: </b>' + rows[i].r2p + '%';
                boxinfo = boxinfo + ' Cost: ' + rows[i].lstar + '<p>';
            }

            if (!err)
                res.send(boxinfo);
            else
            console.log('Error while performing Query.', err);
        });
    });


    app.get('/LBmake', function(req,res){
        if (Number(req.query.r4)+Number(req.query.r3)+Number(req.query.r2) != 100)
        {
            res.send('percentage sum should be 100');
            return;
        }

        var sql = 'insert into lootboxes (lstar, r4p, r3p, r2p)\
        value(?, ?, ?, ?);';
        var par = [req.query.cost, req.query.r4, req.query.r3, req.query.r2];

        connection.query(sql, par, function(err, rows, fields) {
            
            if (!err)
                res.send('Created LootBox!');
            else
              console.log('Error while performing Query.', err);
          });
        
    });

    app.get('/LBpurchase', function(req,res){
        var UID = req.query.uid;
        var LID = req.query.lootid;
        var sql = 'select* from lootboxes where lid=' + LID + ';';
        connection.query(sql,function(err, rows, fields) {
            if (err)
                console.log('error lootbox sql', err);
           
            var Lcost = rows[0].lstar;
            var R4 = rows[0].r4p;
            var R3 = R4 + rows[0].r3p;
            var R2 = R3 + rows[0].r2p;

            var sql = 'select* from users where uid=' + UID + ';';
            connection.query(sql,function(err, urows, fields) {
                if (err)
                    console.log('error user sql', err);

                if (urows[0].ustar < rows[0].lstar)
                {
                    res.send('Not enough Star!');
                    return;
                }
                    
                var sql = 'select* from cards';
                connection.query(sql,function(err, crows, fields) {
                    if (err)
                        console.log('error cards sql',err);

                    var r4c = [];
                    var r3c = [];
                    var r2c = [];
                    for (var i=0;i<crows.length;i++)
                    {
                        if (crows[i].rarity == 4)
                            r4c.push(i);
                        if (crows[i].rarity == 3)
                            r3c.push(i);
                        if (crows[i].rarity == 2)
                            r2c.push(i);
                    }
                
                    var perc = getRandomInt(0,10000);
                    if (perc < R2*100) var presult = r2c[perc%r2c.length];
                    if (perc < R3*100) var presult = r3c[perc%r3c.length];
                    if (perc < R4*100) var presult = r4c[perc%r4c.length];

                    var sql = 'insert into usercard (uid, cid, level, slevel, exist)\
                    values (?,?,1,1,1)';
                    var par = [urows[0].uid, crows[presult].cid];
                    connection.query(sql,par,function(err, rrows, fields){
                        if (err)
                            console.log('error insert cards sql', err)

                        res.send('You got Card' + JSON.stringify(crows[presult]));

                        var sql = 'update users set ustar = ustar - 500 where uid=?;';
                        var par = [UID];

                        connection.query(sql,par,function(err, rrrows, fields){
                            
                            
                        });
                    });
                });



            });




          });
        
    });



};